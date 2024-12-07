
const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
    class User extends Model{

    }

    User.init({
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        nombre:{
            type: DataTypes.STRING,
            allowNull: false,
        },

        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: true,
        },

        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },

        rol:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: true,
        },
    },
    {sequelize,
        modelName: 'User',
        tableName: 'usuarios',
        timestamps: true,
    });

    User.beforeCreate(async (user) =>{
        if(user.password){
            const passwordHash = await bcrypt.hash(user.password, 10);
            user.password = passwordHash;
        }
    });

    return User;
}