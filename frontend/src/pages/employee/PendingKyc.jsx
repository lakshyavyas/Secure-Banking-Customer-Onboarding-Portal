// import { useEffect, useState } from "react";
// //import { getPendingKycs } from "../../api/employeeKycService";
// import {
//     getPendingKycs,
//     approveKyc,
//     rejectKyc
// } from "../../api/employeeKycService"

// function PendingKyc() {

//     const [kycs, setKycs] = useState([]);

//     useEffect(() => {

//         loadPendingKycs();

//     }, []);

//     const loadPendingKycs = async () => {

//         try {

//             const response = await getPendingKycs();

//             setKycs(response.data);

//         } catch (error) {

//             console.error(error);

//             alert("Failed to load pending KYC");

//         }

//     };

//     const handleApprove = async (kycId) => {

//         try {

//             await approveKyc(kycId);

//             alert("KYC Approved Successfully");

//             loadPendingKycs();

//         } catch (error) {

//             console.error(error);

//             alert("Failed to approve KYC");

//         }

//     };

//     const handleReject = async (kycId) => {

//         const remarks = prompt("Enter rejection remarks");

//         if (!remarks) return;

//         try {

//             await rejectKyc(kycId, remarks);

//             alert("KYC Rejected");

//             loadPendingKycs();

//         } catch (error) {

//             console.error(error);

//             alert("Failed to reject KYC");

//         }

//     };
//     return (

//         <div className="container mt-5">

//             <h2>Pending KYC Requests</h2>

//             <table className="table table-bordered table-striped mt-4">

//                 <thead>

//                     <tr>

//                         <th>KYC ID</th>
//                         <th>User ID</th>
//                         <th>Aadhaar</th>
//                         <th>PAN</th>
//                         <th>Status</th>
//                         <th>Actions</th>

//                     </tr>

//                 </thead>

//                 <tbody>
// {/*
//                     {kycs.map((kyc) => (

//                         <tr key={kyc.kycId}>

//                             <td>{kyc.kycId}</td>
//                             <td>{kyc.userId}</td>
//                             <td>{kyc.aadhaarNumber}</td>
//                             <td>{kyc.panNumber}</td>
//                             <td>{kyc.status}</td>

//                         </tr>

//                     ))} */}

//                     {kycs.map((kyc) => (

//     <tr key={kyc.kycId}>

//         <td>{kyc.kycId}</td>
//         <td>{kyc.userId}</td>
//         <td>{kyc.aadhaarNumber}</td>
//         <td>{kyc.panNumber}</td>
//         <td>{kyc.status}</td>

//         <td>

//             <button
//                 className="btn btn-success btn-sm me-2"
//                 onClick={() => handleApprove(kyc.kycId)}
//             >
//                 Approve
//             </button>

//             <button
//                 className="btn btn-danger btn-sm"
//                 onClick={() => handleReject(kyc.kycId)}
//             >
//                 Reject
//             </button>

//         </td>

//     </tr>

// ))}

//                 </tbody>

//             </table>

//         </div>

//     );
// }

// export default PendingKyc;

import { viewPan, viewAadhaar } from "../../api/kycService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPendingKycs,
  approveKyc,
  rejectKyc,
} from "../../api/employeeKycService";
import "../../styles/pendingKyc.css";

