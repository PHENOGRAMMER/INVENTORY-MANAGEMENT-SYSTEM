const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/item');///////
const cors = require('cors');
const reportRoutes = require('./routes/reportRoutes');

// Routes
const itemRoutes = require('./routes/items');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 5000;

// Use report routes
app.use('/', reportRoutes);

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
// MongoDB connection
mongoose.connect('mongodb://localhost:27017/inventoryDB')
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Routes setup
app.use('/api/items', itemRoutes);
app.use('/api/reports', reportRoutes); 


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// API endpoint to fetch item reports
app.get('/api/reports', async (req, res) => {
    try {
        const items = await Item.find({});
        res.json(items);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});