// Parst den OCR-Rohtext des Beitrittsformulars in einen Teil-Datensatz.
// Arbeitet zeilenbasiert anhand der bekannten Feldbeschriftungen des Formulars
// (siehe docs/03-ocr-form-spec.md). Reine Funktion, vollständig unit-testbar.
import { emptyRecord } from './fields.js';

// Holt den Wert nach einer Beschriftung aus einer Zeile, z.B.
// "Vorname: Max" -> "Max". Trennt bei ":" und entfernt führende Unterstriche.
function valueAfterLabel(line, labelRegex) {
  const m = line.match(labelRegex);
  if (!m) return null;
  let rest = line.slice(m.index + m[0].length);
  // Doppelpunkt und Formular-Unterstriche/Punkte entfernen
  rest = rest.replace(/^[:\s]+/, '').replace(/[_.]{2,}/g, ' ').trim();
  return rest || null;
}

// Erstes Vorkommen eines Musters im Gesamttext.
function firstMatch(text, regex) {
  const m = text.match(regex);
  return m ? m[1].trim() : null;
}

export function parseOcrText(rawText) {
  const record = emptyRecord();
  if (!rawText) return record;

  const text = rawText.replace(/\u00a0/g, ' ');
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

  for (const line of lines) {
    // Kombinierte Zeile "Name: X   Geburtsname: Y" – beide Werte trennen
    const nameAndBirth = line.match(/^name[:\s]+(.+?)\s+geburtsname[:\s]+(.+)$/i);
    if (nameAndBirth) {
      if (!record.lastName) record.lastName = nameAndBirth[1].trim();
      if (!record.birthName) record.birthName = nameAndBirth[2].trim();
      continue;
    }

    // Kombinierte Zeile "Telefon: X   Mobil: Y" – beide Werte trennen
    const phoneAndMobile = line.match(/telefon[:\s]+(.+?)\s+mobil[:\s]+(.+)$/i);
    if (phoneAndMobile) {
      if (!record.phone) record.phone = phoneAndMobile[1].trim();
      if (!record.phoneMobile) record.phoneMobile = phoneAndMobile[2].trim();
      continue;
    }

    // Reihenfolge wichtig: spezifischere Labels zuerst
    const vorname = valueAfterLabel(line, /vorname/i);
    if (vorname && !record.firstName) { record.firstName = vorname; continue; }

    const geburtsname = valueAfterLabel(line, /geburtsname/i);
    if (geburtsname && !record.birthName) { record.birthName = geburtsname; continue; }

    // "Name:" nur, wenn es nicht Vor-/Geburtsname war
    if (/^name\b/i.test(line) && !record.lastName) {
      const nachname = valueAfterLabel(line, /name/i);
      if (nachname) { record.lastName = nachname; continue; }
    }

    const strasse = valueAfterLabel(line, /stra(?:ß|ss)e[, ]*hausnummer|stra(?:ß|ss)e/i);
    if (strasse && !record.street) { record.street = strasse; continue; }

    const mobil = valueAfterLabel(line, /mobil/i);
    if (mobil && !record.phoneMobile) { record.phoneMobile = mobil; continue; }

    const telefon = valueAfterLabel(line, /telefon/i);
    if (telefon && !record.phone) { record.phone = telefon; continue; }

    const email = valueAfterLabel(line, /e-?mail/i);
    if (email && !record.email) { record.email = email; continue; }

    const geburtsdatum = valueAfterLabel(line, /geburtsdatum/i);
    if (geburtsdatum && !record.birthDate) { record.birthDate = geburtsdatum; continue; }

    const kontoinhaber = valueAfterLabel(line, /kontoinhaber/i);
    if (kontoinhaber && !record.accountHolder) { record.accountHolder = kontoinhaber; continue; }

    const iban = valueAfterLabel(line, /iban/i);
    if (iban && !record.iban) { record.iban = iban.replace(/\s+/g, '').toUpperCase(); continue; }
  }

  // Felder, die im Gesamttext per Muster gesucht werden
  if (!record.postalCode || !record.city) {
    // "PLZ, ORT: 90518 Altdorf"
    const plzOrt = firstMatch(text, /plz[, ]*ort[:\s]*([\s\S]{0,60})/i);
    if (plzOrt) {
      const pm = plzOrt.match(/(\d{5})\s+([A-Za-zÄÖÜäöüß .-]+)/);
      if (pm) {
        if (!record.postalCode) record.postalCode = pm[1];
        if (!record.city) record.city = pm[2].trim();
      }
    }
  }

  // IBAN aus dem Gesamttext, falls Label-basiert nichts kam
  if (!record.iban) {
    const ibanMatch = text.match(/DE\d{2}[\d\s]{18,}/i);
    if (ibanMatch) record.iban = ibanMatch[0].replace(/\s+/g, '');
  }

  // E-Mail aus dem Gesamttext, falls Label-basiert nichts kam
  if (!record.email) {
    const emailMatch = text.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
    if (emailMatch) record.email = emailMatch[0];
  }

  // Mitgliedschaftstyp: angekreuztes Feld ist per OCR unsicher.
  // Heuristik: Wenn nur eines der Wörter vorkommt, dieses nehmen.
  const hasAktiv = /aktiv/i.test(text);
  const hasPassiv = /passiv/i.test(text);
  if (hasAktiv && !hasPassiv) record.membershipType = 'Aktiv';
  else if (hasPassiv && !hasAktiv) record.membershipType = 'Passiv';
  // bei beiden/keinem: leer lassen -> Nutzer wählt manuell

  // Jahresbeitrag: "Höhe von 24 €"
  const fee = firstMatch(text, /h(?:ö|oe)he von\s*([\d.,]+)\s*€?/i)
    || firstMatch(text, /(\d{1,4}[.,]\d{2})\s*€/);
  if (fee) record.annualFee = fee.replace(/[^\d.,]/g, '');

  return record;
}

// Wie viele der Felder konnte OCR füllen? Für die Qualitätsschwelle.
export function ocrFillRatio(record, fieldKeys) {
  const total = fieldKeys.length;
  if (total === 0) return 0;
  const filled = fieldKeys.filter((k) => record[k] && String(record[k]).trim() !== '').length;
  return filled / total;
}
