const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('users_db', 'postgres', 'cacaseca000', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;