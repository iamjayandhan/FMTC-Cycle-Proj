const router = require('express').Router();

const userControllers = require('../controllers/userController');

router.post('/', userControllers.userRegisterController);

module.exports = router;
