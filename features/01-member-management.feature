# language: de
Funktionalität: Mitgliedsverwaltung
  Als Vorstandsmitglied
  möchte ich Mitglieder hinzufügen, bearbeiten und löschen können,
  um die Vereinsdatenbank aktuell zu halten.

  Szenario: Neues Mitglied manuell hinzufügen
    Angenommen ich bin als Vorstandsmitglied angemeldet
    Wenn ich auf "Neues Mitglied" klicke
    Und ich Vorname, Nachname, Beitrittsdatum und Mitgliedschaftstyp ausfülle
    Und ich auf "Speichern" klicke
    Dann erscheint das Mitglied in der Mitgliedsliste
    Und die Datenbank ist aktualisiert

  Szenario: Mitglied bearbeiten
    Angenommen es existiert ein Mitglied "Max Mustermann"
    Wenn ich sein Profil öffne und die Telefonnummer ändere
    Und ich auf "Speichern" klicke
    Dann wird die Änderung sofort gespeichert
    Und alle Vorstandsmitglieder sehen die neue Nummer

  Szenario: Mitglied löschen mit Bestätigung
    Angenommen ich habe ein Mitglied ausgewählt
    Wenn ich auf "Löschen" klicke
    Dann sehe ich einen Bestätigungsdialog
    Und erst nach Bestätigung wird das Mitglied gelöscht
