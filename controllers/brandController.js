const {Brand}=require('../models/models');
const ApiError=require('../error/apiError');


class BrandController {
    async create(req, res) {
        const {name} = req.body; //получаем имя типа из запроса
        const brand = await Brand.create({name}); //создаем тип
        return res.json(brand)
    }
    async getAll(req, res) {
        const brands = await Brand.findAll();
        return res.json(brands);
    }

}

module.exports = new BrandController();