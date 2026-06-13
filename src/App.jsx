import { useState, useMemo, useRef, useCallback } from 'react';
import { FIELDS, emptyRecord } from './lib/fields.js';
import { validateRecord } from './lib/validation.js';
import { buildTsvRow } from './lib/tsv.js';
import { useOcr } from './components/useOcr.js';
import FieldRow from './components/FieldRow.jsx';

const STEPS = ['Foto', 'Prüfen', 'Kopieren'];
const OCR_THRESHOLD = 0.5; // < 50 % erkannt => Hinweis auf Neuaufnahme

export default function App() {
  const [step, setStep] = useState(0);            // 0 Foto, 1 Prüfen, 2 fertig
  const [imageUrl, setImageUrl] = useState(null);
  const [record, setRecord] = useState(emptyRecord());
  const [ocrRecord, setOcrRecord] = useState(emptyRecord()); // OCR-Original für „korrigiert?"
  const [fillRatio, setFillRatio] = useState(null);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef(null);
  const cameraRef = useRef(null);

  const { status, progress, error, recognize, reset } = useOcr();

  const { errors } = useMemo(() => validateRecord(record), [record]);
  const isValid = Object.keys(errors).length === 0;
  const tsvRow = useMemo(() => buildTsvRow(record), [record]);

  const handleFile = useCallback(async (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setStep(1);
    const result = await recognize(url);
    if (result) {
      setRecord(result.record);
      setOcrRecord(result.record);
      setFillRatio(result.fillRatio);
    }
  }, [recognize]);

  function onInputChange(e) {
    handleFile(e.target.files?.[0]);
  }

  function updateField(key, value) {
    setRecord((r) => ({ ...r, [key]: value }));
    setCopied(false);
  }

  async function copyRow() {
    if (!isValid) return;
    try {
      await navigator.clipboard.writeText(tsvRow);
      setCopied(true);
      setStep(2);
    } catch {
      // Fallback: Textbereich markieren lassen
      window.prompt('Kopieren mit Strg+C / Cmd+C:', tsvRow);
    }
  }

  function startOver() {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(null);
    setRecord(emptyRecord());
    setOcrRecord(emptyRecord());
    setFillRatio(null);
    setCopied(false);
    setStep(0);
    reset();
    if (fileRef.current) fileRef.current.value = '';
    if (cameraRef.current) cameraRef.current.value = '';
  }

  const lowQuality = fillRatio !== null && fillRatio < OCR_THRESHOLD;

  return (
    <div className="wrap">
      <header className="masthead">
        <p className="eyebrow">Kulturfreunde Rieden e.V.</p>
        <h1>Verwaltungs&shy;automat</h1>
        <p>
          Beitrittsantrag fotografieren, die erkannten Angaben prüfen und als
          fertige Zeile für deine Excel-Mitgliederliste kopieren. Es werden keine
          Daten gespeichert oder versendet.
        </p>
      </header>

      <ol className="steprail">
        {STEPS.map((label, i) => (
          <li key={label} className={i === step ? 'active' : i < step ? 'done' : ''}>
            <span className="num">{i < step ? '✓' : i + 1}</span>
            {label}
          </li>
        ))}
      </ol>

      {/* Schritt 0: Foto */}
      {step === 0 && (
        <section className="panel">
          <div className="actions" style={{ justifyContent: 'center', gap: '14px' }}>
            <button
              className="btn btn-primary"
              onClick={() => cameraRef.current?.click()}
              style={{ flex: '1', maxWidth: '280px' }}
            >
              📷 Kamera öffnen
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => fileRef.current?.click()}
              style={{ flex: '1', maxWidth: '280px' }}
            >
              📁 Datei vom Gerät
            </button>
          </div>
          <input
            ref={cameraRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={onInputChange}
            style={{ display: 'none' }}
          />
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={onInputChange}
            style={{ display: 'none' }}
          />
        </section>
      )}

      {/* Schritt 1 & 2: Prüfen / Ergebnis */}
      {step >= 1 && (
        <section className="panel">
          {imageUrl && <img className="preview-img" src={imageUrl} alt="Aufgenommenes Formular" />}

          {status === 'running' && (
            <>
              <div className="progress"><span style={{ width: `${progress}%` }} /></div>
              <div className="progress-label">Text wird erkannt … {progress}%</div>
            </>
          )}

          {status === 'error' && (
            <div className="notice warn">
              Die Texterkennung ist fehlgeschlagen{error ? `: ${error}` : ''}. Du
              kannst die Felder unten trotzdem von Hand ausfüllen.
            </div>
          )}

          {status === 'done' && lowQuality && (
            <div className="notice warn">
              Es wurde nur wenig Text erkannt. Bitte prüfe das Foto (Licht, Schärfe,
              Ausrichtung) – oder ergänze die Felder unten von Hand.
            </div>
          )}

          {status === 'done' && !lowQuality && (
            <div className="notice info">
              Erkannte Angaben unten prüfen und bei Bedarf korrigieren.
            </div>
          )}

          {status !== 'running' && (
            <>
              <div className="fieldlist">
                {FIELDS.map((field) => (
                  <FieldRow
                    key={field.key}
                    field={field}
                    value={record[field.key]}
                    error={errors[field.key]}
                    corrected={
                      record[field.key] !== ocrRecord[field.key] &&
                      record[field.key] !== ''
                    }
                    onChange={(v) => updateField(field.key, v)}
                  />
                ))}
              </div>

              <TsvPreview record={record} />

              <div className="actions">
                <button
                  className="btn btn-primary"
                  disabled={!isValid}
                  onClick={copyRow}
                >
                  In Zwischenablage kopieren
                </button>
                <button className="btn btn-ghost" onClick={startOver}>
                  Neues Formular
                </button>
                {copied && <span className="copied-flash">✓ Zeile kopiert – jetzt in Excel einfügen (Strg+V)</span>}
                {!isValid && (
                  <span className="copied-flash" style={{ color: 'var(--rose)' }}>
                    Bitte zuerst die markierten Pflichtfelder ausfüllen.
                  </span>
                )}
              </div>
            </>
          )}
        </section>
      )}

      <p className="foot">
        <strong>Datensicherheit:</strong> Die Texterkennung läuft vollständig in
        deinem Browser. Das Foto und die erkannten Daten verlassen dein Gerät
        nicht und werden nirgends gespeichert. Beim Klick auf „Neues Formular"
        wird alles verworfen. Die Mitgliederliste pflegst du lokal in Excel.
      </p>
    </div>
  );
}

// Vorschau der kopierten Excel-Zeile – jede Zelle mit ihrem Spaltenbuchstaben.
function TsvPreview({ record }) {
  return (
    <div className="tsv-preview">
      <div className="tsv-head">Vorschau der Excel-Zeile (eine Zelle je Spalte A–P)</div>
      <div className="tsv-row">
        {FIELDS.map((field) => {
          const cell = buildTsvRow(record).split('\t')[FIELDS.indexOf(field)];
          return (
            <div key={field.key} className={`tsv-cell${cell === '' ? ' empty' : ''}`}>
              <span className="lbl">{field.column}</span>
              {cell === '' ? '—' : cell}
            </div>
          );
        })}
      </div>
    </div>
  );
}
