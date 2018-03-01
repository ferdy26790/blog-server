const userModel = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const salt = 10
require('dotenv').config()

const register = function(req, res){
  console.log('masuk', req.body.name, req.body.email, req.body.password)
  if (!req.body.password) {
    res.status(422).send('missing password')
  }
  bcrypt.hash(req.body.password, salt, function(err, hash){
    if(!err){
      let newUser = new userModel({
        name: req.body.name,
        password: hash,
        email: req.body.email
      })
      newUser.save()
      .then((response) => {
        res.status(200).json({
          msg:"sukses",
          data:response
        })
      }).catch((err) => {
        console.log(err)
        res.status(500)
      })
    }else{
      console.log(err)
      res.status(500)
    }
  })

}

const removeUser = function(req, res){
  console.log('masuk');
  userModel.findByIdAndRemove(req.params.id)
  .then((response) => {
    res.status(200).json({
      msg:'removed',
      data:response
    })
  }).catch((err) => {
    res.status(500)
  })
}

const editUser = function(req, res){
  userModel.findById(req.params.id)
  .then((user) => {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.save()
    .then((response) => {
      res.status(200).json({
        msg:"edited",
        data:response
      })
    }).catch(() => {

    })
  }).catch((err) => {
    res.status(500);
  })
}

const login = function(req, res){
  console.log(req.body.email);
  userModel.findOne({
    email:req.body.email
  }).then((user) => {
    console.log('masuk');
    bcrypt.compare(req.body.password, user.password, function(err, response) {
      if(!err){
        let token = jwt.sign({
          id:user._id,
          name:user.name,
          email:user.email
        }, process.env.SECRET_KEY);
        console.log(token)
        res.status(200).json({
          msg:"loggedin",
          token:token,
          role: user.role
        })
      } else {
        console.log('masuk err');
        res.status(200).json({
          msg:"password salah"
        })
      }
    });
  }).catch((err) => {
    res.status(500)
  })
}

const getUser = function(req, res){
  console.log('masuk');
  let decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY);
  if (decoded) {
    userModel.findById({
      _id:decoded.id
    })
    .then((user) => {
      res.status(200).json({
        dataUser:user
      })
    }).catch((err) => {
      res.status(500)
    })
  } else {
    res.status(404)
  }
}

module.exports ={
  register,
  removeUser,
  editUser,
  login,
  getUser
}
