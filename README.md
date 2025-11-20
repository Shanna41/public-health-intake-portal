# Public Health & Triage Intake Portal

A React-based intake and triage prototype designed to mirror real-world public health workflows:

- Multi-step public intake form (demographics, symptoms, risk factors, consent)  
- Automated risk scoring for triage  
- Staff review dashboard with status workflow  
- Accessibility-minded validation (Section 508–oriented patterns)  
- Local-only storage for demo (no backend)

This project is intended as a portfolio piece for front-end roles in public health and federal environments (e.g., CDC contractors).

---

## Features

### 📝 Public Intake Workflow

- Multi-step form:
  - Demographics  
  - Symptoms  
  - Risk Factors  
  - Consent & communication preferences  
  - Review & confirmation  
- Centralized form state managed via a custom React hook  
- Reusable, controlled form components for predictable behavior  

---

### ⚠️ Risk Scoring & Triage

`deriveRiskLevel(formData)` computes a **low / medium / high** triage level based on:

- Symptom severity  
- High-risk symptoms  
- Underlying medical conditions  
- Exposure & travel history  

The risk score is:

- Persisted with each submission  
- Displayed in the staff dashboard  
- Highlighted on the Review screen with a color-coded badge  

---

### 👩‍💻 Staff Review Dashboard

- Summary table of all submissions  
- Risk & status indicators  
- Detail view with full intake information  
- Ability to update submission status  
- Persistence via `localStorage` for demonstration  

---

### ✅ Validation & Accessibility (Section 508 Minded)

- Required field validation  
- Context-based rule enforcement  
- Accessible error summary (`role="alert"`, `aria-live="assertive"`)  
- Field-level ARIA attributes (`aria-invalid`, `aria-describedby`)  
- Keyboard-navigable forms  
- Clear, readable labels and semantic structure  

---

### 🧪 Testing

- **Vitest** used for core logic testing  
- Unit tests for `deriveRiskLevel` covering:
  - Low / medium / high outcomes  
  - Mixed-data scenarios  
  - Missing data handling  

---

## Tech Stack

- **React (Vite)**  
- **React Router**  
- **Custom React Hooks / Context API**  
- **Vitest**  
- **LocalStorage**

---

## Project Structure (High Level)

```
src/
  components/
    form/
      CheckboxGroup.jsx
      RadioGroup.jsx
      SelectInput.jsx
      TextInput.jsx

  modules/
    intake/
      hooks/
        useIntakeForm.jsx
      pages/
        IntakeIntro.jsx
        IntakeStepDemographics.jsx
        IntakeStepSymptoms.jsx
        IntakeStepRiskFactors.jsx
        IntakeStepConsent.jsx
        IntakeReview.jsx
        IntakeConfirmation.jsx
      utils/
        deriveRiskLevel.js

    review/
      pages/
        ReviewDashboard.jsx
        ReviewDetail.jsx

  routes/
    Home.jsx
    IntakeRoutes.jsx
    ReviewRoutes.jsx

  utils/
    storage.js

  App.jsx
  main.jsx
```

---

# 📘 Architecture Overview (Enterprise-Lite)

This project follows a modular front-end architecture appropriate for micro front-end environments often used in federal systems.

### Core Principles

#### **Separation of concerns**
Intake workflow, triage logic, and staff review tooling each exist in their own module.

#### **Reusable component library**
Shared form components (e.g., `TextInput`, `RadioGroup`, `SelectInput`) ensure consistency and maintainability.

#### **Context-driven state**
The intake workflow shares state via a centralized custom hook (`useIntakeForm`), avoiding prop drilling and ensuring predictable step navigation.

#### **Route-based step orchestration**
Each intake step maps to an explicit route, enabling:

- Deep linking  
- Backtracking  
- Cleaner, modular structure  

#### **Stateless presentation components**
Pages receive state & handlers rather than handling shared logic internally.

---

# 🧩 Compliance & Accessibility Notes (508-Oriented)

Federal health applications must meet **Section 508** and **WCAG 2.1 AA** standards. This prototype incorporates:

### 1. Error Summary Pattern

A screen-reader friendly error summary appears at the top of each step.

Uses:

- `role="alert"`  
- `aria-live="assertive"`

### 2. Field-Level Accessibility

- `aria-invalid`  
- `aria-describedby`  
- Explicit `<label for="...">` bindings  
- Full keyboard accessibility  

### 3. Semantic Groupings

- `<dl>` lists for structured review sections  
- `<fieldset>` / `<legend>` for grouped inputs  

### 4. Color-Contrast Considerations

- Risk badges use both color **and** text  
- Meets WCAG contrast requirements  

### 5. Global Consistency

All form components follow shared accessibility patterns, allowing easy scaling across modules.

---

# 🚧 Known Limitations

This demo intentionally omits or simplifies:

- Authentication & role-based authorization  
- Backend services / API integration  
- Azure DevOps pipelines  
- KendoReact component replacements  
- Automated accessibility testing (axe-core, MS Insights)  
- Load tests and error boundary implementations  

---

# 🚀 Planned / Future Enhancements

- Replace `localStorage` with API-backed persistence  
- Integrate with Azure App Services / micro front-end hosts  
- Replace custom inputs with KendoReact equivalents  
- Add automated 508 testing (axe-core or CI integrations)  
- Expand Vitest tests + add React Testing Library  
- Modularize triage logic for different disease profiles  

---

# 🛠️ Running the Project

\`\`\`bash
npm install
npm run dev
npm test
\`\`\`

---

# 🔍 How to Review This Project

## 1. Multi-Step Form Architecture
**File:**  
`src/modules/intake/hooks/useIntakeForm.jsx`

**Highlights:**

- Centralized state management  
- Step navigation  
- Validation structure  
- Clean separation between UI and logic  
- Demonstrates React hooks proficiency  

---

## 2. Reusable Form Components (Accessibility + Control Patterns)
**Files:**  
`src/components/form/TextInput.jsx`  
`src/components/form/SelectInput.jsx`  
`src/components/form/RadioGroup.jsx`  
`src/components/form/CheckboxGroup.jsx`

**What to look for:**

- Controlled components  
- ARIA patterns  
- Consistent labeling  
- Keyboard accessibility  
- Reusable structure for enterprise scaling  

---

## 3. Intake Step Implementations
**Folder:**  
`src/modules/intake/pages/`

Key files:

- IntakeStepDemographics.jsx  
- IntakeStepSymptoms.jsx  
- IntakeStepRiskFactors.jsx  
- IntakeStepConsent.jsx  

---

## 4. Triage Logic
**File:**  
`src/modules/intake/utils/deriveRiskLevel.js`

---

## 5. Unit Tests
**File:**  
`deriveRiskLevel.test.js`

---

## 6. Staff Review Dashboard
**Files:**  
`src/modules/review/pages/ReviewDashboard.jsx`  
`src/modules/review/pages/ReviewDetail.jsx`

---

## 7. Routing Structure
**Files:**  
`src/routes/IntakeRoutes.jsx`  
`src/routes/ReviewRoutes.jsx`  
`src/routes/Home.jsx`

---

## 8. Architecture Overview
See Architecture section above for deeper details.
