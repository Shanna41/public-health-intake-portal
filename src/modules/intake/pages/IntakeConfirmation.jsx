import { Link } from "react-router-dom";

export default function IntakeConfirmation() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Thank you for your submission</h1>
      <p>
        Your intake information has been received. Public health staff may
        review your responses and contact you if follow-up is needed.
      </p>

      <div style={{ marginTop: "1.5rem" }}>
        <Link to="/intake">
          <button>Start a New Intake</button>
        </Link>
        <Link to="/review" style={{ marginLeft: "1rem" }}>
          <button>View Staff Review Dashboard</button>
        </Link>
      </div>
    </div>
  );
}
