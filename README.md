Pluff — Studentenrooster [![Build Status](https://travis-ci.org/Fontys-Hogeschool-ICT/Pluff.svg?branch=master)](https://travis-ci.org/Fontys-Hogeschool-ICT/Pluff)
========================
[Pluff](https://pluff.venus.fhict.nl) is een open-source roostersysteem, gemaakt door Fontys ICT studenten. Het is onze visie, hoe het eigenlijk zou moeten. De webpagina's uit het gebruikte roosterpakket, zijn niet echt van deze tijd.

Uiteraard kan het altijd beter. Wij zijn geïnteresseerd in je feedback! Aarzel niet om hiervoor een issue aan te maken. Meehelpen is ook zeer welkom.

## [Master](https://github.com/Fontys-Hogeschool-ICT/Pluff/tree/master/) [![Build Status](https://travis-ci.org/Fontys-Hogeschool-ICT/Pluff.svg?branch=master)](https://travis-ci.org/Fontys-Hogeschool-ICT/Pluff)
This is the main branch, hosted on [pluff.venus.fhict.nl](https://pluff.venus.fhict.nl). It is automatically deployed by Travis, but this branch isn't used for development.

## [Dev branch](https://github.com/Fontys-Hogeschool-ICT/Pluff/tree/dev/) [![Build Status](https://travis-ci.org/Fontys-Hogeschool-ICT/Pluff.svg?branch=dev)](https://travis-ci.org/Fontys-Hogeschool-ICT/Pluff)
This is our development branch, so please submit all your pull-requests to this branch. It is also automatically deployed by travis to [pluff-dev.venus.fhict.nl](https://pluff-dev.venus.fhict.nl). This version of pluff is deployed on every push, so you'll see regular updates.

## Development

Om Pluff lokaal te draaien heb je [node.js](http://nodejs.org/) (v6 of hoger) en npm (meestal meegeleverd bij node.js) nodig.

Clone deze repository. Type (eenmalig) in je Pluff folder `npm install` om de benodigde dependencies te installeren. Daarna type je simpelweg `npm start` om de ‘server’ te starten. Ga nu naar `http://localhost:8080`, waar je als het goed is meteen een werkende Pluff ziet staan.

Houd je bij het ontwikkelen aan de  [Airbnb Javascript Style Guide](https://github.com/airbnb/javascript). Check of je voldoet aan deze standaard met `npm run lint`. Ook wordt [EditorConfig](http://editorconfig.org/) gebruikt zodat iedereen dezelfde line endings etc. gebruikt. Deze kun je voor vrijwel elke editor installeren.

## Nieuwe feature?

Heb je een nieuwe feature gemaakt, die je graag met de rest van de wereld wil delen? Stuur ons een pull-request van je nieuwe code. Wij zullen dit pull-request vervolgens in onze `dev` branch zetten zodat we het online kunnen testen op [pluff-dev](https://pluff-dev.venus.fhict.nl). Eens in de zoveel tijd zullen we al deze nieuwe features dan op de `master` zetten.

## Uploaden via FTP

Om Pluff op een website te plaatsen, kopieer je eerst `.env.example` naar `.env`. Vul vervolgens je FTP gegevens hier in. Daarna kun je de bestanden bouwen en uploaden op je FTP server door `npm run deploy-auto` uit te voeren.

Inmiddels wordt er gebruikt gemaakt van Travis om automatisch de laatste commit op de master te deployen naar de [pluff website](https://pluff.venus.fhict.nl).

## Credits

De mensen achter Pluff:

- [Kees Kluskens](https://www.webduck.nl) - Founder (bedenker/ontwikkelaar) - Afgestudeerd
- Tim van den Biggelaar - Ontwikkelaar
- [Stephan van Rooij](https://svrooij.nl) - Ontwikkelaar FHICT Api
- Jeroen - (oud)Serverbeheer
- Jasper Stam - _Programmeer schildknaap_
- Rutger Schimmel - _Bugtester_ & kleurentovenaar
- [Jort Polderdijk](https://github.com/JortPolderdijk) - Ontwikkelaar

Voor het rooster systeem maken we gebruik van de volgende projecten:

- [Angular](https://angularjs.org/) - JS framework
- [Webpack](https://webpack.github.io/) - Module bundler
- [Sass](http://sass-lang.com/) - *CSS with superpowers*
