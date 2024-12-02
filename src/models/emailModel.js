const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Use String for UUID
    sender: { type: String, required: true },
    status: { type: String, default: "Close" },
    recipient: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
