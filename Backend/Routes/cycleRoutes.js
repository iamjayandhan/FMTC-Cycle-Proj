const router = require('express').Router();

const cycleControllers = require('../controllers/cycleController');

router.put('/unlock/:id', cycleControllers.unlockCycle);

module.exports = router;
