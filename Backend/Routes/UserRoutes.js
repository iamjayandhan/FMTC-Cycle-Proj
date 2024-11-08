const router = require('express').Router();

const userControllers = require('../controllers/userController');

router.post('/', userControllers.userRegisterController);
router.post('/login', userControllers.userLogin);

module.exports = router;
