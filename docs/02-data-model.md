# 02 – Datenmodell

> Die Felder sind ein erster Entwurf und werden anhand der echten Excel-Datei
> und des Beitrittsformulars finalisiert. `[TBD]` = noch zu klären.

## Mitglied (`member`)

| Feldname        | Typ     | Pflicht | Validierung               | Formularquelle                    |
|-----------------|---------|---------|---------------------------|-----------------------------------|
| id              | UUID    | ✓       | auto-generiert            | Primärschlüssel                   |
| firstName       | String  | ✓       | max 100 Zeichen           | Feld "Vorname"                    |
| lastName        | String  | ✓       | max 100 Zeichen           | Feld "Name"                       |
| birthName       | String  | ✗       | max 100 Zeichen           | Feld "Geburtsname" (optional)     |
| email           | String  | ✓       | gültiges E-Mail-Format    | Feld "Email"                      |
| phone           | String  | ✓       |                           | Feld "Telefon"                    |
| phoneMobile     | String  | ✗       |                           | Feld "Mobil"                      |
| street          | String  | ✓       |                           | Feld "Straße, Hausnummer"         |
| postalCode      | String  | ✓       | 5 Ziffern (DE)            | Feld "PLZ"                        |
| city            | String  | ✓       |                           | Feld "ORT"                        |
| birthDate       | Date    | ✓       |                           | Feld "Geburtsdatum"               |
| joinDate        | Date    | ✓       |                           | Unterschrift: Datum               |
| membershipType  | Enum    | ✓       | `ACTIVE` \| `PASSIVE`     | Feld "Aktives/Passives Mitglied"  |
| annualFee       | Decimal | ✓       | min. 12€ (6€ Minderjährige)| Feld "Jahresbeitrag"              |
| accountHolder   | String  | ✓       |                           | Feld "Kontoinhaber"               |
| iban            | String  | ✓       | IBAN-Format               | Feld "IBAN"                       |
| photoConsent    | Boolean | ✓       | true/false                | Datenschutz-Zustimmung (Fotos)    |
| status          | Enum    | ✓       | `MEMBER` \| `RESIGNED`    | Standard: `MEMBER`                |
| notes           | Text    | ✗       |                           | Freitext für Notizen              |
| createdAt       | Date    | ✓       | auto                      |                                   |
| createdBy       | String  | ✓       | auto (eingeloggter User)  | für Änderungsprotokoll            |
| updatedAt       | Date    | ✓       | auto                      |                                   |

> ⚠️ **Wichtig:** `membershipType` (Aktiv/Passiv) ist eine eigene Dimension und
> NICHT mit `status` (Mitglied/ausgetreten) zu verwechseln.

## Beispiel (JSON)
```json
{
  "id": "uuid-v4",
  "firstName": "Max",
  "lastName": "Mustermann",
  "email": "max@example.de",
  "phone": "0151 23456789",
  "joinDate": "2024-03-01",
  "membershipType": "ACTIVE",
  "status": "MEMBER",
  "createdBy": "vorstand@verein.de"
}
```

## Offene Fragen
- Ist das Formular-PDF digital oder wird es unterschrieben und fotografiert?
  (Beeinflußt OCR-Strategie: PDF-Parsing vs. Foto-OCR)
