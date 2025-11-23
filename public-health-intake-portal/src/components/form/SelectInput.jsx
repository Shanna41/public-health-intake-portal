export default function SelectInput({ label, value, onChange, options, error }) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  const errorId = `${id}-error`;

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        style={{
          display: "block",
          marginTop: ".3rem",
          padding: ".5rem",
          borderColor: error ? "#d00" : "#ccc"
        }}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <div
          id={errorId}
          style={{ color: "#d00", fontSize: ".85rem", marginTop: ".25rem" }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
