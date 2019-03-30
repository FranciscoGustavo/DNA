const express = require('express');

const StatsController = require('../controllers/StatsController');
const router = express.Router();

router.get('/stats', StatsController.show);

module.exports = router;