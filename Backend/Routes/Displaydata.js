const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        // Assuming global.food_items and global.food_category are populated correctly
        const responseData = [global.food_items, global.food_category];
        res.json(responseData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
