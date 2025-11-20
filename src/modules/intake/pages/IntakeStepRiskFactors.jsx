import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIntakeForm } from "../hooks/useIntakeForm";
import CheckboxGroup from "../../../components/form/CheckboxGroup";
import RadioGroup from "../../../components/form/RadioGroup";
import TextInput from "../../../components/form/TextInput";

const conditionOptions = [
  { label: "None", value: "none" },
  { label: "Heart disease", value: "heart_disease" },
  { label: "Lung disease (e.g., COPD, asthma)", value: "lung_disease" },
  { label: "Diabetes", value: "diabetes" },
  { label: "Kidney disease", value: "kidney_disease" },
  { label: "Liver disease", value: "liver_disease" },
  { label: "Cancer", value: "cancer" },
  { label: "Other chronic condition", value: "other" }
];

export default function IntakeStepRiskFactors() {
  const { formData, updateField, nextStep, previousStep } = useIntakeForm();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const rf = formData.riskFactors || {};
  const conditions = rf.conditions || [];
  const isImmunocompromised = rf.isImmunocompromised;
  const isPregnant = rf.isPregnant;
  const recentTravel = rf.recentTravel;
  const recentTravelDetails = rf.recentTravelDetails || "";
  const recentContactWithSick = rf.recentContactWithSick;

  function validate() {
    const newErrors = {};

    // Conditions: must at least choose something
    if (!conditions || conditions.length === 0) {
      newErrors.conditions = "Select at least one option for underlying conditions.";
    }

    // Immunocompromised required yes/no
    if (isImmunocompromised !== true && isImmunocompromised !== false) {
      newErrors.isImmunocompromised =
        "Please indicate if you are immunocompromised.";
    }

    // Pregnancy is optional in this simple version (could be conditional later)

    // Travel required yes/no; details required if yes
    if (recentTravel !== true && recentTravel !== false) {
      newErrors.recentTravel = "Please indicate if you have traveled recently.";
    } else if (recentTravel === true && !recentTravelDetails.trim()) {
      newErrors.recentTravelDetails =
        "Please provide details about your recent travel.";
    }

    // Contact with sick person required yes/no/unsure
    if (
      recentContactWithSick !== true &&
      recentContactWithSick !== false &&
      recentContactWithSick !== "unsure"
    ) {
      newErrors.recentContactWithSick =
        "Please indicate if you have been in contact with someone who is sick, or select 'Unsure'.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    nextStep();
    navigate("/intake/consent");
  }

  function handleBack() {
    previousStep();
    navigate("/intake/symptoms");
  }

  // Map tri-state booleans to radio values
  const immunoValue =
    isImmunocompromised === true
      ? "yes"
      : isImmunocompromised === false
      ? "no"
      : "";

  const pregnantValue =
    isPregnant === true ? "yes" : isPregnant === false ? "no" : "";

  const travelValue =
    recentTravel === true ? "yes" : recentTravel === false ? "no" : "";

  const contactValue =
    recentContactWithSick === true
      ? "yes"
      : recentContactWithSick === false
      ? "no"
      : recentContactWithSick === "unsure"
      ? "unsure"
      : "";

  return (
    <form onSubmit={handleSubmit} style={{ padding: "2rem" }} noValidate>
      <h1>Risk Factors</h1>
      <p>Please tell us about any underlying conditions or exposure risks.</p>

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
        label="Do you have any of the following underlying conditions?"
        options={conditionOptions}
        values={conditions}
        onChange={(vals) => {
          // If "none" is selected, clear all others and keep only "none"
          if (vals.includes("none")) {
            updateField("riskFactors", "conditions", ["none"]);
          } else {
            updateField("riskFactors", "conditions", vals);
          }
        }}
        error={errors.conditions}
      />

      <RadioGroup
        label="Are you immunocompromised (for example, due to medications, HIV, or another condition)?"
        value={immunoValue}
        onChange={(v) =>
          updateField(
            "riskFactors",
            "isImmunocompromised",
            v === "yes" ? true : v === "no" ? false : undefined
          )
        }
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" }
        ]}
        error={errors.isImmunocompromised}
      />

      <RadioGroup
        label="Are you currently pregnant?"
        value={pregnantValue}
        onChange={(v) =>
          updateField(
            "riskFactors",
            "isPregnant",
            v === "yes" ? true : v === "no" ? false : undefined
          )
        }
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" }
        ]}
        // Pregnancy optional here; no error prop
      />

      <RadioGroup
        label="Have you traveled outside your local area in the past 14 days?"
        value={travelValue}
        onChange={(v) =>
          updateField(
            "riskFactors",
            "recentTravel",
            v === "yes" ? true : v === "no" ? false : undefined
          )
        }
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" }
        ]}
        error={errors.recentTravel}
      />

      <TextInput
        label="If yes, where did you travel?"
        value={recentTravelDetails}
        onChange={(v) =>
          updateField("riskFactors", "recentTravelDetails", v)
        }
        // required only when recentTravel === true; validation handles it
        error={errors.recentTravelDetails}
      />

      <RadioGroup
        label="Have you been in close contact with someone who is sick or has a confirmed infection?"
        value={contactValue}
        onChange={(v) =>
          updateField(
            "riskFactors",
            "recentContactWithSick",
            v === "yes" ? true : v === "no" ? false : v === "unsure" ? "unsure" : undefined
          )
        }
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
          { label: "Unsure", value: "unsure" }
        ]}
        error={errors.recentContactWithSick}
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
