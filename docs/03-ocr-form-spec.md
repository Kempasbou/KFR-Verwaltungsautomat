# 03 – OCR-Formularspezifikation

> Beschreibt, wie die Felder des Papier-Beitrittsformulars auf die
> Datenbankfelder abgebildet werden. Wird finalisiert, sobald ein Foto/Scan
> des echten Formulars in `sample-data/beitrittsformular.jpg` vorliegt.

## Feldmapping: Formular → Datenbank

| Formularfeld (PDF) | Datenbankfeld   | Format          | Notizen / Erkennungshinweise      |
|--------------------|-----------------|-----------------|-----------------------------------|
| Name               | lastName        | Text            | Familienname                      |
| Geburtsname        | birthName       | Text            | Optional                          |
| Vorname            | firstName       | Text            | Vorname                           |
| Straße, Hausnummer | street          | Text            | z.B. "Obere Äcker 4"              |
| PLZ                | postalCode      | 5 Ziffern       |                                   |
| ORT                | city            | Text            |                                   |
| Telefon            | phone           | Text            | Festnetz                          |
| Mobil              | phoneMobile     | Text            | Mobilfunk (optional)              |
| Email              | email           | E-Mail          |                                   |
| Geburtsdatum       | birthDate       | Datum (TT.MM.JJJJ) | Z.B. "15.03.1985"            |
| Unterschrift Datum | joinDate        | Datum           | Beitrittsdatum = Unterschriftsdatum |
| Aktives/Passives Mitglied | membershipType | Radio/Checkbox | → `ACTIVE` oder `PASSIVE` |
| Jahresbeitrag (€)  | annualFee       | Dezimal         | Eingabe: "______ €", Wert auslesen |
| Kontoinhaber       | accountHolder   | Text            |                                   |
| IBAN               | iban            | Text (IBAN)     | Format: DE + 22 Ziffern           |
| Datenschutz-Zustimmung | photoConsent | Boolean         | Checkbox: angekreuzt = true       |

## OCR-Hinweise für KFR
- **Formulartyp:** Festplatz-PDF mit konsistentem Layout (ideal für zonenbasiertes OCR)
- **Aktiv/Passiv-Erkennung:** Ist das eine Checkbox-Option oder zwei separate Kontrollkästchen?
  - Falls zwei Boxen nebeneinander: beide scannen, eine wird angekreuzt
  - Falls Radio-Button-Stil: deutlich erkennbar
- **Währungssymbol:** Jahresbeitrag steht nach einer Leerzeile `___________ €`
  → Zahl erkennen, "€" ignorieren
- **IBAN:** 22 Ziffern nach "IBAN:" auslesen → auf Format prüfen
- **Datum-Format:** Unterschriftsdatum ist `TT.MM.JJJJ` (z.B. "13.06.2024")
- **Qual.-Schwelle:** Wenn < 50% der Pflichtfelder erkannt, Neuaufnahme empfehlen

## Offene Fragen
- Liegt das Formular als fester Vordruck vor (gleiches Layout immer)? Dann ist
  ein zonenbasiertes OCR (feste Positionen) viel zuverlässiger als Volltext.
- Foto/Scan des echten Formulars bitte unter
  `sample-data/beitrittsformular.jpg` ablegen.
