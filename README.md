# KFR-Verwaltungsautomat

Web-App zur Verwaltung von Vereinsmitgliedern mit automatischer Datenerfassung aus fotografierten Beitrittsformularen (OCR).

## Ziel
Papierbasierte Mitgliedsanträge sollen abfotografiert werden, die Daten werden
automatisch erkannt und landen nach kurzer Kontrolle direkt in der zentralen
Datenbank. Mehrere Vorstandsmitglieder arbeiten gemeinsam an einem aktuellen
Datenbestand.

## Tech-Stack (geplant)
- **Frontend:** React (responsive, Handy + Desktop)
- **Datenbank/Backend:** Supabase (Auth + Postgres)
- **OCR:** Tesseract.js (läuft im Browser, keine Kosten pro Scan)
- **Tests/Spezifikation:** Gherkin Feature Files

## Repo-Struktur
```
docs/        → Kontext & Spezifikation (Single Source of Truth)
features/    → Gherkin Feature Files (Verhaltensspezifikation)
sample-data/ → Beispieldaten, Excel-Export, Formularvorlage
src/         → Anwendungscode (folgt später)
```

## Für die Zusammenarbeit mit Claude
Die Dateien unter `docs/` sind der maßgebliche Kontext. Beim Weiterentwickeln
immer zuerst `docs/01-context.md`, `docs/02-data-model.md` und
`docs/03-ocr-form-spec.md` lesen.

## Status
🟡 Planungsphase – Kontext wird festgelegt, noch kein Code.
