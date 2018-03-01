var express = require('express');
var router = express.Router();
var artikelController = require('../controller/artikelController')
var Image = require('../middleware/image')
/* GET home page. */
router.post('/', Image.multer.single('image'), Image.sendUploadToGCS, artikelController.addArtikel)

module.exports = router;
