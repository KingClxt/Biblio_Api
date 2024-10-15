const jwt = require('jsonwebtoken')
const private_key = require('./private_key')
module.exports = (req, res, next)=>{
     const authorizationHeader = req.headers.authorization
     if(!authorizationHeader){
          return res.json({messsage:"Vous n'avez pas fournis de jeton jwt"})
     }
     const token = authorizationHeader.split(' ')[1]
     jwt.verify(token, private_key, (err, payload)=>{
          if(err){
               const messsage = `Vous n'avez pas le droit d'acceder a la requete`
               return res.json({messsage})
          }
          req.user = payload
          next()
     })
}