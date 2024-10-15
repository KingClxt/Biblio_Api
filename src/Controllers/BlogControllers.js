const { ValidationError, where } = require('sequelize')
const {Book, Category} = require('../Db/sequelize')

const all_books = (req, res)=>{
     Book.findAll({include:[{
          model:Category
     }]
})
          .then(books=>{
               const message = "Les livres ont été recuperer avec success"
               res.json({message, data:books})
          })
}
const create_book = (req, res)=>{
     Book.create(req.body)
          .then(book=>{
               const message = `Un nouveau livre viens d'etre cree!`
               res.json({message, data:book})
          })
          .catch(err=>{
               if(err instanceof ValidationError){
                    return res.json({message:err.message})
               }
               res.json({err})
          })
}
const get_book = (req, res)=>{
     const id = req.params.id
     Book.findByPk(id)
          .then(book=>{
               if(book === null){
                    return res.json({message:"Ce livre n'existe pas"})
               }
               const message = `Le livre ${book.title} a été recuperé avec success`
               res.json({message, data:book})
          })
}
const update_book = (req, res)=>{
     const id  = req.params.id
     Book.update(req.body, {where:{id:id}})
          .then(_=>{
               Book.findByPk(id)
                    .then(book=>{
                         if(book === null){
                              return res.json({message:"Aucun livre n'a cet id"})
                         }
                         const message = `Le livre intituler a bien ete modifier`
                         res.json({message, data:book})
                    })
          })
}

const delete_book = (req, res)=>{
     Book.findByPk(req.params.id)
          .then(book=>{
               const deletedBook = book
               Book.destroy({where:{id:req.params.id}})
                    .then(_=>{
                         const message = `Le livre ${deletedBook.title} a été supprimer avec success`
                         res.json({message, data:deletedBook})
                    })
          })
}
module.exports = {all_books, get_book, create_book, update_book, delete_book}