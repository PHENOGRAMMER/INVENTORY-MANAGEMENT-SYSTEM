const Item = require('../models/item');

// Get all items or filter by year and month
const getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error });
    }
};

//Add a new item
const addItem = async (req, res) => {
    const { name, category, quantity, location, date } = req.body;
    const newItem = new Item({ name, category, quantity, location, date });

    try {
        await newItem.save();
        res.status(201).json({ message: 'Item added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item', error });
    }
};


// Delete an item
const deleteItem = async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error });
    }
};

// Move an item to another room
const moveItem = async (req, res) => {
    const { id } = req.params;
    const { units, fromRoom, toRoom } = req.body;

    try {
        // Find the item by ID
        const item = await Item.findById(id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Check if the fromRoom matches the item's current room
        if (item.location.room !== fromRoom) {
            return res.status(400).json({ message: 'Invalid room' });
        }

        // Ensure enough quantity is available to move
        if (item.quantity < units) {
            return res.status(400).json({ message: 'Insufficient quantity to move' });
        }

        // Update the quantity and room location
        item.quantity -= units;

        // Clone the item for the new room location (if needed)
        const movedItem = await Item.findOneAndUpdate(
            { name: item.name, 'location.room': toRoom },
            { $inc: { quantity: units }, category: item.category },
            { new: true, upsert: true } // Create if it doesn't exist
        );

        // Save the updated item with the reduced quantity
        await item.save();

        res.status(200).json({ message: 'Item moved successfully', movedItem });
    } catch (error) {
        console.error('Error moving item:', error);
        res.status(500).json({ message: 'Error moving item', error });
    }
};

// Generate Report: Fetch summary data (e.g., total quantity per category)
exports.getReport = async (req, res) => {
    try {
        const report = await Item.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalQuantity: { $sum: "$quantity" },
                    itemCount: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json({ report });
    } catch (error) {
        res.status(500).json({ message: 'Error generating report', error });
    }
};
module.exports = { getItems, addItem, deleteItem, moveItem };

