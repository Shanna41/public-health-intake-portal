export function deriveRiskLevel(formData) {
  const symptoms = formData.symptoms || {};
  const riskFactors = formData.riskFactors || {};

  let score = 0;

  // Symptom-based scoring
  if (symptoms.severity === "severe") score += 3;
  if (symptoms.severity === "moderate") score += 2;
  if (symptoms.hasDifficultyBreathing) score += 3;

  const symptomCount = (symptoms.symptoms || []).length;
  if (symptomCount >= 3) score += 1;
  if (symptomCount >= 5) score += 1; // extra bump for many symptoms

  // Risk factor scoring
  const conditions = riskFactors.conditions || [];
  const hasChronicConditions =
    conditions.length > 0 && !conditions.includes("none");
  if (hasChronicConditions) score += 2;

  if (riskFactors.isImmunocompromised) score += 3;
  if (riskFactors.isPregnant) score += 1;
  if (riskFactors.recentTravel) score += 1;
  if (riskFactors.recentContactWithSick) score += 2;

  // Map score to simple risk levels
  if (score >= 7) return "high";
  if (score >= 3) return "medium";
  return "low";
}
