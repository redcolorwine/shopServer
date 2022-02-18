const ApiError = require('../error/apiError')
const bcrypt = require('bcrypt'); //для хеширование паролей и чтобы не хранить их в БД в открытом виде
const jwt = require('jsonwebtoken');
const { User, Basket } = require('../models/models');
require('dotenv').config() // переменные окружения 

const generateJwt = (id, email, role) => {
    return jwt.sign({ id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {

    async registration(req, res) {
        const { email, password, role } = req.body // получаем данные для регистрации
        if (!email || !password) {//если не введен пароль или емэил
            return next(ApiError.badRequest('Некорректный email или пароль'));
        }
        const candidate = await User.findOne({ where: { email } }); // проверяем есть ли уже такой пользователь
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email существует!'));
        }
        const hashPassword = await bcrypt.hash(password, 5); //хешируем пароль (пароль, количество хеширований)
        const user = await User.create({ email, role, password: hashPassword }); // создаем пользователя и передаем в БД хешированный пароль
        const basket = await Basket.create({ userId: user.id }); //создаем корзину пользователя 
        //передаем payload(центральную часть с данными пользователя),
        //секретный ключ созданный нами в .env файле и опции(время жизни токена)
        const token = generateJwt(user.id, user.mail, user.role);
        return res.json({ token });
    }
    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.internal('Пользователь не найден!'));
        }
        let comparePassword = bcrypt.compareSync(password, user.password); //сравниваем пароли
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль!'));
        }
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role);
        return res.json({ token });
    }
}

module.exports = new UserController();