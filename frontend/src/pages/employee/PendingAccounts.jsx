import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPendingAccounts,
  approveAccount,
  rejectAccount,
} from "../../api/employeeAccountService";
import "../../styles/pendingAccounts.css";

function PendingAccounts() {
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const response = await getPendingAccounts();
      setAccounts(response.data);
    } catch (err) {
      console.error(err);
      alert("Unable to load pending accounts");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveAccount(id);
      alert("Account Approved");
      loadAccounts();
    } catch (err) {
      console.error(err);
      alert("Approval failed");
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Reject this account request?")) return;

    try {
      await rejectAccount(id);
      alert("Account Rejected");
      loadAccounts();
    } catch (err) {
      console.error(err);
      alert("Rejection failed");
    }
  };

  if (loading)
    return <div className="container mt-5">Loading...</div>;

  return (
  <div className="pending-accounts-page">

    <div className="pending-accounts-container">

      <div className="pending-header">

        <div>
          <h2>Pending Account Requests</h2>
          <p>Review customer account opening requests.</p>
        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/employee/dashboard")}
        >
          ← Dashboard
        </button>

      </div>

      {accounts.length === 0 ? (

        <div className="empty-state">
          <h3>No Pending Requests</h3>
          <p>All account requests have been processed.</p>
        </div>

      ) : (

        <div className="account-grid">

          {accounts.map((account) => (

            <div
              className="account-card"
              key={account.accountId}
            >

              <div className="account-top">

                <div className="account-id">
                  #{account.accountId}
                </div>

                <span className="status-pill">
                  {account.status}
                </span>

              </div>

              <div className="info-row">
                <span className="info-label">User ID</span>
                <strong>{account.userId}</strong>
              </div>

              <div className="info-row">
                <span className="info-label">Account Number</span>
                <strong>{account.accountNumber}</strong>
              </div>

              <div className="info-row">
                <span className="info-label">Account Type</span>
                <strong>{account.accountType}</strong>
              </div>

              <div className="info-row">
                <span className="info-label">Opening Balance</span>
                <strong>₹ {account.balance}</strong>
              </div>

              <div className="action-buttons">

                <button
                  className="approve-btn"
                  onClick={() =>
                    handleApprove(account.accountId)
                  }
                >
                  ✔ Approve
                </button>

                <button
                  className="reject-btn"
                  onClick={() =>
                    handleReject(account.accountId)
                  }
                >
                  ✖ Reject
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  </div>
  );
}

export default PendingAccounts;