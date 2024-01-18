var express = require('express');
const router = express.Router();

// http://expressjs.com/en/starter/basic-routing.html
router.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/headerparser.html');
});

router.get('/api/whoami', (req, res) => {
    res.json({ipaddress: req.ip, language: req.headers['accept-language'], software: req.headers['user-agent']});
});

module.exports = router;