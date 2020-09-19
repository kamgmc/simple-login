const Sequelize = require('sequelize');

const sequelize = require('../connection')

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false,
    }
}, {tableName: 'account'});

User.prototype.toJSON =  function () {
    let values = Object.assign({}, this.get());

    delete values.password;
    return values;
}

module.exports = User;