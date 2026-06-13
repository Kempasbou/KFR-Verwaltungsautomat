import { describe, it, expect } from 'vitest';
import { parseOcrText, ocrFillRatio } from '../ocrParse.js';
import { FIELD_KEYS } from '../fields.js';

// Realistischer (leicht fehlerbehafteter) OCR-Text eines ausgefüllten Formulars
const sampleOcr = `
Kulturfreunde Rieden e.V.
Beitrittserklärung
Ich beabsichtige einen Beitritt als:
Aktives Mitglied
Ich bitte, meinen Jahresbeitrag in Höhe von 24 €
Kontoinhaber: Max Mustermann
IBAN: DE89 3704 0044 0532 0130 00
Name: Mustermann   Geburtsname: Schmidt
Vorname: Max
Straße, Hausnummer: Obere Äcker 4
PLZ, ORT: 90518 Altdorf
Telefon: 09187 123456   Mobil: 0151 23456789
Email: max@example.de
Geburtsdatum: 15.03.1985
Unterrieden , den 01.03.2024
`;

describe('parseOcrText', () => {
  const rec = parseOcrText(sampleOcr);

  it('erkennt Namensfelder korrekt getrennt', () => {
    expect(rec.firstName).toBe('Max');
    expect(rec.lastName).toBe('Mustermann');
    expect(rec.birthName).toBe('Schmidt');
  });

  it('erkennt Adresse, PLZ und Ort', () => {
    expect(rec.street).toContain('Obere Äcker 4');
    expect(rec.postalCode).toBe('90518');
    expect(rec.city).toBe('Altdorf');
  });

  it('trennt Telefon und Mobil', () => {
    expect(rec.phone).toContain('09187');
    expect(rec.phoneMobile).toContain('0151');
  });

  it('erkennt E-Mail und IBAN', () => {
    expect(rec.email).toBe('max@example.de');
    expect(rec.iban).toBe('DE89370400440532013000');
  });

  it('erkennt Mitgliedschaftstyp aus angekreuzter Option', () => {
    expect(rec.membershipType).toBe('Aktiv');
  });

  it('erkennt Jahresbeitrag', () => {
    expect(rec.annualFee).toBe('24');
  });

  it('erkennt Kontoinhaber', () => {
    expect(rec.accountHolder).toBe('Max Mustermann');
  });

  it('liefert bei leerem Text einen leeren Datensatz', () => {
    const empty = parseOcrText('');
    expect(empty.firstName).toBe('');
    expect(empty.iban).toBe('');
  });

  it('lässt Mitgliedschaft leer, wenn beide Optionen vorkommen', () => {
    const r = parseOcrText('Aktives Mitglied Passives Mitglied');
    expect(r.membershipType).toBe('');
  });
});

describe('ocrFillRatio', () => {
  it('berechnet den Anteil gefüllter Felder', () => {
    const rec = parseOcrText(sampleOcr);
    const ratio = ocrFillRatio(rec, FIELD_KEYS);
    expect(ratio).toBeGreaterThan(0.5);
    expect(ratio).toBeLessThanOrEqual(1);
  });
  it('ist 0 bei leerem Datensatz', () => {
    expect(ocrFillRatio(parseOcrText(''), FIELD_KEYS)).toBe(0);
  });
});
