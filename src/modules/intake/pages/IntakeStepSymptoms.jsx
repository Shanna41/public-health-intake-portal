import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIntakeForm } from "../hooks/useIntakeForm";
import TextInput from "../../../components/form/TextInput";
import CheckboxGroup from "../../../components/form/CheckboxGroup";
import RadioGroup from "../../../components/form/RadioGroup";

const symptomOptions = [
  { label: "Fever", value: "fever" },
  { label: "Cough", value: "cough" },
  { label: "Shortness of breath", value: "shortness_of_breath" },
  { label: "Sore throat", value: "sore_throat" },
  { label: "Fatigue", value: "fatigue" },
  { label: "Headache", value: "headache" },
  { label: "Loss of taste or smell", value: "loss_of_taste_smell" },
  { label: "Nausea or vomiting", value: "nausea" },
  { label: "Diarrhea", value: "diarrhea" }
];

export default function IntakeStepSymptoms() {
  const { formData, updateField, nextStep, previousStep } = useIntakeForm();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const symptomsSection = formData.symptoms || {};
  const symptoms = symptomsSection.symptoms || [];
  const onsetDate = symptomsSection.onsetDate || "";
  const severity = symptomsSection.severity || "";
  const hasDifficultyBreathing = symptomsSection.hasDifficultyBreathing;

  function validate() {
    const newErrors = {};

    if (!symptoms || symptoms.length === 0) {
      newErrors.symptoms = "Select at least one symptom.";
    }

    if (!onsetDate) {
      newErrors.onsetDate = "Symptom onset date is required.";
    }

    if (!severity) {
      newErrors.severity = "Select your overall symptom severity.";
    }

    if (hasDifficultyBreathing !== true && hasDifficultyBreathing !== false) {
      newErrors.hasDifficultyBreathing =
        "Please indicate if you are having difficulty breathing.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    nextStep();
    navigate("/intake/risk-factors");
  }

  function handleBack() {
    previousStep();
    navigate("/intake/demographics");
  }

  // Map tri-state breathing value to radio value
  const breathingValue =
    hasDifficultyBreathing === true
      ? "yes"
      : hasDifficultyBreathing === false
      ? "no"
      : "";

  return (
    <form onSubmit={handleSubmit} style={{ padding: "2rem" }} noValidate>
      <h1>Symptoms</h1>
      <p>Please tell us about any current symptoms.</p>

      {/* Error summary */}
      {Object.keys(errors).length > 0 && (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            border: "1px solid #d00",
            padding: "0.75rem",
            marginBottom: "1rem",
            background: "#ffe6e6"
          }}
        >
          <p>Please fix the following:</p>
          <ul>
            {Object.entries(errors).map(([field, msg]) => (
              <li key={field}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      <CheckboxGroup
        label="Select all symptoms you are experiencing"
        options={symptomOptions}
        values={symptoms}
        onChange={(vals) => updateField("symptoms", "symptoms", vals)}
        error={errors.symptoms}
      />

      <TextInput
        label="When did your symptoms start?"
        type="date"
        value={onsetDate}
        onChange={(v) => updateField("symptoms", "onsetDate", v)}
        required
        error={errors.onsetDate}
      />

      <RadioGroup
        label="How would you describe your overall symptom severity?"
        value={severity}
        onChange={(v) => updateField("symptoms", "severity", v)}
        options={[
          { label: "Mild", value: "mild" },
          { label: "Moderate", value: "moderate" },
          { label: "Severe", value: "severe" }
        ]}
        error={errors.severity}
      />

      <RadioGroup
        label="Are you having difficulty breathing?"
        value={breathingValue}
        onChange={(v) =>
          updateField(
            "symptoms",
            "hasDifficultyBreathing",
            v === "yes" ? true : v === "no" ? false : undefined
          )
        }
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" }
        ]}
        error={errors.hasDifficultyBreathing}
      />

      <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
        <button type="button" onClick={handleBack}>
          Back
        </button>
        <button type="submit">Next</button>
      </div>
    </form>
  );
}
