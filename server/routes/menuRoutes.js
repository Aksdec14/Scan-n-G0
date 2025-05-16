import express from 'express';
// import MenuItem from '../models/menuItemModel.js';

const router = express.Router();

// Mock data
const menuItems = [
  {
    _id: '1',
    name: 'Grilled Chicken Salad',
    description: 'Fresh mixed greens with grilled chicken, cherry tomatoes, cucumber, and balsamic vinaigrette.',
    price: 8.99,
    calories: 320,
    nutritionTags: ['High Protein', 'Low Carb'],
    imageURL: 'https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=600',
    countInStock: 15
  },
  {
    _id: '2',
    name: 'Vegetable Stir Fry',
    description: 'Seasonal vegetables stir-fried with tofu in a savory sauce, served with brown rice.',
    price: 7.99,
    calories: 380,
    nutritionTags: ['Vegan', 'Gluten-Free'],
    imageURL: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=600',
    countInStock: 8
  },
  {
    _id: '3',
    name: 'Classic Cheeseburger',
    description: 'Angus beef patty with cheddar cheese, lettuce, tomato, and special sauce on a brioche bun.',
    price: 9.99,
    calories: 750,
    nutritionTags: ['High Protein'],
    imageURL: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600',
    countInStock: 12
  }
];

// @desc    Fetch all menu items
// @route   GET /api/menu
// @access  Public
router.get('/', (req, res) => {
  // With MongoDB:
  // const items = await MenuItem.find({});
  res.json(menuItems);
});

// @desc    Fetch featured menu items
// @route   GET /api/menu/featured
// @access  Public
router.get('/featured', (req, res) => {
  res.json(menuItems);
});

// @desc    Fetch a menu item by ID
// @route   GET /api/menu/item/:id
// @access  Public
router.get('/item/:id', (req, res) => {
  const item = menuItems.find(i => i._id === req.params.id);
  
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// @desc    Create a menu item
// @route   POST /api/menu
// @access  Private/Admin
router.post('/', (req, res) => {
  const {
    name,
    description,
    price,
    calories,
    nutritionTags,
    imageURL,
    countInStock
  } = req.body;
  
  // Mock implementation
  const newItem = {
    _id: Date.now().toString(),
    name,
    description,
    price,
    calories,
    nutritionTags,
    imageURL,
    countInStock
  };
  
  menuItems.push(newItem);
  res.status(201).json(newItem);
});

// @desc    Update a menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin
router.put('/:id', (req, res) => {
  const {
    name,
    description,
    price,
    calories,
    nutritionTags,
    imageURL,
    countInStock
  } = req.body;
  
  const itemIndex = menuItems.findIndex(i => i._id === req.params.id);
  
  if (itemIndex !== -1) {
    const updatedItem = {
      ...menuItems[itemIndex],
      name: name || menuItems[itemIndex].name,
      description: description || menuItems[itemIndex].description,
      price: price || menuItems[itemIndex].price,
      calories: calories || menuItems[itemIndex].calories,
      nutritionTags: nutritionTags || menuItems[itemIndex].nutritionTags,
      imageURL: imageURL || menuItems[itemIndex].imageURL,
      countInStock: countInStock !== undefined ? countInStock : menuItems[itemIndex].countInStock
    };
    
    menuItems[itemIndex] = updatedItem;
    res.json(updatedItem);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// @desc    Delete a menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
router.delete('/:id', (req, res) => {
  const itemIndex = menuItems.findIndex(i => i._id === req.params.id);
  
  if (itemIndex !== -1) {
    menuItems.splice(itemIndex, 1);
    res.json({ message: 'Item removed' });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

export default router;