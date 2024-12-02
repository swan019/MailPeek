const express = require('express');
const { trackOpen } = require('../controllers/trackingController');
const router = express.Router();

router.get('/open/:id', trackOpen);

module.exports = router;
