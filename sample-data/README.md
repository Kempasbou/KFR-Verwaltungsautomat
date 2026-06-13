# sample-data

## Inhalt

- **Beitrittserklaerung-Kulturfreunde-Rieden-e.V.V2.0_2024.pdf**
  → Das echte Beitrittsformular als PDF
  → Vorlage für OCR-Entwicklung
  → Zeigt: Welche Felder wo sind

- **sample-members.json**
  → Beispieldaten aus OCR (im JSON-Format)
  → Verwendet für Unit-Tests
  
- *(Keine Excel-Import mehr)*
  → Excel wird vom Nutzer lokal gepflegt (außerhalb der App)
  → App erzeugt nur TSV-Zeilen zum Einfügen

## Für Entwicklung & Tests

Nutze `sample-members.json` um deine OCR-Validierungen zu testen:

```json
{
  "firstName": "Max",
  "lastName": "Mustermann",
  "birthName": null,
  "email": "max@example.de",
  "phone": "09187 123456",
  "phoneMobile": "0151 23456789",
  "street": "Obere Äcker 4",
  "postalCode": "90518",
  "city": "Altdorf",
  "birthDate": "15.03.1985",
  "joinDate": "01.03.2024",
  "membershipType": "Aktiv",
  "annualFee": 24.00,
  "accountHolder": "Max Mustermann",
  "iban": "DE89370400440532013000",
  "photoConsent": true
}
```

Verwende Tesseract.js darauf, um zu prüfen, ob deine OCR-Logik die Felder korrekt extrahiert.
