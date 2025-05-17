const express = require('express');
const router = express.Router();
const { Order, validateCreateOrder, validateUpdateOrder } = require('../Models/OrderModel');

// Create Order
router.post('/', async (req, res) => {
    const { error } = validateCreateOrder(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).send(order);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating order');
    }
});


// Get All Orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('items.product', 'name image new_price old_price')
            .populate('user', 'name email');
        res.send(orders);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching orders');
    }
});

// Get Order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('items.product', 'name image new_price old_price')
            .populate('user', 'name email');
        if (!order) return res.status(404).send('Order not found');
        res.send(order);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving order');
    }
});

// Update Order 
router.put('/:id', async (req, res) => {
    const { error } = validateUpdateOrder(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!updatedOrder) return res.status(404).send('Order not found');
        res.send(updatedOrder);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating order');
    }
});


// Delete Order
router.delete('/:id', async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).send('Order not found');
        res.send({ message: 'Order deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting order');
    }
});

module.exports = router;
