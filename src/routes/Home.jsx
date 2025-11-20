import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Public Health Intake Portal</h1>
      <p>
        This portal supports public health intake and triage, and a staff review
        dashboard for follow-up.
      </p>

      <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
        <Link to="/intake">
          <button>Start a New Intake</button>
        </Link>

        <Link to="/review">
          <button>Open Staff Review Dashboard</button>
        </Link>
      </div>
    </div>
  );
}
