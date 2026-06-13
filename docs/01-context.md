# 01 – Projektkontext

> Reines OCR-Tool für Beitrittsformulare. Keine zentrale Datenbank.
> Fokus: Datensicherheit – nur die per OCR erkannten Daten werden verarbeitet.

## Kerninfo
- **Projektname:** KFR-Verwaltungsautomat
- **Vereinsname:** Kulturfreunde Rieden e.V.
- **Sitz:** Graswiesenstrasse 2, 90518 Altdorf
- **Website:** https://kulturfreunde-rieden.de/
- **Kontakt:** Tel +49 171 3572275, info@kulturfreunde-rieden.de
- **Vereinszweck:** Heimat- und Brauchtumspflege, Erhalt lokaler Traditionen

## Kernidee: Datensicherheit-First OCR

**Nicht:** Zentrale Datenbank mit Authentifizierung & Mehrbenutzersync.  
**Sondern:** Einfaches Web-Tool mit diesem Workflow:

1. Papier-Beitrittsformular fotografieren
2. Foto uploaden → Tesseract.js (OCR) extrahiert Felder
3. Nutzer prüft/korrigiert die erkannten Daten
4. **Klick "In Zwischenablage"** → Tab-getrennte Excel-Zeile (TSV)
5. Nutzer öffnet seine lokale Excel-Datei
6. Pastet neue Zeile ein (Ctrl+V) → speichert lokal

**Sicherheit:**
- ✅ Keine Datenbank in der Cloud
- ✅ Keine Daten bleiben auf dem Server
- ✅ Nur der Nutzer hat Zugriff
- ✅ Kein Login nötig
- ✅ Stateless: Foto wird verarbeitet und wieder vergessen

## Kritische Anforderungen
1. **OCR-Qualität:** Automatische Feldextraktion (auch wenn nicht 100% perfekt)
2. **Verifikation:** Nutzer sieht ALLE erkannten Felder und kann korrigieren
3. **Zwischenablage:** TSV-Format für direktes Excel-Einfügen
4. **Responsive:** Funktioniert auf Handy + Desktop
5. **Einfach:** Kein Login, keine Berechtigungen, ein klarer Workflow

## Tech-Stack
- **Frontend:** React (responsive, mobile-friendly)
- **OCR-Engine:** Tesseract.js (im Browser, keine Backend-API)
- **Clipboard:** Browser Clipboard API (kopiert TSV-Zeile)
- **Hosting:** Statische Web-App (z.B. Vercel, GitHub Pages)
- **Tests:** Unit-Tests für OCR-Logik, E2E für kritische Workflows

## Bestehende Daten
- Mitgliederliste wird **lokal in Excel** gepflegt (nicht in der App)
- Excel-Struktur ist vorgegeben (siehe `02-data-model.md`)
- Aktueller Beitrittsformular-PDF: `sample-data/Beitrittserklaerung-...pdf`

## Nächste Schritte
1. ✅ Datenmodell & OCR-Spec finalisiert
2. UI-Prototyp bauen (React-Komponenten)
3. Tests schreiben (Unit + E2E)
4. In Produktion gehen

## Weiterführende Dokumente
- `02-data-model.md` – Excel-Spaltenstruktur & TSV-Output-Format
- `03-ocr-form-spec.md` – Formular-Feldmapping
- `05-business-logic.md` – Geschäftsregeln (z.B. Beitrag, Aktiv/Passiv)
