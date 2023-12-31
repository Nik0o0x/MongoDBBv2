//zaimportuj bibliotekę express (serwer http)
const express = require('express');
//przygotuj instancję serwera http
const bodyParser = require('body-parser');
const app = express();
//zaimportuj nasze funkcje do danych
const db = require('./db');
app.use(bodyParser.urlencoded({extended: true}));

//zdefiniuj ścieżkę dla głownego "folderu" aplikacji przy użyciu żądania GET
//używamy funkcji asynchronicznej pod przyszłe funkcje mongodb
app.get('/', async (req, res) => {
    res.send("ELLLO!");
})

//funkcja wyświetla wszystkie rekordy z bazy danych
app.get('/lista', async (req, res) => {
    res.write("<h1>Wielka lista rekordow w bazie</h1>");
    const client = await db.connect();
    res.write("<table>");
    let list = await db.getAllListings(client);
    list.forEach(element => {
        res.write("<tr>");
        res.write("<td>" + element.listing_url + "</td>");
        res.write("<td>" + element.name + "</td>");
        res.write("</tr>");
    });
    res.write("</table>");
    db.close(client);
    res.end();
})

app.post('/search', async (req, res) => {
console.log(req.body);
res.send(200);

});

//uruchom serwer
app.listen(8000);