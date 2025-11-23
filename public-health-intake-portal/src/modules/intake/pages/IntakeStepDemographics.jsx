import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIntakeForm } from "../hooks/useIntakeForm";
import TextInput from "../../../components/form/TextInput";
import SelectInput from "../../../components/form/SelectInput";

export default function IntakeStepDemographics() {
  const { formData, updateField, nextStep } = useIntakeForm();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const data = formData.demographics;

  function validate() {
    const newErrors = {};

    if (!data.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!data.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!data.zipCode.trim()) newErrors.zipCode = "ZIP code is required.";
    if (!data.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    nextStep();
    navigate("/intake/symptoms");
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: "2rem" }} noValidate>
      <h1>Demographics</h1>

      {/* Simple error summary */}
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

      <TextInput
        label="First Name"
        value={data.firstName}
        onChange={(v) => updateField("demographics", "firstName", v)}
        required
        error={errors.firstName}
      />

      <TextInput
        label="Last Name"
        value={data.lastName}
        onChange={(v) => updateField("demographics", "lastName", v)}
        required
        error={errors.lastName}
      />

      <SelectInput
        label="Age Group"
        value={data.ageGroup}
        onChange={(v) => updateField("demographics", "ageGroup", v)}
        options={[
          { label: "Under 18", value: "under18" },
          { label: "18–40", value: "18-40" },
          { label: "41–65", value: "41-65" },
          { label: "65+", value: "65plus" }
        ]}
      />

      <TextInput
        label="Zip Code"
        value={data.zipCode}
        onChange={(v) => updateField("demographics", "zipCode", v)}
        required
        error={errors.zipCode}
      />

      <TextInput
        label="Email"
        value={data.email}
        onChange={(v) => updateField("demographics", "email", v)}
        required
        error={errors.email}
      />

      <button type="submit" style={{ marginTop: "1rem" }}>
        Next
      </button>
    </form>
  );
}
