// Eine Zeile im Verifikations-„Register". Zeigt Excel-Spaltenbuchstabe, Label,
// passenden Eingabetyp, Fehlermeldung und ob das Feld manuell korrigiert wurde.
export default function FieldRow({ field, value, error, corrected, onChange }) {
  const id = `field-${field.key}`;

  function renderInput() {
    if (field.type === 'choice') {
      return (
        <div className="segmented" role="group" aria-label={field.label}>
          {field.options.map((opt) => (
            <button
              type="button"
              key={opt}
              aria-pressed={value === opt}
              onClick={() => onChange(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      );
    }
    if (field.type === 'consent') {
      return (
        <div className="segmented" role="group" aria-label={field.label}>
          {['Ja', 'Nein'].map((opt) => (
            <button
              type="button"
              key={opt}
              aria-pressed={value === opt}
              onClick={() => onChange(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      );
    }
    const inputType = field.type === 'email' ? 'email' : 'text';
    return (
      <input
        id={id}
        type={inputType}
        value={value}
        inputMode={field.type === 'money' ? 'decimal' : undefined}
        placeholder={
          field.type === 'date' ? 'TT.MM.JJJJ'
          : field.type === 'money' ? 'z. B. 24,00'
          : ''
        }
        aria-invalid={!!error}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  return (
    <div className={`field${error ? ' invalid' : ''}`}>
      <span className="col" aria-hidden="true">{field.column}</span>
      <div>
        <label htmlFor={id}>
          {field.label}
          {field.required && <span className="req" title="Pflichtfeld">*</span>}
        </label>
        {renderInput()}
        {error && <div className="err">{error}</div>}
        {!error && corrected && <div className="corrected">✓ manuell korrigiert</div>}
      </div>
    </div>
  );
}
