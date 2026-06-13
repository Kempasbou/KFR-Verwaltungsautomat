import { describe, it, expect } from 'vitest';
import { buildTsvRow, buildTsvHeader, formatValueForTsv } from '../tsv.js';
import { FIELDS, emptyRecord } from '../fields.js';

const fieldFor = (key) => FIELDS.find((f) => f.key === key);

const fullRecord = {
  firstName: 'Max', lastName: 'Mustermann', birthName: '',
  street: 'Obere Äcker 4', postalCode: '90518', city: 'Altdorf',
  phone: '09187 123456', phoneMobile: '0151 23456789', email: 'max@example.de',
  birthDate: '15.03.1985', joinDate: '01.03.2024', membershipType: 'Aktiv',
  annualFee: '24', accountHolder: 'Max Mustermann',
  iban: 'DE89 3704 0044 0532 0130 00', photoConsent: 'Ja',
};

describe('formatValueForTsv', () => {
  it('formatiert Geld deutsch mit zwei Nachkommastellen', () => {
    expect(formatValueForTsv(fieldFor('annualFee'), '24')).toBe('24,00');
    expect(formatValueForTsv(fieldFor('annualFee'), '12,5')).toBe('12,50');
    expect(formatValueForTsv(fieldFor('annualFee'), '6.00')).toBe('6,00');
  });
  it('entfernt Leerzeichen aus IBAN und macht Großbuchstaben', () => {
    expect(formatValueForTsv(fieldFor('iban'), 'de89 3704 0044 0532 0130 00'))
      .toBe('DE89370400440532013000');
  });
  it('leere Werte bleiben leer', () => {
    expect(formatValueForTsv(fieldFor('birthName'), '')).toBe('');
  });
});

describe('buildTsvRow', () => {
  it('erzeugt 16 Tab-getrennte Spalten in fester Reihenfolge', () => {
    const row = buildTsvRow(fullRecord);
    const cells = row.split('\t');
    expect(cells).toHaveLength(FIELDS.length);
    expect(cells[0]).toBe('Max');         // Vorname
    expect(cells[1]).toBe('Mustermann');  // Nachname
    expect(cells[2]).toBe('');            // Geburtsname (leer)
    expect(cells[11]).toBe('Aktiv');      // Mitgliedschaft
    expect(cells[12]).toBe('24,00');      // Jahresbeitrag deutsch
    expect(cells[14]).toBe('DE89370400440532013000'); // IBAN bereinigt
    expect(cells[15]).toBe('Ja');         // Foto-Einverständnis
  });

  it('bewahrt leere Felder als leere Spalten (Tab bleibt)', () => {
    const row = buildTsvRow(emptyRecord());
    const cells = row.split('\t');
    expect(cells).toHaveLength(FIELDS.length);
    expect(cells.every((c) => c === '')).toBe(true);
  });

  it('entfernt eingebettete Tabs/Zeilenumbrüche aus Einzelwerten', () => {
    const row = buildTsvRow({ ...emptyRecord(), firstName: 'Max\tMoritz\n' });
    const cells = row.split('\t');
    // Vorname darf keinen zusätzlichen Tab einschleusen
    expect(cells).toHaveLength(FIELDS.length);
    expect(cells[0]).toBe('Max Moritz');
  });
});

describe('buildTsvHeader', () => {
  it('liefert die Spaltenüberschriften in gleicher Reihenfolge', () => {
    const header = buildTsvHeader().split('\t');
    expect(header[0]).toBe('Vorname');
    expect(header).toHaveLength(FIELDS.length);
  });
});
