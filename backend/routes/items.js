const express = require('express');
const getReport  = require('../controllers/itemController');
const router = express.Router();
const itemController = require('../controllers/itemController');
const reportController = require('../controllers/reportController');
const { getItems, addItem, moveItem } = require('../controllers/itemController'); // Ensure the imports are correct

// GET route to fetch all items
router.get('/', getItems);

// POST route to add a new item
router.post('/', addItem);

// GET /api/items/report - Generate report
router.get('/report', reportController.getReport);

//Route to move an item from one room to another
router.put('/:id/move', moveItem);

// CRUD routes for items
router.get('/', itemController.getItems);
router.post('/', itemController.addItem);
router.delete('/:id', itemController.deleteItem);
router.put('/:id/move', itemController.moveItem);

module.exports = router;
