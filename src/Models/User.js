module.exports = (sequelize, DataTypes)=>{
     const User = sequelize.define('User',{
          id:{
               type:DataTypes.INTEGER,
               autoIncrement:true,
               primaryKey:true
          },
          username:{
               type:DataTypes.STRING,
               unique:true
          },
          password:{
               type:DataTypes.STRING,
               validate:{
                    min:{
                         args:[5],
                         masg:"Le mot de passe doit contenir au minumum 5 caractère"
                    }
               }
          }
     })
     User.associate = (models)=>{
          User.hasMany(models.Book, {foreignKey:"user_id"})
     }
     return User
}