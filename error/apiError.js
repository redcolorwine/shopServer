class ApiError extends Error { //расщиряем объект Error в конструкторе принимаем статус код и сообщение которое будем возвращать
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }
    //static можно вызывать без создания нового объекта
    static badRequest(message) {
        return new ApiError(404, message)
    }

    static internal(message) {
        return new ApiError(500, message)
    }

    static forbidden(message) {
        return new ApiError(403, message)
    }
}

module.exports = ApiError;