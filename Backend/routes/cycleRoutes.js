const router = require('express').Router();

const verifyToken = require('../middlewares/authMiddleware');
const cycleControllers = require('../controllers/cycleController');

router.put('/unlock',verifyToken, cycleControllers.unlockCycle);

module.exports = router;
