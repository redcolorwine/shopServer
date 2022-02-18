const { Clothes, ClothesInfo } = require('../models/models');
const ApiError = require('../error/apiError');
const path = require('path');
const uuid = require('uuid');
class ClothesController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info } = req.body; // получаем данные из тела запроса
            const { img } = req.files; // получаем картинку из поля files 
            let filename = uuid.v4() + ".jpg"; // генерируем ID
            img.mv(path.resolve(__dirname, '..', 'static', filename))//Перемещение файла dirname путь до текущей папки с контроллерами ".." чтобы вернуться назад и папка static 

            if (info) { //если передали массив характеристик
                info = JSON.parse(info) // парсим полученные данные
                info.forEach(i => //для каждого элемента массива вызываем Create и создаем запись в БД
                    ClothesInfo.create({
                        title: i.title,
                        description: i.description,
                        clotheId: clothes.id
                    })
                )
            }

            const clothes = await Clothes.create({ name, price, brandId, typeId, img: filename }) // создаем запись в таблице

            return res.json(clothes);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.query; //получаем из запроса
        page = page || 1; //страница
        limit = limit || 9; //limit - количество вещей которые будут на одной странице
        let offset = page * limit - limit; //отступ Допустим мы на 2 странице и 9 товаров нужно пропустить, то 2*9 - 9 = 9 оступ
        let clothes;
        if (!brandId && !typeId) { //если нет бренда и нет типа
            clothes = await Clothes.findAndCountAll({ limit, offset }); // findAndCountAll поиск и выдача количества count
        }
        if (brandId && !typeId) { //если нет типа
            clothes = await Clothes.findAndCountAll({ where: { brandId }, limit, offset });
        }
        if (!brandId && typeId) { //если нет типа
            clothes = await Clothes.findAndCountAll({ where: { typeId }, limit, offset });
        }
        if (brandId && typeId) { //если указан бренд и тип
            clothes = await Clothes.findAndCountAll({ where: { typeId, brandId }, limit, offset });
        }
        return res.json(clothes);
    }
    async getOne(req, res) {
        const { id } = req.params; //получаем ID вещи из параметров
        const clothes = await Clothes.findOne( //передаем опции
            {
                where: { id },
                include: [{model:ClothesInfo, as: 'info'}]
            },
        )
        return res.json(clothes);
    }
}

module.exports = new ClothesController();