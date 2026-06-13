// Erzeugt die Tab-getrennte Zeile für die Zwischenablage (Format siehe
// docs/02-data-model.md). Reine Funktion, vollständig unit-testbar.
import { FIELDS } from './fields.js';
import { parseFee } from './validation.js';

// Einen einzelnen Feldwert für die Excel-Ausgabe formatieren.
export function formatValueForTsv(field, rawValue) {
  const value = rawValue == null ? '' : String(rawValue).trim();
  if (value === '') return '';

  switch (field.type) {
    case 'money': {
      const num = parseFee(value);
      if (num === null) return value; // ungültige Werte unverändert lassen
      // Deutsches Format mit Komma und zwei Nachkommastellen: 24,00
      return num.toFixed(2).replace('.', ',');
    }
    case 'iban':
      // IBAN ohne Leerzeichen, Großbuchstaben
      return value.replace(/\s+/g, '').toUpperCase();
    default:
      return value;
  }
}

// Baut die komplette TSV-Zeile in der Spaltenreihenfolge A–P.
// Leere Felder bleiben leer, der Tabulator wird trotzdem gesetzt, damit die
// Spalten-Ausrichtung beim Einfügen in Excel stimmt.
export function buildTsvRow(record) {
  return FIELDS.map((field) => {
    const formatted = formatValueForTsv(field, record[field.key]);
    // Tabs und Zeilenumbrüche aus Einzelwerten entfernen, damit die Zeile heil bleibt
    return formatted.replace(/[\t\r\n]+/g, ' ');
  }).join('\t');
}

// Optionale Kopfzeile (gleiche Reihenfolge) – praktisch für eine frische Excel.
export function buildTsvHeader() {
  return FIELDS.map((field) => field.label).join('\t');
}
