'use strict'

const express = require('express');
const router = express.Router();

const MutationController = require('../controllers/MutationController');
const isDNAValid = require('../middlewares/isDNAValid');

// First validate DNA and after validate if has mutation
router.post('/mutation',
    isDNAValid,
    MutationController.find,
    MutationController.mutation
);

module.exports = router;      