# language: de
Funktionalität: Beitrittsformular per Foto scannen & OCR
  Als Vereinsmitglied (Dateneingeber)
  möchte ich ein Foto des Beitrittsformulars hochladen
  und die Felder automatisch per OCR extrahiert bekommen,
  um sie dann schnell in die Excel-Mitgliederliste zu übernehmen.

  Szenario: Foto hochladen und OCR durchführen
    Angenommen ich bin auf der App
    Wenn ich auf "Formular fotografieren / hochladen" klicke
    Und ein Foto des Beitrittsformulars wähle
    Dann wird das Foto verarbeitet
    Und die erkannten Felder werden mir angezeigt
    Und jedes Feld kann ich überprüfen/korrigieren

  Szenario: Alle Pflichtfelder erkennen
    Angenommen das Foto ist lesbar und gut beleuchtet
    Wenn OCR durchläuft
    Dann werden mindestens 50% der Pflichtfelder erkannt
    Und die Erkennungsrate ist > 80%

  Szenario: Unlesbares Foto abfangen
    Angenommen das Foto ist zu dunkel, unscharf oder stark gekippt
    Wenn OCR durchläuft
    Dann werden < 50% der Pflichtfelder erkannt
    Und ich sehe die Warnung: "Foto nicht lesbar, bitte erneut fotografieren"
    Und ich kann trotzdem manuell die Felder nachtragen

  Szenario: Feldtyp-Prüfung
    Angenommen OCR hat Felder erkannt
    Wenn die Daten prüft
    Dann muss Email ein "@" enthalten
    Und PLZ muss genau 5 Ziffern sein
    Und Datum muss Format TT.MM.JJJJ haben
    Und bei Fehler: Feld wird hervorgehoben
