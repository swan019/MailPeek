const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Use String for UUID
    sender: { type: String, required: true },
    status: { type: String, default: "Closed" }, // Default status is "Closed"
    recipient: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    sentAt: { type: Date, default: Date.now }, // Sent time of the email
    openedAt: { type: Date }, // Date when the email was opened
    clicks: { type: Number, default: 0 }, // To track number of times the email is clicked
});
const Email = mongoose.model('Email', emailSchema);
module.exports = Email;
