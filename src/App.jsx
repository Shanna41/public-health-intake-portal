import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntakeRoutes from "./routes/IntakeRoutes";
import ReviewRoutes from "./routes/ReviewRoutes";
import { IntakeFormProvider } from "./modules/intake/hooks/useIntakeForm";
import Home from "./routes/Home"; // we'll create this next

export default function App() {
  return (
    <BrowserRouter>
      <IntakeFormProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/intake/*" element={<IntakeRoutes />} />
          <Route path="/review/*" element={<ReviewRoutes />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </IntakeFormProvider>
    </BrowserRouter>
  );
}
