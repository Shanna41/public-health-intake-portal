import { Routes, Route } from "react-router-dom";

import IntakeIntro from "../modules/intake/pages/IntakeIntro";
import IntakeStepDemographics from "../modules/intake/pages/IntakeStepDemographics";
import IntakeStepSymptoms from "../modules/intake/pages/IntakeStepSymptoms";
import IntakeStepRiskFactors from "../modules/intake/pages/IntakeStepRiskFactors";
import IntakeStepConsent from "../modules/intake/pages/IntakeStepConsent";
import IntakeReview from "../modules/intake/pages/IntakeReview";
import IntakeConfirmation from "../modules/intake/pages/IntakeConfirmation";

export default function IntakeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<IntakeIntro />} />
      <Route path="/demographics" element={<IntakeStepDemographics />} />
      <Route path="/symptoms" element={<IntakeStepSymptoms />} />
      <Route path="/risk-factors" element={<IntakeStepRiskFactors />} />
      <Route path="/consent" element={<IntakeStepConsent />} />
      <Route path="/review" element={<IntakeReview />} />
      <Route path="/confirmation" element={<IntakeConfirmation />} />
    </Routes>
  );
}
