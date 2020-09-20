const Sequelize = require('sequelize');

const sequelize = require('../connection')

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: "first_name"
    },
    lastName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: "last_name"
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      field: "created_at"
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: "updated_at",
    }
}, {tableName: 'user'});

// Hidden fields to the user
User.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());

    delete values.password;
    return values;
}

module.exports = User;