import { useEffect, useState } from "react";
import api from "../../api/accountApi";
import accountApi from "../../api/accountApi";
import "../../styles/accounts.css";
import { useNavigate } from "react-router-dom";

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [accountType, setAccountType] = useState("SAVINGS");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [balance, setBalance] = useState("");

  const navigate = useNavigate();

  const loadAccounts = async () => {
    try {
      const res = await accountApi.get("/accounts/me");
      setAccounts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const handleOpenAccount = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await accountApi.post("/accounts/open", {
        accountType,
        balance: Number(balance),
      });

      setMessage(
        `Account request submitted successfully.\nStatus : ${res.data.status}`
      );

      loadAccounts();
    } catch (err) {
      console.log(err);

      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else if (typeof err.response?.data === "string") {
        setMessage(err.response.data);
      } else {
        setMessage("Unable to open account.");
      }
    }

    setLoading(false);
  };

  return (
  <div className="accounts-page">
    <div className="accounts-container">

      {/* Header */}
      <div className="accounts-card">

        <div className="accounts-header">

          <div>
            <h2>Open New Account</h2>
            <p>
              Choose an account type and submit your request for approval.
            </p>
          </div>

          <button
            className="back-btn"
            onClick={() => navigate("/customer/dashboard")}
          >
            ← Dashboard
          </button>

        </div>

        <form onSubmit={handleOpenAccount}>

          {/* Account Type Cards */}

          <div className="type-grid">

            <div
              className={`type-card ${
                accountType === "SAVINGS" ? "active" : ""
              }`}
              onClick={() => setAccountType("SAVINGS")}
            >
              <div className="icon">💰</div>
              <h4>Savings</h4>
              <p>Daily banking and personal savings.</p>
            </div>

            <div
              className={`type-card ${
                accountType === "CURRENT" ? "active" : ""
              }`}
              onClick={() => setAccountType("CURRENT")}
            >
              <div className="icon">🏢</div>
              <h4>Current</h4>
              <p>Perfect for business transactions.</p>
            </div>

            <div
              className={`type-card ${
                accountType === "SALARY" ? "active" : ""
              }`}
              onClick={() => setAccountType("SALARY")}
            >
              <div className="icon">💼</div>
              <h4>Salary</h4>
              <p>Ideal for salary deposits and benefits.</p>
            </div>

          </div>

          {/* Deposit */}

          <div className="deposit-group">

            <label>Initial Deposit</label>

            <input
              type="number"
              min="0"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="Enter initial deposit"
            />

          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Open Account"}
          </button>

        </form>

        {message && (
          <div className="message-box">
            {message}
          </div>
        )}

      </div>

      {/* Accounts List */}

      <div className="accounts-card">

        <h2 style={{ marginBottom: "25px", color: "#0F4C81" }}>
          My Accounts
        </h2>

        <table className="accounts-table">

          <thead>

            <tr>
              <th>Account Number</th>
              <th>Type</th>
              <th>Balance</th>
              <th>Status</th>
              <th>Created</th>
            </tr>

          </thead>

          <tbody>

            {accounts.length === 0 ? (

              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                  }}
                >
                  No Accounts Found
                </td>
              </tr>

            ) : (

              accounts.map((account) => (

                <tr key={account.accountId}>

                  <td>
                    {account.accountNumber ??
                      "Pending Approval"}
                  </td>

                  <td>{account.accountType}</td>

                  <td>₹ {account.balance}</td>

                  <td>

                    <span
                      className={`status ${
                        account.status === "ACTIVE"
                          ? "active-status"
                          : account.status === "PENDING"
                          ? "pending-status"
                          : "rejected-status"
                      }`}
                    >
                      {account.status}
                    </span>

                  </td>

                  <td>
                    {account.createdAt?.substring(0, 10)}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  </div>
  );
}