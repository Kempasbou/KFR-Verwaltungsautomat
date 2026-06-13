import { describe, it, expect } from 'vitest';
import {
  isValidEmail,
  isValidPostalCode,
  isValidGermanDate,
  isValidIban,
  isValidMembershipType,
  isValidConsent,
  isValidFee,
  parseFee,
  validateField,
  validateRecord,
} from '../validation.js';
import { FIELDS, emptyRecord } from '../fields.js';

describe('isValidEmail', () => {
  it('akzeptiert gültige Adressen', () => {
    expect(isValidEmail('max@example.de')).toBe(true);
    expect(isValidEmail('a.b-c@sub.domain.com')).toBe(true);
  });
  it('lehnt ungültige Adressen ab', () => {
    expect(isValidEmail('max@example')).toBe(false);
    expect(isValidEmail('max example.de')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });
});

describe('isValidPostalCode', () => {
  it('akzeptiert genau 5 Ziffern', () => {
    expect(isValidPostalCode('90518')).toBe(true);
    expect(isValidPostalCode('01067')).toBe(true); // führende Null
  });
  it('lehnt falsche Längen oder Buchstaben ab', () => {
    expect(isValidPostalCode('9051')).toBe(false);
    expect(isValidPostalCode('905181')).toBe(false);
    expect(isValidPostalCode('9051A')).toBe(false);
  });
});

describe('isValidGermanDate', () => {
  it('akzeptiert gültige Daten im Format TT.MM.JJJJ', () => {
    expect(isValidGermanDate('15.03.1985')).toBe(true);
    expect(isValidGermanDate('29.02.2024')).toBe(true); // Schaltjahr
  });
  it('lehnt unmögliche oder falsch formatierte Daten ab', () => {
    expect(isValidGermanDate('29.02.2023')).toBe(false); // kein Schaltjahr
    expect(isValidGermanDate('32.01.2020')).toBe(false);
    expect(isValidGermanDate('15.13.2020')).toBe(false);
    expect(isValidGermanDate('1985-03-15')).toBe(false);
    expect(isValidGermanDate('5.3.1985')).toBe(false);
  });
});

describe('isValidIban', () => {
  it('akzeptiert deutsche IBAN mit/ohne Leerzeichen', () => {
    expect(isValidIban('DE89370400440532013000')).toBe(true);
    expect(isValidIban('DE89 3704 0044 0532 0130 00')).toBe(true);
  });
  it('lehnt falsche Länge oder Land ab', () => {
    expect(isValidIban('DE8937040044053201300')).toBe(false); // zu kurz
    expect(isValidIban('FR7630006000011234567890189')).toBe(false);
    expect(isValidIban('')).toBe(false);
  });
});

describe('Auswahl- und Zustimmungsfelder', () => {
  it('Mitgliedschaftstyp nur Aktiv/Passiv', () => {
    expect(isValidMembershipType('Aktiv')).toBe(true);
    expect(isValidMembershipType('Passiv')).toBe(true);
    expect(isValidMembershipType('aktiv')).toBe(false);
    expect(isValidMembershipType('')).toBe(false);
  });
  it('Einverständnis nur Ja/Nein', () => {
    expect(isValidConsent('Ja')).toBe(true);
    expect(isValidConsent('Nein')).toBe(true);
    expect(isValidConsent('vielleicht')).toBe(false);
  });
});

describe('parseFee / isValidFee', () => {
  it('parst deutsches und englisches Format', () => {
    expect(parseFee('24,00')).toBe(24);
    expect(parseFee('24.00')).toBe(24);
    expect(parseFee('12')).toBe(12);
    expect(parseFee('6,50')).toBe(6.5);
    expect(parseFee('  24 € ')).toBe(24);
  });
  it('liefert null bei Unsinn', () => {
    expect(parseFee('abc')).toBe(null);
    expect(parseFee('')).toBe(null);
  });
  it('Mindestbeitrag 6 €', () => {
    expect(isValidFee('6')).toBe(true);
    expect(isValidFee('12,00')).toBe(true);
    expect(isValidFee('5,99')).toBe(false);
    expect(isValidFee('0')).toBe(false);
  });
});

describe('validateField', () => {
  const fieldFor = (key) => FIELDS.find((f) => f.key === key);

  it('meldet fehlende Pflichtfelder', () => {
    expect(validateField(fieldFor('firstName'), '')).toMatch(/erforderlich/);
  });
  it('lässt leere optionale Felder durch', () => {
    expect(validateField(fieldFor('birthName'), '')).toBe(null);
    expect(validateField(fieldFor('phoneMobile'), '')).toBe(null);
  });
  it('prüft Feldtyp bei gefülltem Wert', () => {
    expect(validateField(fieldFor('email'), 'kaputt')).toMatch(/E-Mail/);
    expect(validateField(fieldFor('postalCode'), '123')).toMatch(/PLZ/);
    expect(validateField(fieldFor('email'), 'gut@example.de')).toBe(null);
  });
});

describe('validateRecord', () => {
  it('vollständiger gültiger Datensatz ist valid', () => {
    const rec = {
      ...emptyRecord(),
      firstName: 'Max', lastName: 'Mustermann', street: 'Obere Äcker 4',
      postalCode: '90518', city: 'Altdorf', phone: '09187 123456',
      email: 'max@example.de', birthDate: '15.03.1985', joinDate: '01.03.2024',
      membershipType: 'Aktiv', annualFee: '24,00', accountHolder: 'Max Mustermann',
      iban: 'DE89370400440532013000', photoConsent: 'Ja',
    };
    const { isValid, errors } = validateRecord(rec);
    expect(errors).toEqual({});
    expect(isValid).toBe(true);
  });

  it('sammelt mehrere Fehler', () => {
    const { isValid, errors } = validateRecord(emptyRecord());
    expect(isValid).toBe(false);
    expect(errors.firstName).toBeTruthy();
    expect(errors.iban).toBeTruthy();
    expect(errors.birthName).toBeUndefined(); // optional
  });
});
