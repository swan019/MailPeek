const express = require('express');
const { sendEmail , analytics} = require('../controllers/emailController');
const router = express.Router();

router.post('/send', sendEmail);

// Route to fetch all emails from the database
router.get('/analytics', analytics);


module.exports = router;
