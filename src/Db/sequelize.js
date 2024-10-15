const {Sequelize, DataTypes} = require('sequelize')

// models
const book = require('../Models/Book')
const category = require('../Models/Category')
const user = require('../Models/User')
// other
const bcrypt = require('bcrypt')
const {books, categories} = require('../Db/initialData')
// Connexion a notre base de donnee avec sequelize
const sequelize = new Sequelize(
     "bibliotheque",
     "root",
     "",
     {
          host:"localhost",
          dialect:"mariadb",
          dialectOptions:{
               timezonw:"Etc/GMT-2"
          },
          logging:false
     }
)
sequelize.authenticate()
          .then(_=>{
               console.log("Connexion effectuer avec succes");
          })
// Defnition des modele
const Book = book(sequelize, DataTypes)
const Category = category(sequelize, DataTypes)
const User = user(sequelize, DataTypes)
// Association des modeles
const models = {Book, Category, User}
User.associate(models)
Book.associate(models)
Category.associate(models)
const initDB = ()=>{
     sequelize.sync({force:true})
          .then(_=>{
               bcrypt.hash("14122004", 10)
                    .then(password=>{
                         User.create({
                              username:"Clxt",
                              password:password
                         })
                              .then(user=>{
                                   books.forEach(book=>{
                                   Book.create({
                                        title:book.title,
                                        auteur:book.auteur,
                                        user_id:user.id
                                   })
                              })
                              })
                    })
               
               
               categories.forEach(category=>{
                    Category.create({
                         name:category.name
                    })
               })
          })   
     }
module.exports = {
     Book,
     Category,
     User,
     initDB
}