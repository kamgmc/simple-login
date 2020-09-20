const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('store', 'postgres', 'postgres', {
    host: 'localhost', port:5432, dialect: 'postgres', define: {
        freezeTableName: true
    }
});

console.log(Boolean(sequelize.authenticate())
    ? 'Successfully connected to Database'
    : 'Error connecting with database');

module.exports = sequelize;