function PendingKyc() {
  const navigate = useNavigate();
  const [kycs, setKycs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State for inline alerts instead of window.alert
  const [feedbackMsg, setFeedbackMsg] = useState({ type: "", text: "" });

  // States for the Rejection Modal
  const [showModal, setShowModal] = useState(false);
  const [activeKycId, setActiveKycId] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState("");

  // useEffect(() => {
  //   loadPendingKycs();
  // }, []);

  useEffect(() => {
    loadPendingKycs();
  }, [page, keyword]);

  // const loadPendingKycs = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await getPendingKycs();
  //     setKycs(response.data);
  //   } catch (error) {
  //     console.error(error);
  //     setFeedbackMsg({
  //       type: "error",
  //       text: "Failed to load pending KYC requests.",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const loadPendingKycs = async () => {
    setIsLoading(true);

    try {
      const response = await getPendingKycs(page, size, keyword);

      setKycs(response.data.content);

      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);

      setFeedbackMsg({
        type: "error",
        text: "Failed to load pending KYC requests.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (kycId) => {
    setFeedbackMsg({ type: "", text: "" });
    try {
      await approveKyc(kycId);
      setFeedbackMsg({
        type: "success",
        text: `KYC #${kycId} Approved Successfully`,
      });
      loadPendingKycs();
    } catch (error) {
      console.error(error);
      setFeedbackMsg({ type: "error", text: "Failed to approve KYC." });
    }
  };

  // --- Modal Handlers ---
  const openRejectModal = (kycId) => {
    setActiveKycId(kycId);
    setRemarks("");
    setShowModal(true);
  };

  const closeRejectModal = () => {
    setShowModal(false);
    setActiveKycId(null);
    setRemarks("");
  };

  const handleConfirmReject = async () => {
    if (!remarks.trim()) return;

    setIsSubmitting(true);
    setFeedbackMsg({ type: "", text: "" });

    try {
      await rejectKyc(activeKycId, remarks);
      setFeedbackMsg({
        type: "success",
        text: `KYC #${activeKycId} Rejected successfully.`,
      });
      closeRejectModal();
      loadPendingKycs();
    } catch (error) {
      console.error(error);
      setFeedbackMsg({ type: "error", text: "Failed to reject KYC." });
    } finally {
      setIsSubmitting(false);
    }
  };
  // const handleViewPan = async (userId) => {
  //   try {
  //      console.log("React UserId =", userId);
  //     const response = await viewPan(userId);

  //     const url = window.URL.createObjectURL(response.data);

  //     window.open(url, "_blank");
  //   } catch (err) {
  //     console.log(err);
  //     alert("Unable to open PAN.");
  //   }
  // };

  const handleViewPan = async (userId) => {
    try {
      const response = await viewPan(userId);

      console.log("Content-Type:", response.headers["content-type"]);
      console.log("Data instanceof Blob:", response.data instanceof Blob);
      console.log("Blob type:", response.data.type);
      console.log("Blob size:", response.data.size);
      const url = window.URL.createObjectURL(response.data);

      window.open(url, "_blank");
    } catch (err) {
      console.error(err);
      alert("Unable to open PAN.");
    }
  };

  const handleViewAadhaar = async (userId) => {
    try {
      const response = await viewAadhaar(userId);

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const url = window.URL.createObjectURL(blob);

      window.open(url, "_blank");
    } catch (err) {
      console.error(err);
      alert("Unable to open Aadhaar.");
    }
  };

  return (
  <div className="pending-page">
    <div className="pending-container">
      <div className="pending-card">

        {/* Header */}
        <div className="pending-header">
          <div>
            <h2>Pending KYC Requests</h2>
            <p>Review customer identity documents before approval.</p>
          </div>

          <button
            className="back-btn"
            onClick={() => navigate("/employee/dashboard")}
          >
            ← Dashboard
          </button>
        </div>

        {/* Feedback */}
        {feedbackMsg.text && (
          <div
            className={`alert ${
              feedbackMsg.type === "error"
                ? "alert-danger"
                : "alert-success"
            }`}
          >
            {feedbackMsg.text}
          </div>
        )}

        {/* Search */}
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search by Aadhaar or PAN..."
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setPage(0);
            }}
          />
        </div>

        {/* Statistics */}
          <div className="row g-3 mb-4">

            <div className="col-md-4">
              <div className="stats-card-small">
                <h4>{kycs.length}</h4>
                <span>Pending Requests</span>
              </div>
            </div>

            <div className="col-md-4">
              <div className="stats-card-small">
                <h4>{page + 1}</h4>
                <span>Current Page</span>
              </div>
            </div>

            <div className="col-md-4">
              <div className="stats-card-small">
                <h4>{totalPages}</h4>
                <span>Total Pages</span>
              </div>
            </div>

          </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="kyc-table">

            <thead>
              <tr>
                <th>KYC ID</th>
                <th>Customer</th>
                <th>Aadhaar</th>
                <th>PAN</th>
                <th>Status</th>
                <th style={{ width: "200px" }}>Actions</th>
                <th style={{ width: "180px" }}>View/Download</th>
              </tr>
            </thead>

            <tbody>

              {isLoading && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: 60 }}>
                    <div className="spinner-border text-primary"></div>
                  </td>
                </tr>
              )}

              {!isLoading && kycs.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: 60 }}>
                    No pending KYC requests found.
                  </td>
                </tr>
              )}

              {!isLoading &&
                kycs.map((kyc) => (
                  <tr key={kyc.kycId}>

                    <td>{kyc.kycId}</td>

                    <td>
                      <strong>{kyc.customerName}</strong>
                    </td>

                    <td>{kyc.aadhaarNumber || "-"}</td>

                    <td>{kyc.panNumber || "-"}</td>

                    <td>
                      <span className="status-pill">
                        {kyc.status}
                      </span>
                    </td>

                    {/* Actions */}

                    <td>

                        <div className="action-group">

                            <button
                                className="btn-action btn-approve"
                                onClick={() => handleApprove(kyc.kycId)}
                            >
                                Approve
                            </button>

                            <button
                                className="btn-action btn-reject"
                                onClick={() => openRejectModal(kyc.kycId)}
                            >
                                Reject
                            </button>

                        </div>

                    </td>

                    {/* View / Download */}

                    <td>

                        <div className="view-group">

                            <button
                                className="btn-action btn-pan"
                                onClick={() => handleViewPan(kyc.userId)}
                            >
                                PAN
                            </button>

                            <button
                                className="btn-action btn-aadhaar mx-2"
                                onClick={() => handleViewAadhaar(kyc.userId)}
                            >
                                Aadhaar
                            </button>

                        </div>

                    </td>
                  </tr>
                ))}

            </tbody>

          </table>
        </div>

        {/* Pagination */}

        <div className="pagination-bar">

          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            ← Previous
          </button>

          <strong>
            Page {page + 1} of {totalPages}
          </strong>

          <button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next →
          </button>

        </div>
              </div>

      {/* React-Controlled Bootstrap Modal for Rejection */}
      {showModal && (
        <>
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ zIndex: 1055 }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div
                className="modal-content"
                style={{
                  borderRadius: "20px",
                  border: "none",
                  overflow: "hidden",
                }}
              >
                <div
                  className="modal-header"
                  style={{
                    background: "#0F4C81",
                    color: "#fff",
                    borderBottom: "none",
                  }}
                >
                  <h5 className="modal-title">
                    Reject KYC #{activeKycId}
                  </h5>

                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={closeRejectModal}
                  ></button>
                </div>

                <div className="modal-body p-4">

                  <p className="text-muted">
                    Please enter the rejection reason.
                    The customer will be able to view these remarks.
                  </p>

                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Example: Aadhaar image is blurred..."
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    autoFocus
                  />

                </div>

                <div className="modal-footer border-0">

                  <button
                    className="btn btn-light"
                    onClick={closeRejectModal}
                  >
                    Cancel
                  </button>

                  <button
                    className="btn btn-danger"
                    disabled={!remarks.trim() || isSubmitting}
                    onClick={handleConfirmReject}
                  >
                    {isSubmitting
                      ? "Rejecting..."
                      : "Reject KYC"}
                  </button>

                </div>
              </div>
            </div>
          </div>

          <div
            className="modal-backdrop fade show"
            style={{
              background: "rgba(0,0,0,.45)",
              zIndex: 1050,
            }}
          ></div>
        </>
      )}

    </div>
  </div>
);
}

export default PendingKyc;
