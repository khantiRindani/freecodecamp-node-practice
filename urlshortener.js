var express = require('express');
const router = express.Router();

const dns = require('dns');

// http://expressjs.com/en/starter/basic-routing.html
router.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/urlshortener.html');
});

const map = new Map();
const revMap = new Map();
counter = -1;

router.post('/api/shorturl', (req, res) => {
    url = req.body.url.replace(new RegExp("https?://"), '');
    dns.lookup(url, (err, add) => {
        if(err) {
            res.json({error: "invalid url"});
        }
        if(!map.has(url)) {
            map.set(url, counter+1);
            revMap.set(counter+1, url);
            counter++;
        };
        res.json({"original_url": url, "short_url": map.get(url)});
    });
});

router.get('/api/shorturl/:shortUrl', (req, res) => {
    if(!revMap.has(Number(req.params.shortUrl))) {
        res.json({error: "invalid url"});
    }
    res.redirect("http://" + revMap.get(Number(req.params.shortUrl)));
});

module.exports = router;