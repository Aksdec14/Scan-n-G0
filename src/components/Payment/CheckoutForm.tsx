import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Clock } from 'lucide-react';
import { useTray } from '../../context/TrayContext';
import { toast } from 'react-toastify';
import axios from 'axios';

interface CheckoutFormProps {
  onSuccess?: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('asap');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const { trayItems, getTotalPrice, clearTray } = useTray();
  const navigate = useNavigate();

  // Get the current date and format it for the min attribute
  const now = new Date();
  const nextHour = new Date(now.getTime() + 60 * 60 * 1000);
  nextHour.setMinutes(0);
  const [minTime, setMinTime] = useState(() => {
    return nextHour.toISOString().slice(0, 16);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (trayItems.length === 0) {
      toast.error('Your tray is empty!');
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulating a payment processing
      setTimeout(() => {
        // Simulate a successful checkout process
        clearTray();
        if (onSuccess) {
          onSuccess();
        }
        navigate('/success');
      }, 2000);
      
      // In a real app, we would process payment here:
      // const { data } = await axios.post('/api/orders', {
      //   items: trayItems,
      //   total: getTotalPrice(),
      //   email,
      //   name,
      //   phone,
      //   pickupTime: pickupTime === 'asap' ? 'ASAP' : pickupTime,
      //   specialInstructions
      // });
      
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          required
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Pickup Time
        </label>
        <div className="flex gap-4 mt-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="pickupTime"
              value="asap"
              checked={pickupTime === 'asap'}
              onChange={() => setPickupTime('asap')}
              className="mr-2"
            />
            <span className="text-sm">As soon as possible</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="pickupTime"
              value="scheduled"
              checked={pickupTime !== 'asap'}
              onChange={() => setPickupTime(minTime)}
              className="mr-2"
            />
            <span className="text-sm">Schedule for later</span>
          </label>
        </div>
        
        {pickupTime !== 'asap' && (
          <div className="mt-3">
            <input
              type="datetime-local"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              min={minTime}
              className="input"
            />
          </div>
        )}
      </div>
      
      <div>
        <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-1">
          Special Instructions (optional)
        </label>
        <textarea
          id="specialInstructions"
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          className="input"
          rows={3}
        ></textarea>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <CreditCard className="mr-2 text-gray-500" size={20} />
          Payment Information
        </h3>
        
        <p className="text-sm text-green-600 bg-green-50 p-3 rounded">
          For this demo, no actual payment will be processed. Just click "Place Order" to complete the checkout flow.
        </p>
        
        <div className="mt-4">
          <button
            type="submit"
            className="btn btn-primary w-full py-3 justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <Clock size={20} className="animate-spin mr-2" />
                Processing...
              </>
            ) : (
              `Place Order - $${getTotalPrice().toFixed(2)}`
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;