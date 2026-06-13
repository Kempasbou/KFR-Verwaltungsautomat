# language: de
Funktionalität: Anmeldung und Zugriffskontrolle
  Als Verein
  möchte ich, dass nur berechtigte Vorstandsmitglieder Zugriff haben,
  um den Datenschutz zu gewährleisten.

  Szenario: Vorstandsmitglied meldet sich an
    Angenommen ich bin ein registriertes Vorstandsmitglied
    Wenn ich E-Mail und Passwort eingebe
    Dann bin ich angemeldet
    Und ich kann auf die Mitgliederdatenbank zugreifen

  Szenario: Unbefugter Zugriff wird blockiert
    Angenommen ich bin nicht angemeldet
    Wenn ich eine geschützte Seite direkt aufrufe
    Dann werde ich zur Login-Seite weitergeleitet
