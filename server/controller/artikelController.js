const artikelModel = require('../model/artikel')
const jwt = require('jsonwebtoken')
const userModel = require('../model/User')

const addArtikel = function(req, res){
  console.log('masuk controller', req.body);
  let decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY);
  let newArtikel = new artikelModel({
    title: req.body.title,
    description: req.body.description,
    img: req.file.cloudStoragePublicUrl,
    author: decoded.id
  })
  newArtikel.save()
  .then((response) => {
    res.status(200).json({
      msg:"sukses",
      data:response
    })
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err)
  })

}

const removeArtikel = function(req, res){
  artikelModel.findByIdAndRemove(req.params.id)
  .then((response) => {
    res.status(200).json({
      msg:"deleted",
      data:response
    })
  }).catch((err) => {
    res.status(500)
  })
}

const editArtikel = function(req, res){
  artikelModel.findById(req.params.id)
  .then((artikel) => {
    artikel.title = req.body.title || artikel.title
    artikel.description = req.body.description || artikel.description
    artikel.category = req.body.category || artikel.category
    artikel.created = req.body.created || artikel.created
    artikel.save()
    .then((response) => {
      res.status(200).json({
        msg:"updated",
        data:response
      })
    }).catch((err) => {
      res.status(500)
    })
  }).catch((err) => {
    res.status(500)
  })
}

const getArtikel = function(req, res){
  artikelModel.findById(req.params.id)
  .populate('author')
  .then((response) => {
    res.status(200).json({
      data:response
    })
  }).catch((err) => {
    console.log(err);
    res.status(500)
  })
}

const getAllArtikel = function(req, res) {
  artikelModel.find()
  .populate('author')
  .then((response) => {
    res.status(200).json({
      data: response
    })
  }).catch((err) => {
    res.status(500).send(err)
  })
}

module.exports = {
  addArtikel,
  editArtikel,
  removeArtikel,
  getArtikel,
  getAllArtikel
}
