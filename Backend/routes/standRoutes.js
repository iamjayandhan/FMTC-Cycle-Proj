const router = require('express').Router();

const standControllers = require('../controllers/standController');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/:id', verifyToken, standControllers.getStandDetails);

module.exports = router;
