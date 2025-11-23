export default function CheckboxGroup({
  label,
  options,
  values,
  onChange,
  error
}) {
  const groupId = label.toLowerCase().replace(/\s+/g, "-");
  const errorId = `${groupId}-error`;

  function handleToggle(value) {
    if (values.includes(value)) {
      onChange(values.filter((v) => v !== value));
    } else {
      onChange([...values, value]);
    }
  }

  return (
    <fieldset
      style={{ marginBottom: "1rem" }}
      aria-invalid={!!error}
      aria-describedby={error ? errorId : undefined}
    >
      <legend>{label}</legend>
      {options.map((opt) => {
        const id = `${groupId}-${opt.value}`;
        return (
          <div key={opt.value} style={{ marginBottom: ".25rem" }}>
            <input
              id={id}
              type="checkbox"
              checked={values.includes(opt.value)}
              onChange={() => handleToggle(opt.value)}
            />
            <label htmlFor={id} style={{ marginLeft: ".5rem" }}>
              {opt.label}
            </label>
          </div>
        );
      })}
      {error && (
        <div
          id={errorId}
          style={{ color: "#d00", fontSize: ".85rem", marginTop: ".25rem" }}
        >
          {error}
        </div>
      )}
    </fieldset>
  );
}
