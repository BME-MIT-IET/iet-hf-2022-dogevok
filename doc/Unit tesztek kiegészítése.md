## Unit tesztek kiegészítése
### Castillo-Hoós Marcell

A kódbázis tesztjei majdnem a teljes kódot lefedték, de észrevettük, hogy az Url.isEmptyQuery nincs tesztelve, így ahhoz készítettem két kissebb tesztet.

A tesztek:

```javascript
describe("Url.isEmptyQuery tesztje", function () {
    it ("Üres query esetén true-t ad vissza", function () {
        let url = new Url("https://github.com/BME-MIT-IET/iet-hf-2022-dogevok");
        assert(url.isEmptyQuery());
    });
    it ("Nem üres query esetén false-t ad vissza", function () {
        let url = new Url("https://github.com/BME-MIT-IET/iet-hf-2022-dogevok/a?b=2&c=4&d=5");
        assert(!url.isEmptyQuery());
    });
})
```

Az eredménye az lett, hogy így a lefedettség is nőtt, melyet Hell Csaba dokumentált, de a fontosabb, hogy a publikus API összes függvényét, amit a ```Readme.md``` is kiajánl, mostmár tartalmazza, így nagyobb bizonyossággal tudjuk mondani, hogy a kód helyes.