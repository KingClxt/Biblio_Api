const express = require('express')
const route = express.Router()

const BookCategory = require('../Controllers/BookCategory')
route.post('/bookCategories/', BookCategory.BookCategoryAssociation)
route.delete('/bookCategories/:book/:category', BookCategory.deleteBookCategoryAssociation)

module.exports = route