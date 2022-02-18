//middleware для проверки роли пользователя
require('dotenv').config() // переменные окружения 
const jwt = require('jsonwebtoken');

module.exports = function (role) { //ЗАМЫКАНИЕ! Принимает параметром роль и отсюда возвращаем MW
    return function (req, res, next) {
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
            if (decoded.role !== role) {
                return res.status(403).json({
                    message: "Нет доступа!"
                })
            }
            req.user = decoded; //добавляем к запросу user данные токена 
            next(); //вызываем следующий в цепочке MW
        } catch (e) {
            res.status(401).json({
                message: "Пользователь не авторизован"
            })
        }
    };
}


