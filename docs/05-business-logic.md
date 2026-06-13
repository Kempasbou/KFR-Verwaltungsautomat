# 05 – Geschäftslogik & Besonderheiten

> Sammelstelle für Regeln und Eigenheiten, die sonst leicht vergessen werden.

## Mitgliedschaftstyp: Aktiv vs. Passiv
- Eigene Dimension, unabhängig vom Mitgliedsstatus.
- Manuell auswählbar beim Anlegen und nachträglich änderbar.
- Auf dem Beitrittsformular enthalten → wird per OCR vorgeschlagen.
- Werte: `ACTIVE` (Aktiv), `PASSIVE` (Passiv).

## Excel-Import
- Bestehende Mitglieder werden aus der vorhandenen Excel übernommen.
- Gültige Zeilen importieren, fehlerhafte Zeilen als Korrekturliste ausgeben.

## Mehrbenutzerbetrieb
- Änderungen sind sofort für alle sichtbar (zentrale DB).
- Optional: Änderungsprotokoll (wer/was/wann) – siehe Feature 09.

## Noch offene Geschäftsregeln [TBD]
- Beitragsverwaltung / Zahlungsstatus? (in dieser Version noch nicht im Umfang)
- Mahnwesen?
- Pflichtfelder final bestätigen.
