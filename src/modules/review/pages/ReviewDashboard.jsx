import { useState } from "react";
import { Link } from "react-router-dom";
import { getArrayFromStorage } from "../../../utils/storage";

const RISK_LABELS = {
  low: "Low",
  medium: "Medium",
  high: "High"
};

const STATUS_LABELS = {
  new: "New",
  in_review: "In Review",
  closed: "Closed"
};

export default function ReviewDashboard() {
  // Load and sort submissions once when the component mounts
  const [submissions] = useState(() => {
    const data = getArrayFromStorage("intakeSubmissions");
    return [...data].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  });

  const [riskFilter, setRiskFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = submissions.filter((s) => {
    const riskOk =
      riskFilter === "all" || s.derived?.riskLevel === riskFilter;
    const statusOk =
      statusFilter === "all" || s.derived?.status === statusFilter;
    return riskOk && statusOk;
  });




  return (
    <div style={{ padding: "2rem" }}>
      <h1>Intake Review Dashboard</h1>
      <p>
        Submissions stored locally in your browser (mock data source for
        portfolio/demo).
      </p>

      {/* Filters */}
      <div style={{ margin: "1rem 0", display: "flex", gap: "1rem" }}>
        <div>
          <label htmlFor="risk-filter">Risk level:</label>
          <select
            id="risk-filter"
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            style={{ marginLeft: ".5rem" }}
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label htmlFor="status-filter">Status:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ marginLeft: ".5rem" }}
          >
            <option value="all">All</option>
            <option value="new">New</option>
            <option value="in_review">In Review</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <p>No submissions found. Complete an intake first.</p>
      ) : (
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            marginTop: "1rem"
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Submitted</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>ZIP</th>
              <th style={thStyle}>Risk</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id}>
                <td style={tdStyle}>
                  {s.createdAt
                    ? new Date(s.createdAt).toLocaleString()
                    : "N/A"}
                </td>
                <td style={tdStyle}>
                  {s.demographics?.firstName} {s.demographics?.lastName}
                </td>
                <td style={tdStyle}>{s.demographics?.zipCode}</td>
                <td style={tdStyle}>
                  {RISK_LABELS[s.derived?.riskLevel] || "Unknown"}
                </td>
                <td style={tdStyle}>
                  {STATUS_LABELS[s.derived?.status] || "Unknown"}
                </td>
                <td style={tdStyle}>
                  <Link to={`/review/detail/${s.id}`}>View details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = {
  borderBottom: "1px solid #ccc",
  textAlign: "left",
  padding: ".5rem"
};

const tdStyle = {
  borderBottom: "1px solid #eee",
  padding: ".5rem"
};
