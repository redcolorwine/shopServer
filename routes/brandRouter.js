const Router = require('express');
const router = new Router();
const BrandController = require('../controllers/brandController');
const checkRole = require('../middleware/checkRoleMiddleWare');

//роуты и их контроллеры
router.post('/', checkRole('ADMIN'), BrandController.create);
router.get('/', BrandController.getAll);

module.exports = router;