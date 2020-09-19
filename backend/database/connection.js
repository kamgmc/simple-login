const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('store', 'postgres', 'postgres', {
    host: 'localhost', port:5432, dialect: 'postgres', define: {
        freezeTableName: true
    }
});

console.log(sequelize.authenticate());

module.exports = sequelize;