# 01 – Projektkontext

> Dies ist das wichtigste Dokument. Es fasst zusammen, was für jede
> Weiterentwicklung bekannt sein muss. Offene Punkte sind mit `[TBD]` markiert.

## Kerninfo
- **Projektname:** KFR-Verwaltungsautomat
- **Vereinstyp:** [TBD – vermutlich im Feuerwehr-/KFR-Umfeld]
- **Anzahl Mitglieder:** [TBD]
- **Primäres Problem:** Papier-Beitrittsanträge werden ineffizient manuell in
  Excel übertragen.
- **Hauptfeature:** Foto eines Beitrittsformulars → OCR → automatische
  Datenextraktion → nach Kontrolle direkt in die Datenbank.

## Kritische Anforderungen
1. **Mehrbenutzer:** Mehrere Vorstandsmitglieder arbeiten gemeinsam an einem
   aktuellen Datenbestand.
2. **OCR-Erfassung:** Automatische Erkennung der Formulardaten (auch wenn nicht
   100 % perfekt), mit anschließender händischer Korrekturmöglichkeit.
3. **Mitgliedschaftstyp:** Unterscheidung **Aktiv** vs. **Passiv** – manuell
   wählbar und auf dem Beitrittsformular enthalten (wird per OCR erkannt).
4. **Plattform:** Web-App im Browser, auch am Handy nutzbar (responsive).
5. **Zugriffsschutz:** Nur berechtigte Vorstandsmitglieder dürfen die App nutzen.

## Bestehende Daten
- Mitglieder liegen aktuell in einer **Excel-Datei** vor.
- → Soll importierbar sein (siehe `features/04-excel-import.feature`).
- Excel-Export ablegen unter: `sample-data/original-members.xlsx` [TBD]

## Nächste Schritte
1. Offene `[TBD]`-Punkte klären (Vereinstyp, Mitgliederzahl, Datenfelder).
2. Excel-Datei + Foto des Beitrittsformulars in `sample-data/` ablegen.
3. Datenmodell (`02-data-model.md`) und OCR-Mapping (`03-ocr-form-spec.md`)
   anhand der echten Daten finalisieren.
4. Dann erst: Prototyp bauen.

## Weiterführende Dokumente
- `02-data-model.md` – Datenfelder & Validierung
- `03-ocr-form-spec.md` – Formular → Datenbank-Mapping
- `04-user-roles.md` – Rollen & Berechtigungen
- `05-business-logic.md` – Geschäftsregeln & Besonderheiten
