# 02 – Datenmodell: Excel-Struktur & TSV-Output

> Da die App eine reine OCR-Hilfe ist, definiert dieses Dokument:
> 1. Die Excel-Spalten (= Ziel-Format)
> 2. Das TSV-Output-Format (was in die Zwischenablage kopiert wird)

## Excel-Spaltenstruktur (lokale Mitgliederliste)

Die Mitgliederliste wird vom Nutzer lokal in Excel gepflegt. Diese Spalten sind verbindlich:

| Spaltennummer | Spaltenname     | Datentyp | Beispiel                          | Notizen                        |
|---|---|---|---|---|
| A | Vorname         | Text     | Max                               | aus OCR: firstName          |
| B | Nachname        | Text     | Mustermann                        | aus OCR: lastName           |
| C | Geburtsname     | Text     | (leer) / Schmidt                  | aus OCR: birthName (optional)|
| D | Straße          | Text     | Obere Äcker 4                     | aus OCR: street             |
| E | PLZ             | Text     | 90518                             | aus OCR: postalCode         |
| F | Ort             | Text     | Altdorf                           | aus OCR: city               |
| G | Telefon         | Text     | 09187 123456                      | aus OCR: phone              |
| H | Mobil           | Text     | 0151 23456789                     | aus OCR: phoneMobile        |
| I | Email           | Text     | max@example.de                    | aus OCR: email              |
| J | Geburtsdatum    | Datum    | 15.03.1985                        | aus OCR: birthDate          |
| K | Eintrittsdatum  | Datum    | 01.03.2024                        | aus OCR: joinDate           |
| L | Mitgliedschaft   | Text     | Aktiv / Passiv                    | aus OCR: membershipType     |
| M | Jahresbeitrag   | Dezimal  | 24,00                             | aus OCR: annualFee (€)      |
| N | Kontoinhaber    | Text     | Max Mustermann                    | aus OCR: accountHolder      |
| O | IBAN            | Text     | DE89370400440532013000            | aus OCR: iban               |
| P | Foto-Einverständnis | Text | Ja / Nein                         | aus OCR: photoConsent       |

## TSV-Output-Format (In Zwischenablage kopieren)

Wenn der Nutzer "In Zwischenablage" klickt, wird eine **Tab-getrennte Zeile** kopiert:

```
Max	Mustermann		Obere Äcker 4	90518	Altdorf	09187 123456	0151 23456789	max@example.de	15.03.1985	01.03.2024	Aktiv	24,00	Max Mustermann	DE89370400440532013000	Ja
```

**Format-Details:**
- **Trennzeichen:** Tabulator (`\t`)
- **Dezimaltrennzeichen:** Komma `,` (für Deutsche Excel)
- **Datumsformat:** `TT.MM.JJJJ` (z.B. `15.03.1985`)
- **Leere Felder:** Bleiben leer, aber Tab wird gesetzt (damit Spalten-Ausrichtung stimmt)
- **Ja/Nein:** Für Foto-Einverständnis statt true/false

## Datentypen & Validierung (für OCR)

| Feldname       | Typ     | Format-Regel                          | Beispiel              |
|---|---|---|---|
| firstName      | Text    | max 100 Zeichen                       | Max                   |
| lastName       | Text    | max 100 Zeichen                       | Mustermann            |
| birthName      | Text    | max 100 Zeichen, optional             | Schmidt               |
| street         | Text    | Straße + Hausnummer                   | Obere Äcker 4         |
| postalCode     | Text    | genau 5 Ziffern (DE)                  | 90518                 |
| city           | Text    | max 100 Zeichen                       | Altdorf               |
| phone          | Text    | Telefonnummer (Formattierung flexibel)| 09187 123456          |
| phoneMobile    | Text    | Telefonnummer (Formattierung flexibel)| 0151 23456789         |
| email          | Email   | gültiges E-Mail-Format                | max@example.de        |
| birthDate      | Datum   | `TT.MM.JJJJ`                         | 15.03.1985            |
| joinDate       | Datum   | `TT.MM.JJJJ` (Unterschriftsdatum)     | 01.03.2024            |
| membershipType | Text    | genau "Aktiv" oder "Passiv"           | Aktiv                 |
| annualFee      | Dezimal | min. 12,00 (6,00 für Minderjährige)   | 24,00                 |
| accountHolder  | Text    | max 200 Zeichen                       | Max Mustermann        |
| iban           | Text    | IBAN-Format (DE + 22 Ziffern)         | DE89370400440532013000|
| photoConsent   | Text    | "Ja" oder "Nein"                      | Ja                    |

## Beispiel: Kopierte Zeile in Excel einfügen

**Vorher (Excel):**
```
Vorname | Nachname | Geburtsname | Straße | ...
Alice  | Maier    |             | ...    | ...
```

**Nutzer:** Klick "In Zwischenablage" in der App  
**Zwischenablage enthält:**
```
Max	Mustermann		Obere Äcker 4	90518	Altdorf	...
```

**Nachher (Excel):**
```
Vorname | Nachname | Geburtsname | Straße | ...
Alice  | Maier    |             | ...    | ...
Max    | Mustermann |           | Obere Äcker 4 | ...
```

## Offene Fragen
- Sollen Zahlen mit Komma oder Punkt als Trennzeichen sein? (aktuell: Komma für DE)
- Gibt es weitere Excel-Spalten, die der Nutzer noch benötigt? (z.B. Status, Notizen)
