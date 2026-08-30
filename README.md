# Auron Vault

<p align="center">
  <img src="https://raw.githubusercontent.com/LordLOLQDH/Auron-Vault/main/icon.svg" alt="Auron Vault Icon" width="96">
</p>

<p align="center">
  <strong>Privat. Lokal. Verschlüsselt.</strong><br>
  Ein browserbasierter Passwort-Tresor mit Fokus auf Privatsphäre und transparenter Sicherheit.
</p>

<p align="center">
  <a href="https://lordlolqdh.github.io/Auron-Vault/"><strong>▶ Auron Vault öffnen</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Beta-f0b74d?style=for-the-badge" alt="Status: Beta">
  <img src="https://img.shields.io/badge/Speicherung-lokal-5eead4?style=for-the-badge" alt="Lokale Speicherung">
  <img src="https://img.shields.io/badge/Open%20Source-offen-818cf8?style=for-the-badge" alt="Open Source">
</p>

---

## 🔐 Über Auron Vault

**Auron Vault** ist ein lokal orientierter Passwort-Tresor, der direkt im Browser ausgeführt wird.

Das Projekt verfolgt einen einfachen Grundsatz: **Sensible Zugangsdaten sollen möglichst unter der Kontrolle des Benutzers bleiben.** Deshalb benötigt Auron Vault keinen zentralen Cloud-Tresor und keinen Benutzeraccount.

Die kryptografischen Funktionen werden über die native **Web Crypto API** des Browsers bereitgestellt.

> **Transparenz statt falscher Sicherheitsversprechen:** Auron Vault ist ein Open-Source-Beta-Projekt. Die Anwendung soll Sicherheit und Privatsphäre ernst nehmen, kann aber keine absolute Sicherheit garantieren.

## 🛡️ Sicherheit

### Aktuell umgesetzt

- 🔒 **AES-GCM** zur Verschlüsselung
- 🧩 **PBKDF2** zur Schlüsselableitung
- 🌐 Nutzung der **Web Crypto API** des Browsers
- 💾 lokaler, browserbasierter Speicher für den Tresor
- 🔑 Master-Passwort, PIN und Codename als Zugangskomponenten
- 🎲 integrierter Passwortgenerator
- 📊 Passwort-Stärkeanzeige
- 📱 optimierte Darstellung für mobile Geräte und Desktop

### ⚠️ Wichtige Sicherheitswarnung

**Auron Vault befindet sich derzeit in der Beta-Phase und wurde noch keinem unabhängigen professionellen Security Audit unterzogen.**

Daher sollte Auron Vault aktuell **nicht als einziger Speicherort für besonders kritische Zugangsdaten** verwendet werden.

Beachte außerdem:

- Ein kompromittiertes Gerät oder ein kompromittierter Browser kann auch einen Passwortmanager gefährden.
- Das Löschen von Browserdaten kann lokal gespeicherte Daten entfernen.
- Ein starkes und einzigartiges Master-Passwort ist entscheidend.
- Regelmäßige und sichere Backups sind wichtig.
- Eine Verschlüsselung bedeutet nicht automatisch, dass eine Anwendung frei von Fehlern ist.

Auron Vault macht bewusst **keine Behauptungen wie „unhackbar“ oder „100 % sicher“**.

## 🔏 Datenschutz

Auron Vault ist nach einem **Local-First-Prinzip** aufgebaut.

Das bedeutet:

- Kein Benutzerkonto ist erforderlich.
- Kein zentraler Cloud-Tresor ist Bestandteil der Anwendung.
- Die Anwendung kann als statische Website über GitHub Pages betrieben werden.
- Der Tresor wird browserseitig verarbeitet und gespeichert.

Die tatsächliche Privatsphäre und Sicherheit hängt trotzdem von der verwendeten Hardware, dem Betriebssystem, dem Browser und dessen Umgebung ab.

## ⚙️ Technologie

