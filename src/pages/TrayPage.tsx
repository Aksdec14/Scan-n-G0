import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import PageContainer from '../components/Layout/PageContainer';
import TrayItem from '../components/Tray/TrayItem';
import TrayPreview from '../components/Tray/TrayPreview';
import { useTray } from '../context/TrayContext';

const TrayPage: React.FC = () => {
  const { trayItems } = useTray();

  return (
    <PageContainer title="Your Tray">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {trayItems.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
                <h2 className="text-xl font-medium mb-2">Your tray is empty</h2>
                <p className="text-gray-600 mb-6">
                  Scan a QR code at any food counter to add items to your tray
                </p>
                <Link to="/scan" className="btn btn-primary inline-block">
                  Scan QR Code
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-medium mb-4">Items in Your Tray</h2>
                
                <div className="divide-y divide-gray-100">
                  {trayItems.map(item => (
                    <TrayItem key={item._id} item={item} />
                  ))}
                </div>
              </div>
            )}
            
            {trayItems.length > 0 && (
              <div className="mt-6 flex justify-between items-center">
                <Link to="/scan" className="text-green-600 hover:text-green-700 font-medium">
                  ← Add More Items
                </Link>
                <Link to="/checkout" className="btn btn-primary">
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </div>
          
          <div>
            <TrayPreview />
            
            {trayItems.length > 0 && (
              <div className="mt-6 bg-white p-5 rounded-lg shadow-md">
                <h3 className="font-medium text-lg mb-4">Nutrition Summary</h3>
                <div className="space-y-3">
                  {trayItems.map(item => (
                    <div key={item._id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} x{item.quantity}
                      </span>
                      <span>{item.calories * item.quantity} cal</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t flex justify-between font-medium">
                    <span>Total Calories</span>
                    <span>{trayItems.reduce((total, item) => total + (item.calories * item.quantity), 0)} cal</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default TrayPage;