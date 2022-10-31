<p align="center">
  <img src="./src/favicon.ico" alt="Size Limit CLI" width="80">
</p>

# rST-Miner

![CI](https://github.com/noahboerger/rST-Miner/actions/workflows/build-test-and-deploy-if-main.yml/badge.svg)

Das vorliegende Process-Discovery Projekt mit dem Namen rST-Miner (random state-space traversal) ist im Rahmen meiner **Abschlussarbeit** an der [Fernuniversität Hagen](https://www.fernuni-hagen.de/) entstanden. Die Betreuung der Masterarbeit erfolgt durch Robin Bergenthum und Jakub Kovar.

Die Funktionalität der Anwendung ist das Generieren eines Prozess-Modells in Form eines Petri Netzes aus Ereignisdaten. Hierzu bietet die Anwendung einen .xes und .log Import sowie einen Export des genierten Petri-Netzes. Der Algorithmus generiert hierzu randomisiert Plätze, um das resultierende Prozess-Modell zu erstellen. Nähere Informationen zum Algorithmus finden sich in der Abschlussarbeit.

## Aufsetzen des Projekts

### Einrichtung des lokalen Workspace

Nutze hierzu den [SetUp-Local-Guide](https://angular.io/guide/setup-local) von Angular.

### Klone das vorliegende [Repository](https://github.com/noahboerger/rST-Miner)

```bash
git clone https://github.com/noahboerger/rST-Miner.git
```

### Installiere alle Abhängigkeiten

Dies sind lediglich alle `npm` Pakete aus der `package.json`.

```bash
npm install
```

### Ausführen des Projekts

Ausführen der Unit-Test

```bash
npm run test 
```

Ausführen des Angular-Test-Servers zur lokalen Bereitstellung der Angular-Anwendung

```bash
npm run start 
```

### Weitere nützliche Befehle

Weitere nützliche Befehle, die in der `package.json` definiert wurden:

* `npm run build` - führt den TypeScript-Compiler und den Asset-Kopierer einmalig aus.
* `npm run watch` - führt den TypeScript-Compiler und den Asset-Kopierer im „Überwachungsmodus“ aus; Wenn Änderungen an den Quelldateien vorgenommen werden, werden sie neu kompiliert oder nach `dist/` kopiert.
* `npm run lint` - führt das konfigurierte linting aus.
* `npm run format` - führt das konfigurierte linting aus und behebt alle automatisiert lösbaren Mängel.

## Beitragen

Das Beitragen zum vorliegenden Projekt ist nicht möglich, da es sich um die Implementierung im Rahmen der Abschlussarbeit handelt.

Bei Bedarf kann gerne ein Fork des Projekts erstellt werden. Dieser kann frei weiterverwendet werden.

## CI/CD

Auf allen Branches werden automatisiert nach einem Commit über GitHub-Actions alle Unit-Tests ausgeführt. Daraufhin findet ein Build des Angular-Projekts statt. Diese Pipeline sollte vor der Erstellung eines Merge Requests deshalb erfolgreich durchlaufen werden.

Auf dem Main-Branch findet zudem eine Bereitstellung des Projekts durch ein Deployment auf GitHub-Pages statt. Der Branch `gh-pages` wird als Abbild des Pages-Deployments genutzt. Der aktuelle Master-Branch der Anwendung steht deshalb dauerhaft unter [https://noahboerger.github.io/rST-Miner/index.html](https://noahboerger.github.io/rST-Miner/index.html) zur Verfügung.
