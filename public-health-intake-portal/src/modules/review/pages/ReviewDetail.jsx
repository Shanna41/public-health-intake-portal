import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  getArrayFromStorage,
  updateItemInArrayInStorage
} from "../../../utils/storage";

export default function ReviewDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Initialize from localStorage once, when the component mounts
  const [submission, setSubmission] = useState(() => {
    const all = getArrayFromStorage("intakeSubmissions");
    return all.find((s) => s.id === id) || null;
  });

  if (!submission) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Submission not found</h1>
        <p>
          The requested intake record could not be found. It may have been
          removed from local storage.
        </p>
        <Link to="/review">Back to dashboard</Link>
      </div>
    );
  }

  const { demographics, symptoms, riskFactors, consent, derived } = submission;

  function updateStatus(newStatus) {
    // Update in localStorage first
    updateItemInArrayInStorage("intakeSubmissions", submission.id, (item) => ({
      ...item,
      derived: {
        ...item.derived,
        status: newStatus
      }
    }));

    // Then update local state so UI reflects the new status
    setSubmission((prev) => ({
      ...prev,
      derived: {
        ...prev.derived,
        status: newStatus
      }
    }));
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Intake Detail</h1>

      <p style={{ marginBottom: "1rem" }}>
        <strong>Submitted:</strong>{" "}
        {submission.createdAt
          ? new Date(submission.createdAt).toLocaleString()
          : "N/A"}
      </p>

      <p style={{ marginBottom: "1rem" }}>
        <strong>Risk level:</strong>{" "}
        <span style={{ textTransform: "uppercase" }}>
          {derived?.riskLevel || "unknown"}
        </span>
        {"  "}
        <strong style={{ marginLeft: "1rem" }}>Status:</strong>{" "}
        {derived?.status || "unknown"}
      </p>

      <div style={{ marginBottom: "1rem", display: "flex", gap: ".5rem" }}>
        <button onClick={() => updateStatus("new")}>Mark as New</button>
        <button onClick={() => updateStatus("in_review")}>
          Mark as In Review
        </button>
        <button onClick={() => updateStatus("closed")}>
          Mark as Closed
        </button>
      </div>

      <hr style={{ margin: "1.5rem 0" }} />

      {/* Demographics */}
      <section style={{ marginBottom: "1.5rem" }}>
        <h2>Demographics</h2>
        <p>
          <strong>Name:</strong> {demographics?.firstName}{" "}
          {demographics?.lastName}
        </p>
        <p>
          <strong>Age group:</strong> {demographics?.ageGroup || "Not provided"}
        </p>
        <p>
          <strong>ZIP code:</strong>{" "}
          {demographics?.zipCode || "Not provided"}
        </p>
        <p>
          <strong>Email:</strong> {demographics?.email || "Not provided"}
        </p>
      </section>

      {/* Symptoms */}
      <section style={{ marginBottom: "1.5rem" }}>
        <h2>Symptoms</h2>
        <p>
          <strong>Symptoms reported:</strong>{" "}
          {symptoms?.symptoms && symptoms.symptoms.length
            ? symptoms.symptoms.join(", ")
            : "None reported"}
        </p>
        <p>
          <strong>Symptom onset date:</strong>{" "}
          {symptoms?.onsetDate || "Not provided"}
        </p>
        <p>
          <strong>Severity:</strong> {symptoms?.severity || "Not provided"}
        </p>
        <p>
          <strong>Difficulty breathing:</strong>{" "}
          {symptoms?.hasDifficultyBreathing ? "Yes" : "No"}
        </p>
      </section>

      {/* Risk factors */}
      <section style={{ marginBottom: "1.5rem" }}>
        <h2>Risk Factors</h2>
        <p>
          <strong>Conditions:</strong>{" "}
          {riskFactors?.conditions && riskFactors.conditions.length
            ? riskFactors.conditions.join(", ")
            : "None reported"}
        </p>
        <p>
          <strong>Immunocompromised:</strong>{" "}
          {riskFactors?.isImmunocompromised ? "Yes" : "No"}
        </p>
        <p>
          <strong>Pregnant:</strong>{" "}
          {riskFactors?.isPregnant ? "Yes" : "No / Not applicable"}
        </p>
        <p>
          <strong>Recent travel:</strong>{" "}
          {riskFactors?.recentTravel ? "Yes" : "No"}
        </p>
        {riskFactors?.recentTravelDetails && (
          <p>
            <strong>Travel details:</strong>{" "}
            {riskFactors.recentTravelDetails}
          </p>
        )}
        <p>
          <strong>Recent contact with someone sick:</strong>{" "}
          {riskFactors?.recentContactWithSick ? "Yes" : "No / Unsure"}
        </p>
      </section>

      {/* Consent */}
      <section style={{ marginBottom: "1.5rem" }}>
        <h2>Consent & Communication</h2>
        <p>
          <strong>Consent to data use:</strong>{" "}
          {consent?.agreesToDataUse ? "Yes" : "No"}
        </p>
        <p>
          <strong>Consent to follow-up contact:</strong>{" "}
          {consent?.agreesToFollowUp ? "Yes" : "No"}
        </p>
        <p>
          <strong>Preferred language:</strong>{" "}
          {consent?.preferredLanguage === "other"
            ? consent.preferredLanguageOther || "Other"
            : consent?.preferredLanguage || "Not provided"}
        </p>
      </section>

      <button onClick={() => navigate("/review")}>Back to dashboard</button>
    </div>
  );
}
