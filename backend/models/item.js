// models/item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    location: {
        floor: { type: String, required: true },
        room: { type: String, required: true }
    },
    date: {type: Date, required: true, default: Date.now},
    transactions: [
        {
            type: String,  // e.g., 'added', 'removed'
            quantity: Number,
            date: { type: Date, default: Date.now}
        }
    ]
});

module.exports = mongoose.model('Item', itemSchema);
