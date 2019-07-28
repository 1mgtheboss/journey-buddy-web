// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

const bodyParser = require('body-parser');


app.set('view engine', 'ejs');
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

var Amadeus = require('amadeus');
var amadeus = new Amadeus({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});



// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

const session = require('express-session');

app.use(session({
    secret: 'amadeus-secret',
    resave: true,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({
    extended: true
}));



app.post('/1', (req, res) => {



    amadeus.client.get("https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=" + req.body["lat"] + "&longitude=" + req.body["long"] + "&radius=" + req.body["radius"]).then(function(response) {

        res.send(response);

    }).catch(function(responseError) {
        res.send(responseError);

    });

});

app.post('/2', (req, res) => {




    // Solution 1
    amadeus.client.get('/v1/shopping/flight-dates', req.body).then(function(response) {

        //Solution 2
        //   amadeus.shopping.flightDates.get({
        //   origin : req.body["origin"],
        //   destination : req.body["destination"]
        // }).then(function(response){

        res.send(response);
    }).catch(function(responseError) {
        res.send(responseError);
    });
});

app.post('/3', (req, res) => {



    // Solution 1
    amadeus.client.get('/v1/shopping/flight-offers', req.body).then(function(response) {




        res.send(response);
    }).catch(function(responseError) {
        res.send(responseError);
    });
});




app.get('/', (req, res) => {


    res.render(__dirname + "/views/index");
});

// http://expressjs.com/en/starter/basic-routing.html


// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});