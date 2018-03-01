const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
/* GET users listing. */
router.get('/', userController.getUser)
router.delete('/delete/:id',userController.removeUser)
router.put('/edit/:id',userController.editUser)


module.exports = router;
