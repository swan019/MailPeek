const express = require('express');
const mongoose = require('mongoose');
const emailRoutes = require('./routes/emailRoutes');
const trackingRoutes = require('./routes/trackingRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connection successful!');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Routes

app.get('/', (req, res) => {
    res.send('CORS is enabled!');
});

app.use('/email', emailRoutes);
app.use('/track', trackingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
