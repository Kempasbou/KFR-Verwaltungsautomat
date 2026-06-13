# language: de
Funktionalität: Daten exportieren
  Als Vorstandsmitglied
  möchte ich Mitgliederlisten als Excel exportieren,
  um sie weiterverarbeiten zu können.

  Szenario: Alle Mitglieder als Excel exportieren
    Angenommen ich bin im Bereich "Export"
    Wenn ich auf "Alle als Excel exportieren" klicke
    Dann wird eine Excel-Datei heruntergeladen
    Und sie enthält alle Mitgliederdaten

  Szenario: Gefilterte Auswahl exportieren
    Angenommen ich habe nach "Passiv" gefiltert
    Wenn ich auf "Export" klicke
    Dann enthält die Datei nur die passiven Mitglieder
