
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
            validate: {
                isEmail: true,
            },
        },

        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },

        rol:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isIn:{
                    args: [['Admin', 'Usuario']],
                },
            },
        },
    },

    {sequelize,
        modelName: 'User',
        tableName: 'usuarios',
    });

    return User;
}