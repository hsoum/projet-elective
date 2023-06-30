const FoodOrder = require('../models/order');


exports.getOrdersByRestaurantId = async (req, res) => {
    try {
        const restaurantId = req.params.restaurantId;

        // Find all orders with the specified restaurant_id
        const orders = await FoodOrder.find({ restaurant_id: restaurantId }).populate('articles')
            .populate({
                path: 'menus',
                populate: {
                    path: 'articles',
                    model: 'Article'
                }
            });

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve orders', error: error.message });
    }
};

exports.getConfirmedOrders = async (req, res) => {
    try {
        const restaurantId = req.params.restaurantId;
        // Find all orders with the status "pending" in the isConfirmed field
        const orders = await FoodOrder.find({ isConfirmed: "confirmed", restaurant_id: restaurantId }).populate('articles')
            .populate({
                path: 'menus',
                populate: {
                    path: 'articles',
                    model: 'Article'
                }
            });

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve confirmed orders', error: error.message });
    }
};

exports.getRefusedOrders = async (req, res) => {
    try {
        const restaurantId = req.params.restaurantId;
        // Find all orders with the status "pending" in the isConfirmed field
        const orders = await FoodOrder.find({ isConfirmed: "refused", restaurant_id: restaurantId }).populate('articles')
            .populate({
                path: 'menus',
                populate: {
                    path: 'articles',
                    model: 'Article'
                }
            });

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve refused orders', error: error.message });
    }
};

exports.getPendingOrders = async (req, res) => {
    try {
        const restaurantId = req.params.restaurantId;
        // Find all orders with the status "pending" in the isConfirmed field
        const orders = await FoodOrder.find({ isConfirmed: "pending", restaurant_id: restaurantId }).populate('articles')
            .populate({
                path: 'menus',
                populate: {
                    path: 'articles',
                    model: 'Article'
                }
            });

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve pending orders', error: error.message });
    }
};


// Function to update the order status to "confirmed"
exports.confirmOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        // Find the order by its ID
        const order = await FoodOrder.findOne({ restaurant_id: orderId });

        // Check if the order exists
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the order is already confirmed
        if (order.isConfirmed === 'confirmed') {
            return res.status(400).json({ message: 'Order is already confirmed' });
        }

        // Update the order status to "confirmed"
        order.isConfirmed = 'confirmed';
        await order.save();

        res.status(200).json({ message: 'Order confirmed', order });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update order status', error: error.message });
    }
};

// Function to update the order status to "refused"
exports.refuseOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        // Find the order by its ID
        const order = await FoodOrder.findOne({ restaurant_id: orderId });

        // Check if the order exists
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the order is already confirmed
        if (order.isConfirmed === 'refused') {
            return res.status(400).json({ message: 'Order is already refused' });
        }

        // Update the order status to "refused"
        order.isConfirmed = 'refused';
        await order.save();

        res.status(200).json({ message: 'Order refused', order });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update order status', error: error.message });
    }
};