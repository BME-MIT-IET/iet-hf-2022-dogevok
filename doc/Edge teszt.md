## Edge-ben böngészőteszt a kódhoz
#### Castillo-Hoós Marcell

A böngészőteszthez a kódban a test/url.html fájlt kiegészítettem az általam hozzáírt teszttel, mely az Url.isEmptyQuery-t teszteli:
- Üres query esetén true-t ad vissza: 
```javascript
let ua = new Url("https://github.com/BME-MIT-IET/iet-hf-2022-dogevok");
assertEqual(ua.isEmptyQuery(), true, "ures query eseten true-t ad vissza az Url.isEmptyQuery");
```
- Nem üres query esetén false-t ad vissza:
```javascript
let ub = new Url("https://github.com/BME-MIT-IET/iet-hf-2022-dogevok/a?b=2&c=4&d=5");
    assertEqual(ub.isEmptyQuery(), false, "nem ures query eseten false-t ad vissza az Url.isEmptyQuery");
```


Ennek az eredménye a ```browsertests/Edge.md``` fájlban található.

A cél az volt, hogy megnézzük a kompatibilitást az újabb böngészőkkel, és sikeresen bizonyítottuk, hogy a tesztek alapján a kód kompatibilis az Edge 101.0.1210.47 (64 bit) böngészővel.