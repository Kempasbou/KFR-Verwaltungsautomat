# 02 – Datenmodell

> Die Felder sind ein erster Entwurf und werden anhand der echten Excel-Datei
> und des Beitrittsformulars finalisiert. `[TBD]` = noch zu klären.

## Mitglied (`member`)

| Feldname        | Typ     | Pflicht | Validierung               | Quelle / Notizen                  |
|-----------------|---------|---------|---------------------------|-----------------------------------|
| id              | UUID    | ✓       | auto-generiert            | Primärschlüssel                   |
| firstName       | String  | ✓       | max 100 Zeichen           |                                   |
| lastName        | String  | ✓       | max 100 Zeichen           |                                   |
| email           | String  | ✗ [TBD] | gültiges E-Mail-Format    | ggf. nicht jeder hat eine         |
| phone           | String  | ✗       | Format [TBD]              |                                   |
| street          | String  | ✗       |                           | Adresse [TBD ob benötigt]         |
| postalCode      | String  | ✗       | 5 Ziffern (DE)            |                                   |
| city            | String  | ✗       |                           |                                   |
| birthDate       | Date    | ✗ [TBD] |                           |                                   |
| joinDate        | Date    | ✓       |                           | Beitrittsdatum                    |
| membershipType  | Enum    | ✓       | `ACTIVE` \| `PASSIVE`     | manuell + per OCR; vom Formular   |
| status          | Enum    | ✓       | `MEMBER` \| `RESIGNED`    | Standard: `MEMBER` [TBD]          |
| notes           | Text    | ✗       |                           | Freitext                          |
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
- Welche Spalten enthält die bestehende Excel genau? → `original-members.xlsx`
- Werden Adresse / Geburtsdatum / IBAN (für Beitragseinzug?) benötigt? [TBD]
