module.exports = (sequelize, DataTypes)=>{
     const Book = sequelize.define('Book', {
          id:{
               type:DataTypes.INTEGER,
               primaryKey:true,
               autoIncrement:true
          },
          title:{
               type:DataTypes.STRING,
               validate:{
                    notEmpty:{
                         msg:"Veuillez saisir le titre du livre svp!"
                    }
               }
          },
          auteur:{
               type:DataTypes.STRING
          }
     })
     Book.associate = (models)=>{
          Book.belongsToMany(models.Category, {through:"BookCategory"})
          Book.belongsTo(models.User, {foreignKey:"user_id"})
     }
     return Book
}