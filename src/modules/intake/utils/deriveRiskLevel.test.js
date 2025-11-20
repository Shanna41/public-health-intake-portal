import { describe, it, expect } from "vitest";
import { deriveRiskLevel } from "./deriveRiskLevel";

describe("deriveRiskLevel", () => {
  it("returns low risk for mild symptoms and no risk factors", () => {
    const formData = {
      symptoms: {
        severity: "mild",
        symptoms: ["cough"],
        hasDifficultyBreathing: false
      },
      riskFactors: {
        conditions: ["none"],
        isImmunocompromised: false,
        isPregnant: false,
        recentTravel: false,
        recentContactWithSick: false
      }
    };

    const result = deriveRiskLevel(formData);
    expect(result).toBe("low");
  });

  it("returns medium risk for multiple symptoms and some risk factors", () => {
    const formData = {
      symptoms: {
        severity: "moderate",
        symptoms: ["fever", "cough", "fatigue"],
        hasDifficultyBreathing: false
      },
      riskFactors: {
        conditions: ["diabetes"],
        isImmunocompromised: false,
        isPregnant: false,
        recentTravel: true,
        recentContactWithSick: false
      }
    };

    const result = deriveRiskLevel(formData);
    expect(result).toBe("medium");
  });

  it("returns high risk for severe symptoms, difficulty breathing, and multiple risks", () => {
    const formData = {
      symptoms: {
        severity: "severe",
        symptoms: ["fever", "cough", "shortness_of_breath", "fatigue"],
        hasDifficultyBreathing: true
      },
      riskFactors: {
        conditions: ["heart_disease", "diabetes"],
        isImmunocompromised: true,
        isPregnant: false,
        recentTravel: true,
        recentContactWithSick: true
      }
    };

    const result = deriveRiskLevel(formData);
    expect(result).toBe("high");
  });

  it("handles missing sections gracefully and defaults to low risk", () => {
    const formData = {}; // no symptoms or risk factors

    const result = deriveRiskLevel(formData);
    expect(result).toBe("low");
  });
});
