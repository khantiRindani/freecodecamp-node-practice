// index.js
// where your node app starts
require('dotenv').config();

// init project
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

const timestampRouter = require('./timestamp');
app.use("/timestamp", timestampRouter);

const headerparserRouter = require('./headerparser');
app.use("/headerparser", headerparserRouter);

const urlshortenerRouter = require('./urlshortener');
app.use("/urlshortener", urlshortenerRouter);

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});