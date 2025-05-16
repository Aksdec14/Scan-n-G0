import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  calories: { type: Number, required: true },
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem',
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  orderItems: [orderItemSchema],
  contactInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalCalories: {
    type: Number,
    required: true,
    default: 0
  },
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String }
  },
  status: {
    type: String,
    required: true,
    default: 'preparing',
    enum: ['preparing', 'ready', 'completed', 'cancelled']
  },
  pickupTime: {
    type: Date
  },
  specialInstructions: {
    type: String
  },
  feedback: {
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String }
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;