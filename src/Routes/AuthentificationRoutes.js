const express = require('express')
const AuthController = require('../Controllers/AuthController')
const router = express.Router()
const auth = require("../Auth/auth")

router.post('/login', AuthController.login)
router.get('/user/', auth, AuthController.getUser)


module.exports = router