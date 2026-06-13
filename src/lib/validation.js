// Reine Validierungsfunktionen – ohne UI, vollständig unit-testbar.
import { FIELDS } from './fields.js';

// --- Einzelne Format-Prüfungen -------------------------------------------

export function isValidEmail(value) {
  if (!value) return false;
  // bewusst simpel gehalten: ein @ mit Text davor/danach und einem Punkt in der Domain
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidPostalCode(value) {
  if (!value) return false;
  return /^\d{5}$/.test(value.trim());
}

// Deutsches Datum TT.MM.JJJJ, inkl. grober Plausibilitätsprüfung
export function isValidGermanDate(value) {
  if (!value) return false;
  const m = value.trim().match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!m) return false;
  const day = Number(m[1]);
  const month = Number(m[2]);
  const year = Number(m[3]);
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  if (year < 1900 || year > 2100) return false;
  // Tag gegen tatsächliche Monatslänge prüfen
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

// IBAN: hier deutsche IBAN (DE + 20 Stellen = 22 Zeichen). Leerzeichen erlaubt.
export function isValidIban(value) {
  if (!value) return false;
  const cleaned = value.replace(/\s+/g, '').toUpperCase();
  return /^DE\d{20}$/.test(cleaned);
}

export function isValidMembershipType(value) {
  return value === 'Aktiv' || value === 'Passiv';
}

export function isValidConsent(value) {
  return value === 'Ja' || value === 'Nein';
}

// Jahresbeitrag: akzeptiert "24", "24,00", "24.00". Mindestbeitrag 6 € (Minderjährige).
export function isValidFee(value) {
  if (value === undefined || value === null || value === '') return false;
  const num = parseFee(value);
  if (num === null) return false;
  return num >= 6;
}

// Beitrag in eine Zahl parsen (deutsches Komma oder Punkt). null bei Fehler.
export function parseFee(value) {
  if (typeof value === 'number') return value;
  if (!value) return null;
  const normalized = String(value).replace(/[€\s]/g, '').replace(',', '.');
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) return null;
  return Number(normalized);
}

// --- Feldweise Validierung ------------------------------------------------

// Liefert eine Fehlermeldung (String) oder null, wenn das Feld gültig ist.
export function validateField(field, value) {
  const v = value == null ? '' : String(value).trim();

  if (field.required && v === '') {
    return 'Dieses Feld ist erforderlich.';
  }
  // Optionale, leere Felder sind in Ordnung
  if (!field.required && v === '') {
    return null;
  }

  switch (field.type) {
    case 'email':
      return isValidEmail(v) ? null : 'Bitte eine gültige E-Mail-Adresse eingeben.';
    case 'date':
      return isValidGermanDate(v) ? null : 'Bitte ein Datum im Format TT.MM.JJJJ eingeben.';
    case 'iban':
      return isValidIban(v) ? null : 'Bitte eine gültige deutsche IBAN eingeben (DE + 20 Ziffern).';
    case 'choice':
      return isValidMembershipType(v) ? null : 'Bitte „Aktiv" oder „Passiv" wählen.';
    case 'consent':
      return isValidConsent(v) ? null : 'Bitte „Ja" oder „Nein" wählen.';
    case 'money':
      return isValidFee(v) ? null : 'Bitte einen Betrag von mindestens 6 € eingeben.';
    default:
      if (field.key === 'postalCode') {
        return isValidPostalCode(v) ? null : 'Die PLZ muss aus genau 5 Ziffern bestehen.';
      }
      return null;
  }
}

// Den ganzen Datensatz prüfen. Liefert { isValid, errors } mit errors[fieldKey] = message.
export function validateRecord(record) {
  const errors = {};
  for (const field of FIELDS) {
    const error = validateField(field, record[field.key]);
    if (error) errors[field.key] = error;
  }
  return { isValid: Object.keys(errors).length === 0, errors };
}
