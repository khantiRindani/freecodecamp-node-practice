// index.js
// where your node app starts
require('dotenv').config();

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", (req, res) => {
  res.json({greeting: 'hello API'});
});

const timeHandler = (req, res) => {
    try{
      const date = !req.params.dateTime ? new Date() : new Date(req.params.dateTime);
      res.json({unix: date.getTime(), utc: date.toUTCString()});
    } catch(error) {
      res.json({error: "Invalid Date"});
    }
  };
app.get("/api/", timeHandler);
app.get("/api/:dateTime", timeHandler);

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});