# Lokális SonarLint problémák elemzése
A feladat során a detektál problémák megoldása volt a cél. Ezeket elemezve tanultunk javascript-béli módszerekről. 

A megoldott problémák:

- url.js
    -  _Cognitive Complexity of functions should not be too high_:
![kép](https://user-images.githubusercontent.com/79659381/168673717-f6f91cb3-52a1-472d-a1d5-4752f3b896d8.png)
Ez nem valós probléma, javascriptben sokat  használt egy nagy _anonymus_ függvény _script_ behúzását elősegítve.

    - _Unused function parameters should be removed_:
![kép](https://user-images.githubusercontent.com/79659381/168674432-8febc3bd-0090-4f9c-8e45-ab8b3f3af701.png)
Nem használt paramétert kivettük.

    - _Identical expressions on both sides_: 
![kép](https://user-images.githubusercontent.com/79659381/168675040-72999444-5d04-43f2-ab35-95624f5355df.png)
Felesleges és kapcsolat.

- test/url.js
    - _Attempts should not be made to update "const" variables_: egy konstans változót próbál felülírni
![kép](https://user-images.githubusercontent.com/79659381/168675809-5bc20591-f114-40d7-82c7-c1b624572be3.png)
Egy konstansként deklarált változót próbált felülírni.

Ezek javítása után Repositorynkhoz a Sonar Cloud szolgáltása is beüzemelésre került, Ami minden commit után lefutott.
Security hotspotnak jelezte például a _BDD_ tesztek esetében, a _http:example_ _URL-t_, de ezután sikerült elkerülnünk _bug_-okat és _code smelleket_.


