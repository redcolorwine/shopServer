const Router = require('express'); // получаем роутер из экспресса
const router = new Router(); // создаем объъект роутера
const clothesRouter = require('./clothesRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');
const userRouter = require('./userRouter');

//все подроутеры 
router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/clothes', clothesRouter);


module.exports = router; // экспортируем роутер