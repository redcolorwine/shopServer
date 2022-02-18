//инициализация npm init -y
//npm install express pg pg-hstore sequelize cors dotenv
//npm i -D nodemon 
//npm i express-fileupload загрузчик файлов на сервер
//npm i uuid для генерации уникальных имен
//npm i jsonwebtoken // для JWT
//npm i bcrypt для хеширование паролей и не хранить их в БД в открытом виде
require('dotenv').config() // переменные окружения 
const express = require('express'); // импорт express
const sequelize = require('./db'); // БД
const PORT = process.env.PORT || 5000; // порт сервера
const models = require('./models/models');//импортируем наши модели БД
const fileUpload=require('express-fileupload');//подключаем загрузчик файлов
const cors = require('cors') //чтобы можно было отправлять запросы с браузера
const path=require('path');
const router = require('./routes/routes') // основной роутер
const errorHandler = require('./middleware/ErrorHandlingMiddleware'); //подключаем наш MiddleWare между запросом и обработчиков ошибок ApiError


const app = express() // создаем приложение
app.use(cors()); // подключаем CORS чтобы можно было делать запросы из браузера
app.use(express.json()) //чтобы можно было парсить json формат

app.use(express.static(path.resolve(__dirname,'static')));
app.use(fileUpload({}));
app.use('/api',router); // подключаем роутер

app.use(errorHandler); // должен идти последним! т.к. обработка ошибок. Последний MiddleWare

const start = async () => { //подключаем бд и прослушиваем порт. функция ассинхронна т.к. все запросы к БД ассинхронны
    try {
        await sequelize.authenticate() // подключаем БД
        await sequelize.sync() // сверяем состояние БД со схемой данных которую мы описали в model
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); // указываем порт который будет прослушивать сервер
    } catch (e) {
        console.log(e)
    }
}

start(); //старт