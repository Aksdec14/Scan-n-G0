import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useTray } from '../../context/TrayContext';

interface TrayPreviewProps {
  showCheckoutButton?: boolean;
}

const TrayPreview: React.FC<TrayPreviewProps> = ({ showCheckoutButton = true }) => {
  const { trayItems, getTotalItems, getTotalPrice, getTotalCalories } = useTray();
  
  if (getTotalItems() === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <ShoppingCart size={32} className="mx-auto text-gray-400 mb-2" />
        <p className="text-gray-500">Your tray is empty</p>
        <Link to="/" className="btn btn-primary mt-4 inline-block">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h3 className="font-medium text-lg border-b pb-2 mb-3">Order Summary</h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Items</span>
          <span>{getTotalItems()}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Total Calories</span>
          <span>{getTotalCalories()} cal</span>
        </div>
        
        <div className="flex justify-between border-t border-dashed border-gray-200 mt-3 pt-3">
          <span className="font-medium">Total</span>
          <span className="font-medium text-green-600">${getTotalPrice().toFixed(2)}</span>
        </div>
      </div>
      
      {showCheckoutButton && (
        <Link 
          to="/checkout" 
          className="btn btn-primary w-full mt-4 justify-center"
        >
          Proceed to Checkout
        </Link>
      )}
    </div>
  );
};

export default TrayPreview;