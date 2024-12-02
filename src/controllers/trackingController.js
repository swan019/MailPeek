const Email = require('../models/emailModel');
const path = require('path');

exports.trackOpen = async (req, res) => {
    const emailId = req.params.id;
    try {
        const email = await Email.findById(emailId);
        console.log(email);
        
        if (email && !email.openedAt) {
            email.status = 'Opened';
            email.openedAt = new Date();
            await email.save();
        }
        res.sendFile(path.join(__dirname, '../../public/pixel.png'));
    } catch (err) {
        console.error(err);
        res.status(500).send('Error tracking email open.');
    }
};
