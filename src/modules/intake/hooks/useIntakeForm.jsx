import { createContext, useContext, useState } from "react";

const IntakeFormContext = createContext(null);

const initialData = {
  demographics: {
    firstName: "",
    lastName: "",
    ageGroup: "",
    zipCode: "",
    email: ""
  },
  symptoms: {
    symptoms: [],
    onsetDate: "",
    severity: "",
    hasDifficultyBreathing: false
  },
  riskFactors: {
    conditions: [],
    isImmunocompromised: false,
    isPregnant: false,
    recentTravel: false,
    recentTravelDetails: "",
    recentContactWithSick: false
  },
  consent: {
    agreesToDataUse: false,
    agreesToFollowUp: false,
    preferredLanguage: "",
    preferredLanguageOther: ""
  },
  derived: {
    riskLevel: "",
    status: "new"
  }
};

export function IntakeFormProvider({ children }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialData);

  function updateField(section, field, value) {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  }

  function nextStep() {
    setStep((prev) => prev + 1);
  }

  function previousStep() {
    setStep((prev) => Math.max(prev - 1, 0));
  }

  function resetForm() {
    setFormData(initialData);
    setStep(0);
  }

  const value = {
    step,
    formData,
    updateField,
    nextStep,
    previousStep,
    resetForm
  };

  return (
    <IntakeFormContext.Provider value={value}>
      {children}
    </IntakeFormContext.Provider>
  );
}

export function useIntakeForm() {
  const ctx = useContext(IntakeFormContext);
  if (!ctx) {
    throw new Error("useIntakeForm must be used within an IntakeFormProvider");
  }
  return ctx;
}
