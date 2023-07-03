const FoodOrder = require('../models/order');


exports.getOrdersBydelivryId = async (req, res) => {
    try {
        

        // Find all orders with the specified restaurant_id
        const orders = await FoodOrder.find({ delivry_id: userid }).populate('articles')
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
        
        // Find all orders with the status "pending" in the isConfirmed field
        const orders = await FoodOrder.find({ isConfirmed: "confirmed",isConfirmedBydelivry:"confirmed" ,delivry_id: userid }).populate('articles')
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


exports.getPendingOrders = async (req, res) => {
    try {
        
        // Find all orders with the status "pending" in the isConfirmed field
        const orders = await FoodOrder.find({ isConfirmed: "confirmed", isConfirmedBydelivry:"pending" }).populate('articles')
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
        console.log("dfdfdsf",req.params.id);

        // Find the order by its ID
        const order = await FoodOrder.findOne({ _id: orderId });

        // Check if the order exists
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the order is already confirmed
        if (order.isConfirmedBydelivry === 'confirmed') {
            return res.status(400).json({ message: 'Order is already confirmed' });
        }

        // Update the order status to "confirmed"
        order.isConfirmedBydelivry = 'confirmed';
        order.delivry_id = req.userid;
        await order.save();

        res.status(200).json({ message: 'Order confirmed', order });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update order status', error: error.message });
    }
};

// Function to update the order status to "confirmed"
exports.DeliverOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        // Find the order by its ID
        const order = await FoodOrder.findOne({ _id: orderId });

        // Check if the order exists
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the order is already confirmed
        if (order.isConfirmedBydelivry === 'confirmed') {
            if (order.isDelivered === true) {
                return res.status(400).json({ message: 'Order is already Delivred' });
            }
            // Update the order status to "confirmed"
        order.isDelivered = true;
        await order.save();

        res.status(200).json({ message: 'Order Delivred', order });
        }

        
    } catch (error) {
        res.status(500).json({ message: 'Failed to update order status', error: error.message });
    }
};