| Bereich | Technologie |
|---|---|
| Oberfläche | HTML, CSS, JavaScript |
| Kryptografie | Web Crypto API |
| Verschlüsselung | AES-GCM |
| Schlüsselableitung | PBKDF2 |
| Hosting | GitHub Pages |
| Speicherung | Browser / lokaler Speicher |

Auron Vault benötigt für seine Kernfunktionen keinen eigenen Backend-Server.

## 📊 Projektstatus

### 🟡 Beta – aktiv in Entwicklung

| Bereich | Status |
|---|---|
| Benutzeroberfläche | ✅ Implementiert |
| Passwort-Tresor | ✅ Implementiert |
| Lokale Speicherung | ✅ Implementiert |
| Verschlüsselung | ✅ Implementiert |
| Passwortgenerator | ✅ Implementiert |
| Mobile Darstellung | ✅ Implementiert |
| Unabhängiger Security Audit | ⏳ Ausstehend |
| Erweiterte Backup-Funktionen | 🚧 In Entwicklung |
| Produktionsreife | ⏳ Noch nicht erreicht |

## 🚀 Roadmap

- [ ] Verschlüsselte Backups und Wiederherstellung weiter ausbauen
- [ ] Sicherheitsarchitektur ausführlich dokumentieren
- [ ] Threat Model veröffentlichen
- [ ] Automatisierte Tests erweitern
- [ ] Browser- und Gerätekompatibilität weiter testen
- [ ] Unabhängige Sicherheitsprüfung durchführen lassen
- [ ] Benutzeroberfläche weiter verbessern

## 🌐 Auron Vault verwenden

Die aktuelle Webversion ist hier verfügbar:

**https://lordlolqdh.github.io/Auron-Vault/**

Eine klassische Installation ist nicht erforderlich. Der Quellcode kann außerdem heruntergeladen und lokal über einen Webserver ausgeführt werden.

## 📖 Open Source

Der Quellcode von Auron Vault ist öffentlich einsehbar. Das ist bei einem sicherheitsorientierten Projekt ausdrücklich gewollt.

Transparenter Quellcode ermöglicht es anderen, die Implementierung zu prüfen, Fehler zu melden und Verbesserungen vorzuschlagen.

**Open Source allein ist jedoch kein Sicherheitszertifikat.** Sicherheit erfordert zusätzlich Tests, Reviews, eine saubere Implementierung und idealerweise eine unabhängige Prüfung.

## 📜 Lizenz & Urheberrecht

Auron Vault wird unter der im Repository enthaltenen **MIT License** veröffentlicht.

Die Lizenz erlaubt unter ihren Bedingungen unter anderem die Nutzung, Vervielfältigung, Veränderung und Weitergabe des Projekts.

Das ursprüngliche Projekt und dessen Urheberrecht bleiben dem ursprünglichen Autor zugeordnet. **Eine Änderung, Weitergabe oder kommerzielle Nutzung des Codes macht eine andere Person nicht zum ursprünglichen Ersteller von Auron Vault.**

Für die rechtlich verbindlichen Bedingungen gilt ausschließlich der vollständige Text der Datei [`LICENSE`](./LICENSE).

## 🐛 Fehler & Sicherheitslücken

Fehler können über die GitHub-Issue-Funktion gemeldet werden.

Bei möglichen **Sicherheitslücken** sollten keine vollständigen Exploit-Details unnötig öffentlich veröffentlicht werden. Wenn eine private Kontaktmöglichkeit des Projekts vorhanden ist, sollte diese für sensible Meldungen bevorzugt werden.

## 👤 Autor

**Auron Vault** wurde von **LordLOLQDH** entwickelt.

Das Projekt befindet sich in aktiver Weiterentwicklung und soll zu einem transparenten, lokal orientierten Passwort-Tresor ausgebaut werden.

---

<p align="center">
  <strong>Auron Vault</strong><br>
  Privatsphäre zuerst. Sicherheit durch Transparenz.
</p>
