import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Clock, AlertTriangle } from 'lucide-react';
import PageContainer from '../components/Layout/PageContainer';
import MenuList from '../components/Menu/MenuList';
import { MenuItem } from '../context/TrayContext';
import axios from 'axios';

// Mock data (would come from API in production)
const mockFeaturedItems: MenuItem[] = [
  {
    _id: '1',
    name: 'Grilled Chicken Salad',
    description: 'Fresh mixed greens with grilled chicken, cherry tomatoes, cucumber, and balsamic vinaigrette.',
    price: 8.99,
    calories: 320,
    nutritionTags: ['High Protein', 'Low Carb'],
    imageURL: 'https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    _id: '2',
    name: 'Vegetable Stir Fry',
    description: 'Seasonal vegetables stir-fried with tofu in a savory sauce, served with brown rice.',
    price: 7.99,
    calories: 380,
    nutritionTags: ['Vegan', 'Gluten-Free'],
    imageURL: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    _id: '3',
    name: 'Classic Cheeseburger',
    description: 'Angus beef patty with cheddar cheese, lettuce, tomato, and special sauce on a brioche bun.',
    price: 9.99,
    calories: 750,
    nutritionTags: ['High Protein'],
    imageURL: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600',
  }
];

const Home: React.FC = () => {
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>(mockFeaturedItems);
  const [loading, setLoading] = useState(false);
  const [cafeteriaStatus, setCafeteriaStatus] = useState<'open' | 'busy' | 'closed'>('open');
  
  // In a real app, we would fetch data from API
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const { data } = await axios.get('/api/menu/featured');
  //       setFeaturedItems(data);
  //       
  //       const { data: status } = await axios.get('/api/cafeteria/status');
  //       setCafeteriaStatus(status.status);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   
  //   fetchData();
  // }, []);

  return (
    <PageContainer noPadding>
      {/* Hero Section */}
      <section className="h-[70vh] min-h-[500px] bg-gradient-to-r from-green-500 to-green-600 relative flex items-center">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="container mx-auto px-4 z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Skip the Line, <br />
              Scan &amp; Dine
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Contactless cafeteria ordering made simple. Scan, select, and enjoy your meal without the wait.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/scan" className="btn bg-white text-green-600 hover:bg-gray-100 font-semibold">
                Scan QR Code
              </Link>
              <Link to="/#featured" className="btn border border-white text-white hover:bg-white hover:text-green-600 font-semibold">
                Browse Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cafeteria Status */}
      <section className="bg-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock size={20} className="text-gray-600 mr-2" />
              <span className="font-medium">Cafeteria Hours: 7:00 AM - 8:00 PM</span>
            </div>
            <div 
              className={`flex items-center ${
                cafeteriaStatus === 'open' ? 'text-green-600' : 
                cafeteriaStatus === 'busy' ? 'text-amber-500' : 'text-red-500'
              }`}
            >
              {cafeteriaStatus === 'open' ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                  <span className="font-medium">Now Open</span>
                </>
              ) : cafeteriaStatus === 'busy' ? (
                <>
                  <AlertTriangle size={18} className="mr-2" />
                  <span className="font-medium">High Demand</span>
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                  <span className="font-medium">Closed</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Scan QR Code</h3>
              <p className="text-gray-600">
                Scan the QR code placed at food counters to view item details.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                  <circle cx="8" cy="21" r="1"/>
                  <circle cx="19" cy="21" r="1"/>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Add to Digital Tray</h3>
              <p className="text-gray-600">
                Build your meal by adding items to your digital tray.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M8 11h8m-8 4h6"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Pay & Pickup</h3>
              <p className="text-gray-600">
                Complete payment and receive notification when your order is ready.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Items */}
      <section id="featured" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Today's Specials</h2>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <>
              <MenuList items={featuredItems} />
              
              <div className="text-center mt-12">
                <Link to="/scan" className="btn btn-primary">
                  Scan for Full Menu
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Scan-n-Go?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Skip the Queue</h3>
              <p className="text-gray-600">
                No more waiting in long lines. Order from anywhere in the cafeteria.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Nutritional Info</h3>
              <p className="text-gray-600">
                Make informed choices with detailed nutritional information for all items.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Contactless Ordering</h3>
              <p className="text-gray-600">
                Safer, hygienic experience with fully contactless ordering system.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Schedule Ahead</h3>
              <p className="text-gray-600">
                Pre-order your meals and schedule pickup times that work for you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};

export default Home;