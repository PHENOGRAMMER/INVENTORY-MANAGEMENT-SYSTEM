const Item = require('../models/item'); // Ensure correct model import

exports.getReport = async (req, res) => {
  try {
    const { floor, room } = req.query;

    // Build filter object dynamically
    const filter = {};
    if (floor) filter['location.floor'] = floor;
    if (room) filter['location.room'] = room;

    console.log('Filter applied:', filter); // Debugging filter

    // Aggregate items grouped by name and preserve necessary fields
    const report = await Item.aggregate([
      { $match: filter }, // Apply filters dynamically
      {
        $group: {
          _id: {
            name: '$name', // Group by item name
            category: '$category', // Include category in group
            floor: { $substr: ['$location.room', 0, 1] }, // Get floor from the room number
            room: '$location.room', // Preserve room information
          },
          totalQuantity: { $sum: '$quantity' },
          latestTransaction: { $max: '$date' }, // Get the latest date
        },
      },
      {
        $project: {
          _id: 0, // Exclude the original _id
          name: '$_id.name', // Extract name
          category: '$_id.category', // Extract category
          floor: { $ifNull: ['$_id.floor', 'N/A'] }, // Floor from room number, default to 'N/A'
          room: { $ifNull: ['$_id.room', 'N/A'] }, // Room number, default to 'N/A'
          totalQuantity: 1,
          itemCount: '$totalQuantity', // Change itemCount to reflect totalQuantity
          latestTransaction: {
            $dateToString: { format: '%Y-%m-%d', date: '$latestTransaction' }, // Format the date
          },
        },
      },
    ]);

    console.log('Report Generated:', report); // Debugging report

    if (!report || report.length === 0) {
      console.warn('No items found for the given filters.');
      return res.status(404).json({ message: 'No items found' });
    }

    res.status(200).json({ report });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ message: 'Failed to generate report' });
  }
};
