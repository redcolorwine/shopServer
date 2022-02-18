const Router = require('express');
const router = new Router();
const ClothesController = require('../controllers/clothesController');
const checkRole = require('../middleware/checkRoleMiddleWare');

router.post('/', checkRole('ADMIN'), ClothesController.create);
router.get('/', ClothesController.getAll);
router.get('/:id', ClothesController.getOne) // чтобы получить отдельную вещь на странице подробной информации

module.exports = router;