# language: de
Funktionalität: Daten als TSV in Zwischenablage kopieren
  Als Dateneingeber
  möchte ich die verifizierten Daten als eine komplette Excel-Zeile in die Zwischenablage kopieren,
  damit ich sie direkt in meine Excel-Mitgliederliste einfügen kann.

  Szenario: TSV-Zeile kopieren
    Angenommen ich habe alle Daten überprüft und korrigiert
    Wenn ich auf "In Zwischenablage kopieren" klicke
    Dann wird eine Tab-getrennte Zeile kopiert
    Und ein visuelles Feedback zeigt: "✓ In Zwischenablage kopiert!"
    Und nach 2 Sekunden verschwindet die Meldung

  Szenario: Korrekte TSV-Formatierung
    Angenommen die Daten sind:
      | Feld | Wert |
      | Vorname | Max |
      | Nachname | Mustermann |
      | Email | max@example.de |
      | Jahresbeitrag | 24,00 |
    Wenn ich "In Zwischenablage" klicke
    Dann wird diese Zeile in die Zwischenablage kopiert:
    `Max[TAB]Mustermann[TAB][TAB][...][TAB]max@example.de[TAB][...][TAB]24,00[...]`
    Und Trennzeichen sind Tabulatoren
    Und Dezimalzahl mit Komma (24,00)

  Szenario: Leere Felder im TSV bewahren
    Angenommen "Geburtsname" ist leer
    Wenn ich die Zeile kopiere
    Dann ist die entsprechende Spalte im TSV leer
    Aber der Tabulator ist vorhanden (damit Spalten-Alignment stimmt)
    Und beim Einfügen in Excel ist die Zelle leer, aber auf der richtigen Spalte

  Szenario: In Excel einfügen
    Angenommen ich habe die TSV in der Zwischenablage
    Wenn ich in Excel eine leere Zeile anklicke
    Und "Ctrl+V" drücke (Paste)
    Dann werden alle Daten in die entsprechenden Spalten eingefügt
    Und die Zeile ist komplett und korrekt formatiert

  Szenario: Fehlerhafte Daten können nicht kopiert werden
    Angenommen ein Pflichtfeld ist leer oder ungültig
    Wenn ich auf "In Zwischenablage" klicke
    Dann wird die Aktion blockiert
    Und eine Fehlermeldung zeigt, welches Feld fehlt

  Szenario: Foto wird nach Verarbeitung vergessen
    Angenommen ich habe den Datensatz erfolgreich kopiert
    Wenn ich "Neues Formular" klicke
    Dann wird das alte Foto gelöscht
    Und das Formular ist leer
    Und die App ist bereit für das nächste Formular
