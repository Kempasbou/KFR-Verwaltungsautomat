# 05 – Geschäftslogik & Besonderheiten

> Diese Regeln leiten die OCR-Feldmapping und Validierung

## Mitgliedschaftstyp: Aktiv vs. Passiv
- Unabhängige Dimension (nicht mit Beitrittsstatus verwechseln)
- **Werte:** exakt "Aktiv" oder "Passiv" (auf dem Formular angekreuzt)
- OCR muss diese Checkbox-Option erkennen
- Im TSV-Output: String "Aktiv" oder "Passiv"

## Beitragsverwaltung
- **Mindestbeitrag:** 12€/Jahr (Erwachsene), 6€/Jahr (Minderjährige unter 16)
- **Devise:** Euro (€) – im Formular wird die Beitrags-Summe in € eingeben
- **Zahlungsweise:** Jährliche Lastschrift im März
- **IBAN + Kontoinhaber:** Müssen erfasst werden für den Zahlungseinzug
- **Dezimalformat (für Excel):** Komma als Trennzeichen (z.B. 24,00)

## Datenschutz
- **Fotoveröffentlichung:** Checkbox "Einverständnis Foto-/Filmaufnahmen"
  - Ja = Fotos dürfen auf Website/Social Media verwendet werden
  - Nein = keine Veröffentlichung
- Im TSV-Output: "Ja" oder "Nein" (nicht true/false)

## Datumsformate
- **Geburtsdatum:** `TT.MM.JJJJ` (z.B. 15.03.1985)
- **Eintrittsdatum:** `TT.MM.JJJJ` (stammt aus Unterschriftsdatum auf dem Formular)
- Excel-Format: `DD.MM.YYYY` (Deutsche Formatierung)

## PLZ & Ort
- **PLZ:** Nur für Deutschland relevant (90518 = Altdorf-Region)
- **Genau 5 Ziffern** (können führende Nullen haben → als Text speichern)
- **Ort:** Kann Umlaute enthalten (z.B. "Überlingen") → UTF-8 erforderlich

## Kontonummern
- **IBAN:** Europäische Standardisierung
- **Format:** `DE` + 22 Ziffern = 24 Zeichen insgesamt
- **Validierung:** Ländercode (DE), Länge prüfen, Prüfziffer optional
- **Sicherheit:** Sollte in lokaler Excel bleiben, nicht in Cloud-Systemen

## OCR-Qualitätsschwelle
- Werden < 50% der Pflichtfelder erkannt → Warnung "Foto nicht lesbar"
- Nutzer kann trotzdem manuell nachtragen
- Keine automatische Ablehnung

## Kein zentraler Datenfluss
- ⛔ Keine Daten werden auf Servern gespeichert
- ⛔ Keine Datenbank-Synchronisation
- ⛔ Keine Authentifizierung oder Audit-Logs
- ✅ Nur: Nutzer upload → App verarbeitet → Nutzer kopiert lokal
