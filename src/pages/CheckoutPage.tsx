import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/Layout/PageContainer';
import TrayPreview from '../components/Tray/TrayPreview';
import CheckoutForm from '../components/Payment/CheckoutForm';
import { useTray } from '../context/TrayContext';

const CheckoutPage: React.FC = () => {
  const { trayItems } = useTray();
  const navigate = useNavigate();

  // Redirect if cart is empty
  React.useEffect(() => {
    if (trayItems.length === 0) {
      navigate('/tray');
    }
  }, [trayItems, navigate]);

  return (
    <PageContainer title="Checkout">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-medium mb-6">Checkout Information</h2>
              <CheckoutForm />
            </div>
          </div>
          
          <div>
            <TrayPreview showCheckoutButton={false} />
            
            <div className="mt-6 bg-green-50 p-5 rounded-lg border border-green-200">
              <h3 className="font-medium text-green-800 mb-2">Order Info</h3>
              <ul className="space-y-2 text-sm text-green-700">
                <li>• Orders are usually ready within 10-15 minutes</li>
                <li>• You will receive an email notification when ready</li>
                <li>• Payment is secured and processed by Stripe</li>
                <li>• Need help? Contact cafeteria staff</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default CheckoutPage;