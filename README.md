# KFR-Verwaltungsautomat

**Reines OCR-Tool für Beitrittsformulare** – keine zentrale Datenbank.

Fotografiere den Mitgliedsantrag, lass OCR die Daten extrahieren, korrigiere wenn nötig, und kopiere die Zeile in deine Excel-Mitgliederliste.

## Ziel
Papierformulare sollen schnell digitalisiert werden – aber sicher und lokal, ohne dass Daten auf Servern landen.

**Workflow:**
1. Foto aufnehmen → hochladen
2. OCR erkennt Felder automatisch
3. Verifizierer prüft/korrigiert die Daten
4. **"In Zwischenablage"** → Tab-getrennte Zeile kopiert
5. Excel öffnen → Ctrl+V einfügen → speichern

## Warum kein Cloud-System?
- ✅ **Datensicherheit:** Keine Zentralisierung von Mitgliederdaten
- ✅ **Datenschutz (DSGVO):** Keine Serverung sensibler Infos (Adressen, IBAN, etc.)
- ✅ **Einfach:** Kein Login, keine Berechtigungsverwaltung
- ✅ **Offline:** App funktioniert auch ohne Internet nach dem ersten Load

## Tech-Stack
- **Frontend:** React (responsive)
- **OCR:** Tesseract.js (Browser-basiert, keine API)
- **Clipboard:** Browser Clipboard API
- **Hosting:** Statische Web-App (Vercel, GitHub Pages)

## Repo-Struktur
```
docs/           → Spezifikation (Context, Datenmodell, OCR-Spec)
features/       → Gherkin Feature Files (3 Features)
sample-data/    → Beitrittsformular-PDF, Beispieldaten
src/            → React-Code (später)
```

## Für die Zusammenarbeit
Beim Weiterentwickeln: Immer zuerst `docs/01-context.md`, `docs/02-data-model.md` und `docs/03-ocr-form-spec.md` lesen.

## Status
🟡 Planung & Spezifikation abgeschlossen → Prototyp-Entwicklung folgt.
