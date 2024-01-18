// index.js
// where your node app starts
require('dotenv').config();

// init project
var express = require('express');
const router = express.Router();

// http://expressjs.com/en/starter/basic-routing.html
router.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/timestamp.html');
});

const timeHandler = (req, res) => {
  const dateQuery = req.params.dateTime;
  const date = !dateQuery ? new Date() : (Number(dateQuery) ? new Date(Number(dateQuery)) : new Date(dateQuery));
  if(date && date.getTime()) {
    res.json({unix: date.getTime(), utc: date.toUTCString()});
  } else {
    res.json({error: "Invalid Date"});
  }
};
router.get("/api/", timeHandler);
router.get("/api/:dateTime", timeHandler);

module.exports = router;