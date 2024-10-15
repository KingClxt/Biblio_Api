const bodyParser = require('body-parser')
const morgan = require('morgan')
const {initDB} = require('./src/Db/sequelize')


// initialisation de l'app express
const express = require('express')
const app = express()


// Recuperation de nos routes
const BookRoutes = require('./src/Routes/BookRoutes')
const BookCategoryRoutes = require('./src/Routes/BookCategoryRoutes')
const AuthRoutes = require('./src/Routes/AuthentificationRoutes')



// middlewares
app.use(bodyParser.json())

   .use(morgan('dev'))
   // on appel toutes nos routes
   .use(BookRoutes)
   .use(BookCategoryRoutes)
   .use(AuthRoutes)


// initialisation de la db
initDB()


// lancement du serveur de developpement
const port = 3000
app.listen(port)