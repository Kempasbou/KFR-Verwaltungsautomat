# language: de
Funktionalität: Beitrittsformular per Foto mit OCR erfassen
  Als Vorstandsmitglied
  möchte ich ein Formular fotografieren und die Daten automatisch erkennen lassen,
  um Zeit bei der Dateneingabe zu sparen.

  Szenario: Foto aufnehmen und OCR starten
    Angenommen ich bin im Bereich "Neues Mitglied"
    Wenn ich auf "Formular fotografieren" klicke
    Und ich ein Foto eines Beitrittsformulars aufnehme
    Dann wird das Foto verarbeitet
    Und die erkannten Felder werden als Vorschlag angezeigt

  Szenario: Erkannte Daten korrigieren
    Angenommen die OCR-Erkennung ist abgeschlossen
    Wenn ein Feld falsch erkannt wurde
    Und ich das Feld korrigiere
    Dann wird die Korrektur übernommen
    Und ich kann das Mitglied speichern

  Szenario: Unlesbares Foto abfangen
    Angenommen das Foto ist zu dunkel oder unscharf
    Wenn weniger als die Hälfte der Pflichtfelder erkannt wird
    Dann erscheint der Hinweis "Foto nicht lesbar, bitte erneut fotografieren"
    Und das Formular bleibt zur Neueingabe geöffnet
