import express from 'express';
// import Order from '../models/orderModel.js';

const router = express.Router();

// Mock orders data
let orders = [
  {
    _id: '1',
    user: '2',
    orderItems: [
      {
        name: 'Grilled Chicken Salad',
        quantity: 2,
        price: 8.99,
        calories: 320,
        menuItem: '1'
      },
      {
        name: 'Classic Cheeseburger',
        quantity: 1,
        price: 9.99,
        calories: 750,
        menuItem: '3'
      }
    ],
    contactInfo: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890'
    },
    totalPrice: 27.97,
    totalCalories: 1390,
    status: 'completed',
    pickupTime: new Date(),
    createdAt: new Date()
  }
];

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/', (req, res) => {
  const {
    items,
    contactInfo,
    totalPrice,
    pickupTime,
    specialInstructions
  } = req.body;
  
  if (!items || items.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  }
  
  // Calculate total calories
  const totalCalories = items.reduce(
    (total, item) => total + (item.calories * item.quantity),
    0
  );
  
  // Create new order
  const newOrder = {
    _id: Date.now().toString(),
    user: req.headers.authorization?.split(' ')[1] || null, // Mock user extraction
    orderItems: items,
    contactInfo,
    totalPrice,
    totalCalories,
    status: 'preparing',
    pickupTime: pickupTime || new Date(Date.now() + 15 * 60000), // Default 15 minutes
    specialInstructions,
    createdAt: new Date()
  };
  
  orders.push(newOrder);
  
  res.status(201).json(newOrder);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.get('/:id', (req, res) => {
  const order = orders.find(o => o._id === req.params.id);
  
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
router.put('/:id/status', (req, res) => {
  const { status } = req.body;
  const orderIndex = orders.findIndex(o => o._id === req.params.id);
  
  if (orderIndex !== -1) {
    orders[orderIndex].status = status;
    res.json(orders[orderIndex]);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

// @desc    Add order feedback
// @route   POST /api/orders/:id/feedback
// @access  Private
router.post('/:id/feedback', (req, res) => {
  const { rating, comment } = req.body;
  const orderIndex = orders.findIndex(o => o._id === req.params.id);
  
  if (orderIndex !== -1) {
    orders[orderIndex].feedback = { rating, comment };
    res.json(orders[orderIndex]);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

// @desc    Get user orders
// @route   GET /api/orders/myorders
// @access  Private
router.get('/myorders', (req, res) => {
  // Mock user extraction from JWT
  const userId = req.headers.authorization?.split(' ')[1] || '';
  const userOrders = orders.filter(o => o.user === userId);
  
  res.json(userOrders);
});

export default router;