import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock } from 'lucide-react';
import PageContainer from '../components/Layout/PageContainer';

const SuccessPage: React.FC = () => {
  const [minutesRemaining, setMinutesRemaining] = useState(15);
  
  // Simulate countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setMinutesRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);

  // Generate a random order number
  const orderNumber = React.useMemo(() => {
    return `SCN-${Math.floor(100000 + Math.random() * 900000)}`;
  }, []);

  return (
    <PageContainer>
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-green-500" />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Your order has been received and is being prepared.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-500">Order Number</p>
            <p className="text-xl font-medium">{orderNumber}</p>
          </div>
          
          <div className="flex items-center justify-center mb-8">
            <Clock size={20} className="text-amber-500 mr-2" />
            <p className="text-lg">
              Estimated preparation time: <span className="font-medium">{minutesRemaining} minutes</span>
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-left mb-6">
            <h3 className="font-medium text-green-800 mb-2">Pickup Instructions</h3>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• Proceed to the pickup counter when ready</li>
              <li>• Show your order number at the counter</li>
              <li>• You will receive an email notification when your order is ready</li>
            </ul>
          </div>
          
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </PageContainer>
  );
};

export default SuccessPage;