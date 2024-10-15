const express = require('express')
const route = express.Router()
const auth = require("../Auth/auth")

const blogControllers = require('../Controllers/BlogControllers')
route.get('/books/:id', blogControllers.get_book)
route.put('/books/:id', blogControllers.update_book)
route.delete('/books/:id', blogControllers.delete_book)
route.get('/books',auth,  blogControllers.all_books)
route.post('/books', blogControllers.create_book)


module.exports = route