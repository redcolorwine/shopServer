//middleware для декодирования токена и проверки валидности
require('dotenv').config() // переменные окружения 
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") { //если метод options то пропускаем, нас интересует только post get put delete
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1]; // достаем токен из headers(заголовков) 'bearer d3432432432fdsgdfg'
        if (!token) {
            return res.status(401).json({
                message: "Пользователь не авторизован(token unvalid)"
            })
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)//проверяем валидность токена;
        req.user = decoded; //добавляем к запросу user данные токена 
        next(); //вызываем следующий в цепочке MW
    } catch (e) {
        res.status(401).json({
            message: "Пользователь не авторизован"
        })
    }
};