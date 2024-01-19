var express = require('express');
const router = express.Router();

// http://expressjs.com/en/starter/basic-routing.html
router.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/filemeta.html');
});

const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

router.post('/api/fileanalyse',upload.single('upfile'), (req, res) => {
    const file = req.file;
    res.json({name: file.originalname, type: file.mimetype, size: file.size});
});

module.exports = router;