const router = require('express').Router();

const userControllers = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/', userControllers.userRegisterController);
router.post('/login', userControllers.userLogin);
router.get('/main', verifyToken, userControllers.checkUserResource);

module.exports = router;
