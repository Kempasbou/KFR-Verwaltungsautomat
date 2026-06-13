# language: de
Funktionalität: Erkannte Daten überprüfen & korrigieren
  Als Dateneingeber
  möchte ich alle erkannten Felder sehen und korrigieren können,
  damit die Daten fehlerfrei in meine Excel-Liste gehen.

  Szenario: Alle Felder in einem Korrektur-Formular anzeigen
    Angenommen die OCR ist fertig
    Wenn ich auf die Verifikations-Seite komme
    Dann sehe ich alle erkannten Felder in einem Formular
    Und jedes Feld kann ich editieren
    Und die Feldnamen entsprechen den Excel-Spalten

  Szenario: Fehlerhafte Erkennung korrigieren
    Angenommen OCR hat "Jähn" statt "Jahn" erkannt
    Wenn ich das Feld anklicke und korrigiere
    Dann wird die Korrektur gespeichert
    Und das Feld ist hervorgehoben (zeigt: "manuell korrigiert")

  Szenario: Pflichtfelder prüfen
    Angenommen ich bin im Korrektur-Formular
    Wenn ein Pflichtfeld leer ist
    Dann wird es rot hervorgehoben: "Dieses Feld ist erforderlich"
    Und ich kann "In Zwischenablage" nicht klicken, bis es gefüllt ist

  Szenario: Optionale Felder skippbar
    Angenommen "Geburtsname" ist leer
    Und "Geburtsname" ist optional (nicht auf dem Formular ausgefüllt)
    Wenn ich das Feld leer lasse
    Dann gibt es keine Fehlermeldung
    Und in der Excel-Zeile wird die Spalte leer

  Szenario: Besondere Felder korrekt darstellen
    Angenommen ich bin im Korrektur-Formular
    Dann sehe ich:
      | Feldname | Eingabe-Typ |
      | Mitgliedschaft | Dropdown: "Aktiv" / "Passiv" |
      | Jahresbeitrag | Zahleneingabe mit "€" |
      | Geburtsdatum | Datumsfeld (TT.MM.JJJJ) |
      | Eintrittsdatum | Datumsfeld (TT.MM.JJJJ) |
      | Foto-Einverständnis | Checkbox: "Ja" / "Nein" |
