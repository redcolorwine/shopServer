const {Type}=require('../models/models');//импортируем модель Типа
const ApiError=require('../error/apiError');


class TypeController {
    async create(req, res) {
        const {name} = req.body; //получаем имя типа из запроса
        const type = await Type.create({name}); //создаем тип, передавая объект и  указывая нужные поля. 
        //Тут нужно только имя, т.к. ID автоматически присвоится
        return res.json(type)
    }
    async getAll(req, res) {
        const types = await Type.findAll();//Возвращает все существующие записи в таблице
        return res.json(types);
    }

}

module.exports = new TypeController();