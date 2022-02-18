//middleware 
const ApiError = require('../error/apiError');//импортируем класс с обработкой ошибок


module.exports = function (err, req, res, next) { // (ошибка запрос ответ и функция для передачи управления следующему мидлвейру)
    if (err instanceof ApiError) { //если класс ошибки  - ApiError 
        return res.status(err.status).json({ // то возвращаем ответ со статус кодом ошибки
            message: err.message
        })
    }
    return res.status(500).json({ message: "Неизвестная ошибка" }) //если ошибка не принадлежит ApiError, то возвращаем неизвестную ошибку
}