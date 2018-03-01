var express = require('express');
var router = express.Router();
var artikelController = require('../controller/artikelController');
var Image = require('../middleware/image');
/* GET home page. */
router.post('/add', Image.multer.single('image'), Image.sendUploadToGCS, artikelController.addArtikel)
router.get('/', artikelController.getAllArtikel)
router.get('/:id', artikelController.getArtikel)
router.put('/edit/:id', artikelController.editArtikel)
router.delete('/delete/:id', artikelController.removeArtikel)

module.exports = router;
