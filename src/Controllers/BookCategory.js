const {Book, Category} = require('../Db/sequelize')

const BookCategoryAssociation = async (req, res)=>{
     const book = await Book.findByPk(req.body.bookId)
     const categories = req.body.categories
     categories.forEach(categoryId=>{
          Category.findByPk(categoryId)
                  .then(async (category)=>{
                    await book.addCategory(category)
                  })
     })
     const message = `L'association c'est terminer avec success`
     res.json({message, data:book.getCategories()})

}
const deleteBookCategoryAssociation = async(req, res)=>{
     const book = await Book.findByPk(req.params.book)
     const category = await Category.findByPk(req.params.category)
     await book.removeCategory(category)
     const message = "Dissociation terminer avec success"
     res.json({message})
}
module.exports = {
     BookCategoryAssociation,
     deleteBookCategoryAssociation
}

