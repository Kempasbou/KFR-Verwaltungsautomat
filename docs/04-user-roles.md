# 04 – Benutzerrollen & Berechtigungen

## Rollen (Entwurf)

| Rolle        | Beschreibung                              | Rechte                                   |
|--------------|-------------------------------------------|------------------------------------------|
| Vorstand     | Mehrere Vorstandsmitglieder               | Mitglieder anlegen/bearbeiten/löschen, OCR, Export, Import |
| Admin        | Technischer Verantwortlicher [TBD]        | Wie Vorstand + Benutzerverwaltung        |

> Aktuell ist nur „mehrere Vorstandsmitglieder" als Nutzergruppe bestätigt.
> Eine getrennte Admin-Rolle ist optional. [TBD]

## Authentifizierung
- Login per E-Mail + Passwort (Supabase Auth).
- Kein öffentlicher Zugang – nicht eingeloggte Nutzer werden zum Login geleitet.
- Neue Vorstandsmitglieder werden per Einladung hinzugefügt. [TBD: Self-Signup?]

## Datenschutz (DSGVO)
- Es werden personenbezogene Daten verarbeitet → Hosting-Standort und
  Auftragsverarbeitung beachten (Supabase EU-Region wählen). [TBD]
- Löschkonzept für ausgetretene Mitglieder festlegen. [TBD]
