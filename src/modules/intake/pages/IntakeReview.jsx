import { useNavigate } from "react-router-dom";
import { useIntakeForm } from "../hooks/useIntakeForm";
import { deriveRiskLevel } from "../utils/deriveRiskLevel";
import { addToArrayInStorage } from "../../../utils/storage";

// Map internal codes to readable labels
const SYMPTOM_LABELS = {
  fever: "Fever",
  cough: "Cough",
  shortness_of_breath: "Shortness of breath",
  sore_throat: "Sore throat",
  fatigue: "Fatigue",
  headache: "Headache",
  loss_of_taste_smell: "Loss of taste or smell",
  nausea: "Nausea or vomiting",
  diarrhea: "Diarrhea"
};

const CONDITION_LABELS = {
  none: "None reported",
  heart_disease: "Heart disease",
  lung_disease: "Lung disease (e.g., COPD, asthma)",
  diabetes: "Diabetes",
  kidney_disease: "Kidney disease",
  liver_disease: "Liver disease",
  cancer: "Cancer",
  other: "Other chronic condition"
};

const RISK_LABELS = {
  low: "Low",
  medium: "Medium",
  high: "High"
};

const STATUS_LABELS = {
  new: "New",
  in_review: "In review",
  closed: "Closed"
};

function getRiskBadgeStyle(level) {
  const base = {
    display: "inline-block",
    padding: "0.2rem 0.6rem",
    borderRadius: "999px",
    fontSize: ".85rem",
    fontWeight: 600
  };

  switch (level) {
    case "high":
      return { ...base, backgroundColor: "#ffe5e5", color: "#a20000" };
    case "medium":
      return { ...base, backgroundColor: "#fff4d6", color: "#8a5b00" };
    case "low":
      return { ...base, backgroundColor: "#e5f7e5", color: "#1d6b1d" };
    default:
      return { ...base, backgroundColor: "#eee", color: "#444" };
  }
}

let fallbackIdCounter = 0;

function generateSubmissionId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  fallbackIdCounter += 1;
  return `submission-${fallbackIdCounter}`;
}

