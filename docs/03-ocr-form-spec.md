# 03 – OCR-Formularspezifikation

> Beschreibt, wie die Felder des Papier-Beitrittsformulars auf die
> Datenbankfelder abgebildet werden. Wird finalisiert, sobald ein Foto/Scan
> des echten Formulars in `sample-data/beitrittsformular.jpg` vorliegt.

## Feldmapping: Formular → Datenbank

| Formularfeld (Beschriftung) | Datenbankfeld   | Format          | Notizen                       |
|-----------------------------|-----------------|-----------------|-------------------------------|
| Vorname                     | firstName       | Text            |                               |
| Nachname / Name             | lastName        | Text            |                               |
| Straße / Anschrift          | street          | Text            | [TBD]                         |
| PLZ                         | postalCode      | 5 Ziffern       |                               |
| Ort                         | city            | Text            |                               |
| Telefon                     | phone           | Text            |                               |
| E-Mail                      | email           | E-Mail          |                               |
| Geburtsdatum                | birthDate       | Datum           | [TBD]                         |
| Eintrittsdatum              | joinDate        | Datum           |                               |
| Aktiv / Passiv              | membershipType  | Checkbox/Radio  | → `ACTIVE` / `PASSIVE`        |

## OCR-Hinweise
- **Engine:** Tesseract.js, Sprache `deu`.
- **Ablauf:** Foto → OCR → Felder als vorausgefüllter Formularvorschlag →
  Nutzer kontrolliert/korrigiert → Speichern.
- **Aktiv/Passiv-Erkennung:** Ankreuzfelder sind per OCR fehleranfällig.
  Empfehlung: erkannten Wert vorschlagen, aber im Korrekturformular als
  deutlich sichtbare Auswahl (Toggle) anzeigen.
- **Qualitätsschwelle:** Werden < 50 % der Pflichtfelder erkannt → Hinweis
  „Foto nicht lesbar, bitte erneut fotografieren".

## Offene Fragen
- Liegt das Formular als fester Vordruck vor (gleiches Layout immer)? Dann ist
  ein zonenbasiertes OCR (feste Positionen) viel zuverlässiger als Volltext.
- Foto/Scan des echten Formulars bitte unter
  `sample-data/beitrittsformular.jpg` ablegen.
