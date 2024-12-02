const Email = require('../models/emailModel');
const transporter = require('../utils/nodemailer');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

exports.sendEmail = async (req, res) => {
    const { sender, recipient, subject, body } = req.body;

    // Generate a unique ID for the email
    const emailId = uuidv4();
    
    // Add the tracking pixel with the unique emailId
    const trackingPixel = `<img src="${process.env.LINK}/track/open/${emailId}" width="1" height="1"/>`;

    // Prepare the email options
    const mailOptions = {
        from: sender,
        to: recipient,
        subject: subject,
        html: `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            color: #333;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            width: 100%;
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            border-radius: 8px;
                            overflow: hidden;
                        }
                        .header {
                            background-color: #4CAF50;
                            color: white;
                            padding: 20px;
                            text-align: center;
                        }
                        .content {
                            padding: 20px;
                        }
                        .content h1 {
                            font-size: 24px;
                            color: #333;
                        }
                        .content p {
                            font-size: 16px;
                            line-height: 1.5;
                            color: #555;
                        }
                        .cta-button {
                            display: inline-block;
                            background-color: #4CAF50;
                            color: white;
                            padding: 10px 20px;
                            border-radius: 5px;
                            text-decoration: none;
                            font-weight: bold;
                        }
                        .footer {
                            background-color: #f4f4f4;
                            padding: 10px;
                            text-align: center;
                            font-size: 12px;
                            color: #777;
                        }
                        .footer a {
                            color: #4CAF50;
                            text-decoration: none;
                        }
                        .footer p {
                            margin: 10px 0 0;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>You're Awesome! 👏</h1>
                        </div>
                        <div class="content">
                            <h1>Hey there, ${recipient.split('@')[0]}!</h1>
                            <p>We hope you're having an amazing day! We're excited to share something with you:</p>
                            <p>${body}</p>
                            <p>Want to see more? <a href="http://yourwebsite.com" class="cta-button">Click here</a></p>
                        </div>
                        <div class="footer">
                            <p>You're receiving this email because you subscribed to our awesome content. If you'd prefer not to hear from us, <a href="http://unsubscribe-link.com">unsubscribe here</a>.</p>
                            <p>Follow us on <a href="http://facebook.com">Facebook</a>, <a href="http://twitter.com">Twitter</a>, and <a href="http://instagram.com">Instagram</a>.</p>
                        </div>
                        ${trackingPixel}
                    </div>
                </body>
            </html>
        `,
    };
    

    try {
        // Send the email using nodemailer
        await transporter.sendMail(mailOptions);

        // Save the email to the database with the generated emailId
        const email = new Email({ sender, recipient, subject, body, _id: emailId });
        await email.save();

        // Send response back
        res.status(200).json({
            message: 'Email sent successfully!',
            emailId: emailId 
          });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error sending email.');
    }
};
