const Email = require('../models/emailModel');
const path = require('path');

exports.trackOpen = async (req, res) => {
    const emailId = req.params.id;
    try {
        const email = await Email.findById(emailId);

        if (email) {
            // If the email is already opened, increment the click count
            if (email.status === 'Opened') {
                email.clicks = email.clicks ? email.clicks + 1 : 1;  // Increment clicks or set to 1 if not defined
                await email.save();
            }
            // If the email is being opened for the first time, set status to "Opened" and initialize clicks
            else if (!email.openedAt) {
                email.status = 'Opened';
                email.openedAt = new Date();
                email.clicks = 1;  // Initialize clicks on first open
                await email.save();
            }
        }

        // Send the tracking pixel as the response
        res.sendFile(path.join(__dirname, '../../public/pixel.png'));
    } catch (err) {
        console.error(err);
        res.status(500).send('Error tracking email open.');
    }
};
