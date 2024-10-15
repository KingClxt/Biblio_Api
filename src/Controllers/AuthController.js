const bcrypt = require('bcrypt')
const {User} = require('../Db/sequelize')
const jwt = require('jsonwebtoken')
const private_key = require("../Auth/private_key")
const login = (req, res)=>{
     User.findOne({where:{username:req.body.username}})
          .then(user=>{
               if(user === null){
                    const message = `Ce nom d'utilisateur n'existe pas!`
                    return res.json({message})
               }
               bcrypt.compare(req.body.password, user.password)
                    .then(verifyPassword=>{
                         if(!verifyPassword){
                              const message = `Mot de passe incorrecte!.`
                              return res.json({message})
                         }
                        const token = jwt.sign({userId:user.id, userName:user.username}, private_key, {expiresIn:"2h"})
                         const message = `Vous etes belle et bien connecter`
                         return res.json({message, user, token})
                    })
          })
}
const getUser = (req,res)=>{
     res.json({user:req.user})
}


module.exports = {
     login,
     getUser
}