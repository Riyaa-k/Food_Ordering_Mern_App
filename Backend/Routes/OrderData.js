const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    //let orderDate = req.body.order_date;
    const orderDate = new Date().toDateString(); 
    data.unshift({ Order_date: orderDate });

    // Add the order date as the first element of the data array
    //data.unshift({ Order_date: orderDate });

    let email = req.body.email;

    // Check if the user's order already exists in the database
    let existingOrder = await Order.findOne({ 'email': email });

    try {
        if (!existingOrder) {
            // If the order doesn't exist, create a new document for the user
            await Order.create({
                email: email,
                order_data: data
            });
        } else {
            // If the order exists, update the order_data array
            await Order.findOneAndUpdate(
                { email: email },
                { $push: { order_data: data } }
            );
        }
        //


        res.json({ success: true });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

router.post('/myorderData', async (req, res) => {
    try {
        let myData = await Order.findOne({ 'email': req.body.email });
        res.json({ orderData: myData });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;