export default function IntakeReview() {
  const { formData, previousStep, resetForm } = useIntakeForm();
  const navigate = useNavigate();

  const { demographics, symptoms, riskFactors, consent } = formData;

  const riskLevel = deriveRiskLevel(formData);
  const status = formData.derived?.status || "new";

  function handleBack() {
    previousStep();
    navigate("/intake/consent");
  }

  function handleSubmit(e) {
  e.preventDefault();

  const submission = {
    ...formData,
    derived: {
      ...formData.derived,
      riskLevel,
      status: "new"
    },
    id: generateSubmissionId(),
    createdAt: new Date().toISOString()
  };

  addToArrayInStorage("intakeSubmissions", submission);

  resetForm();
  navigate("/intake/confirmation");
}


  function editSection(path) {
    navigate(path);
  }

  const readableSymptoms =
    symptoms?.symptoms && symptoms.symptoms.length > 0
      ? symptoms.symptoms.map((code) => SYMPTOM_LABELS[code] || code)
      : [];

  const readableConditions =
    riskFactors?.conditions && riskFactors.conditions.length > 0
      ? riskFactors.conditions.map(
          (code) => CONDITION_LABELS[code] || code
        )
      : [];

  return (
    <form onSubmit={handleSubmit} style={pageStyle}>
      <h1>Review Your Information</h1>
      <p style={{ marginBottom: "1rem" }}>
        Please review your answers before submitting. If you need to make
        changes, you can edit any section below.
      </p>

      {/* Overview / summary card */}
      <section style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ marginTop: 0 }}>Triage Summary</h2>
            <p style={{ margin: 0 }}>
              <strong>Risk level: </strong>
              <span style={getRiskBadgeStyle(riskLevel)}>
                {RISK_LABELS[riskLevel] || "Unknown"}
              </span>
            </p>
            <p style={{ margin: "0.3rem 0 0" }}>
              <strong>Current status (for staff workflow): </strong>
              {STATUS_LABELS[status]}
            </p>
          </div>
        </div>
        <p style={{ fontSize: ".9rem", color: "#555", marginTop: "0.75rem" }}>
          This risk level is based on your symptoms and risk factors and helps
          public health staff prioritize follow-up. It is not a diagnosis.
        </p>
      </section>

      {/* Demographics */}
      <section style={cardStyle}>
        <div style={cardHeaderStyle}>
          <h2 style={{ margin: 0 }}>Demographics</h2>
          <button
            type="button"
            onClick={() => editSection("/intake/demographics")}
          >
            Edit
          </button>
        </div>
        <dl style={dlStyle}>
          <dt>Name</dt>
          <dd>
            {demographics?.firstName} {demographics?.lastName}
          </dd>

          <dt>Age group</dt>
          <dd>{demographics?.ageGroup || "Not provided"}</dd>

          <dt>ZIP code</dt>
          <dd>{demographics?.zipCode || "Not provided"}</dd>

          <dt>Email</dt>
          <dd>{demographics?.email || "Not provided"}</dd>
        </dl>
      </section>

      {/* Symptoms */}
      <section style={cardStyle}>
        <div style={cardHeaderStyle}>
          <h2 style={{ margin: 0 }}>Symptoms</h2>
          <button
            type="button"
            onClick={() => editSection("/intake/symptoms")}
          >
            Edit
          </button>
        </div>
        <dl style={dlStyle}>
          <dt>Symptoms reported</dt>
          <dd>
            {readableSymptoms.length > 0
              ? readableSymptoms.join(", ")
              : "None selected"}
          </dd>

          <dt>Symptom onset date</dt>
          <dd>{symptoms?.onsetDate || "Not provided"}</dd>

          <dt>Overall severity</dt>
          <dd>{symptoms?.severity || "Not provided"}</dd>

          <dt>Difficulty breathing</dt>
          <dd>
            {symptoms?.hasDifficultyBreathing === true
              ? "Yes"
              : symptoms?.hasDifficultyBreathing === false
              ? "No"
              : "Not answered"}
          </dd>
        </dl>
      </section>

      {/* Risk factors */}
      <section style={cardStyle}>
        <div style={cardHeaderStyle}>
          <h2 style={{ margin: 0 }}>Risk Factors</h2>
          <button
            type="button"
            onClick={() => editSection("/intake/risk-factors")}
          >
            Edit
          </button>
        </div>
        <dl style={dlStyle}>
          <dt>Underlying conditions</dt>
          <dd>
            {readableConditions.length > 0
              ? readableConditions.join(", ")
              : "None reported"}
          </dd>

          <dt>Immunocompromised</dt>
          <dd>
            {riskFactors?.isImmunocompromised === true
              ? "Yes"
              : riskFactors?.isImmunocompromised === false
              ? "No"
              : "Not answered"}
          </dd>

          <dt>Pregnant</dt>
          <dd>
            {riskFactors?.isPregnant === true
              ? "Yes"
              : riskFactors?.isPregnant === false
              ? "No"
              : "Not answered / Not applicable"}
          </dd>

          <dt>Recent travel</dt>
          <dd>
            {riskFactors?.recentTravel === true
              ? "Yes"
              : riskFactors?.recentTravel === false
              ? "No"
              : "Not answered"}
          </dd>

          {riskFactors?.recentTravelDetails && (
            <>
              <dt>Travel details</dt>
              <dd>{riskFactors.recentTravelDetails}</dd>
            </>
          )}

          <dt>Contact with someone sick</dt>
          <dd>
            {riskFactors?.recentContactWithSick === true
              ? "Yes"
              : riskFactors?.recentContactWithSick === false
              ? "No"
              : riskFactors?.recentContactWithSick === "unsure"
              ? "Unsure"
              : "Not answered"}
          </dd>
        </dl>
      </section>

      {/* Consent */}
      <section style={cardStyle}>
        <div style={cardHeaderStyle}>
          <h2 style={{ margin: 0 }}>Consent & Communication</h2>
          <button
            type="button"
            onClick={() => editSection("/intake/consent")}
          >
            Edit
          </button>
        </div>
        <dl style={dlStyle}>
          <dt>Consent to data use</dt>
          <dd>
            {consent?.agreesToDataUse === true
              ? "Yes"
              : consent?.agreesToDataUse === false
              ? "No"
              : "Not answered"}
          </dd>

          <dt>Consent to follow-up contact</dt>
          <dd>
            {consent?.agreesToFollowUp === true
              ? "Yes"
              : consent?.agreesToFollowUp === false
              ? "No"
              : "Not answered"}
          </dd>

          <dt>Preferred language</dt>
          <dd>
            {consent?.preferredLanguage === "other"
              ? consent.preferredLanguageOther || "Other"
              : consent?.preferredLanguage || "Not provided"}
          </dd>
        </dl>
      </section>

      <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
        <button type="button" onClick={handleBack}>
          Back
        </button>
        <button type="submit">Submit Intake</button>
      </div>
    </form>
  );
}

const pageStyle = {
  padding: "2rem",
  maxWidth: "900px",
  margin: "0 auto"
};

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "1rem 1.25rem",
  marginBottom: "1rem",
  backgroundColor: "#fff"
};

const cardHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "0.75rem"
};

const dlStyle = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 220px) minmax(0, 1fr)",
  rowGap: ".35rem",
  columnGap: "1rem",
  margin: 0
};
