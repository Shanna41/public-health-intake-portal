import { Routes, Route } from "react-router-dom";
import ReviewDashboard from "../modules/review/pages/ReviewDashboard";
import ReviewDetail from "../modules/review/pages/ReviewDetail";

export default function ReviewRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ReviewDashboard />} />
      <Route path="/detail/:id" element={<ReviewDetail />} />
    </Routes>
  );
}
