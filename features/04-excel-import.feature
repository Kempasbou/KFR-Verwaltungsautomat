# language: de
Funktionalität: Bestehende Mitglieder aus Excel importieren
  Als Vorstandsmitglied
  möchte ich meine vorhandene Excel-Mitgliederliste importieren,
  um nicht alle Mitglieder manuell eingeben zu müssen.

  Szenario: Excel mit bekanntem Format hochladen
    Angenommen ich habe eine Excel-Datei mit den erwarteten Spalten
    Wenn ich "Excel importieren" wähle und die Datei hochlade
    Dann werden alle Zeilen geprüft
    Und gültige Mitglieder werden in der Datenbank angelegt
    Und ich sehe eine Erfolgsmeldung mit der Anzahl importierter Mitglieder

  Szenario: Fehlerhafte Zeilen abfangen
    Angenommen einige Zeilen enthalten ungültige Daten
    Wenn ich den Import starte
    Dann werden die gültigen Zeilen importiert
    Und für die fehlerhaften Zeilen wird eine Korrekturliste angeboten
