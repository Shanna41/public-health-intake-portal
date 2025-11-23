import { Link } from "react-router-dom";

export default function IntakeIntro() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Public Health Intake & Triage Form</h1>
      <p>Please complete the following steps to submit your health intake information.</p>

      <Link to="/intake/demographics">
        <button style={{ marginTop: "1rem" }}>Start Intake</button>
      </Link>
    </div>
  );
}
