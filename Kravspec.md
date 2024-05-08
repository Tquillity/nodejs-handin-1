# Godkänt krav

Applikationen ska byggas som ett REST API med endpoints för att kunna skapa block i en blockkedja. Det ska dessutom gå att lista alla block i en blockkedja samt hämta ut ett valfritt block ur blockkedjan.

## Krav:


  [x] ~~Applikationen ska vara uppbyggd kring design mönstret MVC.~~
  [x] ~~Felhantering enligt “best practice” ska användas(det som vi gått igenom)~~
  [] Blockkedjan ska skrivas till en json fil så att den finns även efter omstart av servern.
  [] Loggning av fel ska skrivas till en fysisk fellogg
  [x] ~~ ES6 moduler ska användas istället för CommonJS moduler.~~
  [] Skapandet av block ska ske test drivet(TDD)
  [] Varje block måste verifieras och valideras(“Proof Of Work”)

 
## Väl godkänt krav:

  [] För väl godkänt ska data i blocket vara av typen “complex object”, det vill säga antingen en instans av en klass eller ett anonymt objekt.
  [] Centraliserad felhantering måste användas
  [] Centraliserad loggning av applikationen måste användas