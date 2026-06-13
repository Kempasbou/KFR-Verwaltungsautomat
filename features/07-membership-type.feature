# language: de
Funktionalität: Mitgliedschaftstyp Aktiv/Passiv verwalten
  Als Vorstandsmitglied
  möchte ich zwischen aktiver und passiver Mitgliedschaft unterscheiden,
  um die Mitglieder korrekt zu kategorisieren.

  Szenario: Mitgliedschaftstyp beim Anlegen manuell wählen
    Angenommen ich lege ein neues Mitglied an
    Wenn ich den Mitgliedschaftstyp "Aktiv" oder "Passiv" auswähle
    Und ich auf "Speichern" klicke
    Dann wird der gewählte Typ in der Datenbank gespeichert

  Szenario: Mitgliedschaftstyp aus dem Formular per OCR übernehmen
    Angenommen ich erfasse ein Mitglied per Foto des Beitrittsformulars
    Und auf dem Formular ist "Aktiv" angekreuzt
    Wenn die OCR-Erkennung abgeschlossen ist
    Dann ist im Korrekturformular "Aktiv" vorausgewählt
    Und ich kann die Auswahl bei Bedarf manuell korrigieren

  Szenario: Mitgliedschaftstyp nachträglich ändern
    Angenommen ein Mitglied ist als "Aktiv" eingetragen
    Wenn ich sein Profil öffne und den Typ auf "Passiv" ändere
    Und ich auf "Speichern" klicke
    Dann wird die Änderung sofort gespeichert
    Und das Mitglied erscheint in der Kategorie "Passiv"
