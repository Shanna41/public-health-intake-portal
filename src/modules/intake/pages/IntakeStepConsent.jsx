import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIntakeForm } from "../hooks/useIntakeForm";
import RadioGroup from "../../../components/form/RadioGroup";
import SelectInput from "../../../components/form/SelectInput";
import TextInput from "../../../components/form/TextInput";

const languageOptions = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "Other", value: "other" }
];

export default function IntakeStepConsent() {
  const { formData, updateField, nextStep, previousStep } = useIntakeForm();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const consent = formData.consent || {};
  const agreesToDataUse = consent.agreesToDataUse;
  const agreesToFollowUp = consent.agreesToFollowUp;
  const preferredLanguage = consent.preferredLanguage || "";
  const preferredLanguageOther = consent.preferredLanguageOther || "";

  function validate() {
    const newErrors = {};

    // Data use consent must be explicitly answered and must be "yes" to proceed.
    if (agreesToDataUse !== true && agreesToDataUse !== false) {
      newErrors.agreesToDataUse =
        "Please indicate if you agree to the use of your information for public health assessment.";
    } else if (agreesToDataUse === false) {
      newErrors.agreesToDataUse =
        "You must agree to data use in order to submit this form.";
    }

    // Follow-up consent must be explicitly answered (yes or no is fine)
    if (agreesToFollowUp !== true && agreesToFollowUp !== false) {
      newErrors.agreesToFollowUp =
        "Please indicate if public health staff may contact you for follow-up.";
    }

    // Language required
    if (!preferredLanguage) {
      newErrors.preferredLanguage = "Please select your preferred language.";
    }

    // If "other", we require details
    if (preferredLanguage === "other" && !preferredLanguageOther.trim()) {
      newErrors.preferredLanguageOther =
        "Please specify your preferred language.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    nextStep();
    navigate("/intake/review");
  }

  function handleBack() {
    previousStep();
    navigate("/intake/risk-factors");
  }

  function handleLanguageChange(value) {
    updateField("consent", "preferredLanguage", value);
    if (value !== "other") {
      updateField("consent", "preferredLanguageOther", "");
    }
  }

  // Map tri-state booleans to radio values for the UI
  const dataUseValue =
    agreesToDataUse === true
      ? "yes"
      : agreesToDataUse === false
      ? "no"
      : "";

  const followUpValue =
    agreesToFollowUp === true
      ? "yes"
      : agreesToFollowUp === false
      ? "no"
      : "";

  return (
    <form onSubmit={handleSubmit} style={{ padding: "2rem" }} noValidate>
      <h1>Consent & Communication Preferences</h1>

      <p>
        Please review how your information may be used and how public health
        staff may contact you, then indicate your preferences.
      </p>

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

      <RadioGroup
        label="Do you agree that your information may be used for public health assessment and follow-up, in accordance with privacy and confidentiality requirements?"
        value={dataUseValue}
        onChange={(v) =>
          updateField(
            "consent",
            "agreesToDataUse",
            v === "yes" ? true : v === "no" ? false : undefined
          )
        }
        options={[
          { label: "Yes, I agree", value: "yes" },
          { label: "No, I do not agree", value: "no" }
        ]}
        error={errors.agreesToDataUse}
      />

      <RadioGroup
        label="Do you agree to be contacted by public health staff if follow-up is needed?"
        value={followUpValue}
        onChange={(v) =>
          updateField(
            "consent",
            "agreesToFollowUp",
            v === "yes" ? true : v === "no" ? false : undefined
          )
        }
        options={[
          { label: "Yes, you may contact me", value: "yes" },
          { label: "No, do not contact me", value: "no" }
        ]}
        error={errors.agreesToFollowUp}
      />

      <SelectInput
        label="Preferred language for communication"
        value={preferredLanguage}
        onChange={handleLanguageChange}
        options={languageOptions}
        error={errors.preferredLanguage}
      />

      {preferredLanguage === "other" && (
        <TextInput
          label="Please specify your preferred language"
          value={preferredLanguageOther}
          onChange={(v) =>
            updateField("consent", "preferredLanguageOther", v)
          }
          required
          error={errors.preferredLanguageOther}
        />
      )}

      <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
        <button type="button" onClick={handleBack}>
          Back
        </button>
        <button type="submit">Review Your Answers</button>
      </div>
    </form>
  );
}
