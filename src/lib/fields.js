// Felddefinitionen für den Beitrittsantrag der Kulturfreunde Rieden e.V.
// Reihenfolge entspricht den Excel-Spalten A–P (siehe docs/02-data-model.md).
// Diese Datei ist die einzige Wahrheit über Felder, Reihenfolge, Pflicht/Optional
// und Eingabetyp. UI, TSV-Erzeugung und Validierung leiten sich hieraus ab.

export const FIELDS = [
  { key: 'firstName',      label: 'Vorname',             column: 'A', required: true,  type: 'text' },
  { key: 'lastName',       label: 'Nachname',            column: 'B', required: true,  type: 'text' },
  { key: 'birthName',      label: 'Geburtsname',         column: 'C', required: false, type: 'text' },
  { key: 'street',         label: 'Straße, Hausnummer',  column: 'D', required: true,  type: 'text' },
  { key: 'postalCode',     label: 'PLZ',                 column: 'E', required: true,  type: 'text' },
  { key: 'city',           label: 'Ort',                 column: 'F', required: true,  type: 'text' },
  { key: 'phone',          label: 'Telefon',             column: 'G', required: true,  type: 'text' },
  { key: 'phoneMobile',    label: 'Mobil',               column: 'H', required: false, type: 'text' },
  { key: 'email',          label: 'E-Mail',              column: 'I', required: true,  type: 'email' },
  { key: 'birthDate',      label: 'Geburtsdatum',        column: 'J', required: true,  type: 'date' },
  { key: 'joinDate',       label: 'Eintrittsdatum',      column: 'K', required: true,  type: 'date' },
  { key: 'membershipType', label: 'Mitgliedschaft',      column: 'L', required: true,  type: 'choice', options: ['Aktiv', 'Passiv'] },
  { key: 'annualFee',      label: 'Jahresbeitrag (€)',   column: 'M', required: true,  type: 'money' },
  { key: 'accountHolder',  label: 'Kontoinhaber',        column: 'N', required: true,  type: 'text' },
  { key: 'iban',           label: 'IBAN',                column: 'O', required: true,  type: 'iban' },
  { key: 'photoConsent',   label: 'Foto-Einverständnis', column: 'P', required: true,  type: 'consent' },
];

// Leeren Datensatz erzeugen (alle Felder als leerer String)
export function emptyRecord() {
  return FIELDS.reduce((acc, f) => {
    acc[f.key] = '';
    return acc;
  }, {});
}

// Reihenfolge der Schlüssel – nützlich für TSV-Erzeugung
export const FIELD_KEYS = FIELDS.map((f) => f.key);
