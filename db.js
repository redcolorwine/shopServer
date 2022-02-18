const {Sequelize} = require('sequelize'); //импортируем sequelize и делаем деструктуризацию т.к. весь модуль не нужен

module.exports= new Sequelize( //экспортируем объект созданный из класса sequelize
    process.env.DB_NAME, //имя бд
    process.env.DB_USER, //юзер
    process.env.DB_PASSWORD, // пароль
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)