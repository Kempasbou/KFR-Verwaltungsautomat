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
- **Frontend:** React + Vite (responsive)
- **OCR:** Tesseract.js (Browser-basiert, keine API)
- **Clipboard:** Browser Clipboard API
- **Tests:** Vitest (41 Tests, alle grün)
- **Hosting:** Statische Web-App (Vercel, GitHub Pages)

## Repo-Struktur
```
docs/           → Spezifikation (Context, Datenmodell, OCR-Spec, Features)
features/       → Gherkin Feature Files (3 Features)
sample-data/    → Beitrittsformular-PDF, Beispieldaten
src/
  ├── lib/      → Reine Geschäftslogik (testbar)
  │   ├── fields.js
  │   ├── validation.js
  │   ├── ocrParse.js
  │   ├── tsv.js
  │   └── __tests__/
  ├── components/
  │   ├── App.jsx        → 3-Schritt-Workflow
  │   ├── FieldRow.jsx   → Registerzeile pro Feld
  │   ├── useOcr.js      → Tesseract-Hook
  │   └── __tests__/
  ├── styles.css         → Design-System
  └── main.jsx
```

## Lokal entwickeln

```bash
npm install
npm run dev       # Entwicklungsserver auf http://localhost:5173
npm test          # Alle 41 Tests
npm run build     # Production-Build (dist/)
```

## 🚀 Auf Vercel deployen (öffentlich & kostenlos)

### Schritt 1: Vercel-Konto (mit GitHub)
1. Gehe zu **https://vercel.com**
2. Klick **Sign Up**
3. Wähle **GitHub** und bestätige

### Schritt 2: Projekt importieren
1. Nach dem Login: Klick **Add New** → **Project**
2. Suche `KFR-Verwaltungsautomat` in deinen Repos
3. Klick **Import**

### Schritt 3: Deployment
1. **Framework Preset:** Vercel erkennt Vite automatisch
2. Alle anderen Einstellungen können bleiben wie sie sind
3. Klick **Deploy**
4. Warte ~2 Minuten
5. Nach erfolgreichen Build: Vercel gibt dir eine Live-URL 🎉

**Fertig!** Die App läuft jetzt öffentlich im Internet. Du kannst die URL mit deinem Verein teilen.

### Automatische Updates
Wenn du etwas am Code änderst und zu GitHub pushst, deployt Vercel automatisch die neue Version.

## Für die Zusammenarbeit mit Claude
Beim Weiterentwickeln: Immer zuerst `docs/01-context.md`, `docs/02-data-model.md` und `docs/03-ocr-form-spec.md` lesen.

## Status
✅ App komplett gebaut, 41 Tests grün → ready for Vercel deployment.
