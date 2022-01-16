const express = require('express')
const router = express.Router()
const userController = require('../app/controllers/userController')
const verifyToken = require('../middelware/auth')


router.get('/getusers', userController.getAll)
router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/', verifyToken, userController.getUser)

module.exports = router