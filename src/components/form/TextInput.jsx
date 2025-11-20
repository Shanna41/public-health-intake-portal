export default function TextInput({
  label,
  value,
  onChange,
  required,
  type = "text",
  error
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  const errorId = `${id}-error`;

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor={id}>
        {label} {required && "*"}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        style={{
          display: "block",
          marginTop: ".3rem",
          padding: ".5rem",
          borderColor: error ? "#d00" : "#ccc"
        }}
      />
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
