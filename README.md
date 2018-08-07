# Vaalikone

# HUOM!Uusi ulkoasu täällä * [vaalikone2.0](https://github.com/jarihartzell/vaalikone2.0)

Ajatuksena tehdä vaalikone, jossa kysymykset ja vastaukset haetaan eduskunnan sivuilta. Ajatuksena on tarkastella aluksi vain puoluekantaa, mutta jos innostun, lisään vaalikoneeseen myös tiedot äänestyksistä edustajittain.

Toimintaperiaate on siis seuraavanlainen, lisään eduskunnassa äänestetyt kysymykset ja puolueiden kannat kysymyksiin tietokantaan, josta kysymyksiä haetaan satunnaisesti vaalikoneeseen. Käyttäjän vastauksia vertailaan sitten todellisiin äänestyksiin ja annetaan tiedot osuvimmista puolueista. 

Luon tietojen siirtämiseen tietokantaan lomakkeen, johon kopioin eduskunnan sivuilta table-elementin, josta puolueiden kannat kuhunkin kysymykseen tulevat ilmit. 

* [Linkki herokuun](https://vaalitback.herokuapp.com/)
* [Linkki backiin](https://github.com/pidrmasiin/vaalitback)

# työaikakirjanpito

| päivä | aika | mitä tein  |
| :----:|:-----| :-----|
| 12.3. | 3,5  | Ympäristön pystyttäminen + html dokumentin käsittelyn opettelu|
| 13.3. | 5	| Samaa kuin eilen + parserin opettelua ja bootstrapin käyttöönotto |
| 14.4  | 4	| Backend ja Heroku pystyyn ja routerit frontiin ja backiin |
| 15.3  | 1,5	| Mlab ja Post-metodin säätöä |
|16.3	| 1	| Notification & FormInput components |
|19.3	| 1,5	| Notification style + TextArea component + service start |
|20.3	| 5,5	| Menu component + login service + userReducer + kysymykset component & reducer + herokun kanssa säätöä(proxy) |
|22.3	| 4	| Backendiin delete, user yms ja fronttiin vastaavaa. Ongelmia frontin kanssa. |
|22.3	| 3	| Login kuntoon ja navbar yms. ulkoasu kikkailua |
|22.3	| 2	| Vaihto semantic UI:hin ja ulkoasu kikkailua |
|28.3	| 3,5	| Ulkoasua ja delete. Alustavaa perehtymistä csv-parserin käyttöön |
|29.3	| 3,5	| Vaalikonetta alulle. Lisäksi kikkailua ulkoasun kanssa sekä favicon|
|3.4	| 7	| Vaalikone toimintaan + kirjautumisen toiminnan parantelua|
|4.4	| 7,5	| Vaalikoneen parantelua + kategoriat + uusi ulkoasu|
|24.4	| 4	| Kysymysten/Kategorioiden poiston ja muokkauksen backiin. Front: kategorioiden lisäys|
|15.5	| 1,5	| Kategorioiden poisto ja muokkaukset backiin. Taustakuva yms muuta ulkoasua.|
|16.5	| 3,5	| Vaalikoneen toiminnan parantelua/eslint kuntoon/yleistä säätöä.|
|17.5	| 7	| Muokkauksen mahdollisuus kysymyksiin ja kategorioiden poisto sekä ulkoasua.|
|22.5	| 5	| Kysymysten ja kategorioiden poisto ja muokkaus toiminto kuntoon.(Backend)|
|23.5	| 3	| CSV-parserin opettelua|
|28.5	| 4	| CSV-tiedoston kanssa sähläämistä. (Haku toiminto yksittäisille edustajille)|
|29.5	| 8	| Ylen vaalikone vastausten ja eduskunnan vastausten linkittämistä kategorioittain yms.|
|30.5	| 9	| Vastausten tarkastelu puolueittain ja alustavaa ylen vastausten kategorisointia|
|31.5	| 10	| Ylen vastausten kategorisointia suhteessa vaalikoneen kysymyksiin ja kone prototyyppi kuntoon|

Yhteensä: 107.5



