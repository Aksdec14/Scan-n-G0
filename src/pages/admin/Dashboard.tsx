import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, BarChart, Calendar, Utensils, ShoppingBag, User, Clock } from 'lucide-react';
import { Chart, registerables } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import PageContainer from '../../components/Layout/PageContainer';

// Register Chart.js components
Chart.register(...registerables);

const AdminDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState('week');
  
  // Mock data for charts
  const salesData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Sales ($)',
        data: [1200, 1900, 1500, 2000, 2400, 2800, 1800],
        backgroundColor: 'rgba(74, 222, 128, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
        tension: 0.4,
      }
    ]
  };
  
  const popularItemsData = {
    labels: ['Grilled Chicken Salad', 'Vegetable Stir Fry', 'Classic Cheeseburger', 'Pasta Primavera', 'Caesar Salad'],
    datasets: [
      {
        label: 'Orders',
        data: [124, 95, 78, 63, 52],
        backgroundColor: [
          'rgba(74, 222, 128, 0.7)',
          'rgba(99, 102, 241, 0.7)',
          'rgba(251, 191, 36, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(139, 92, 246, 0.7)'
        ],
        borderWidth: 1,
      }
    ]
  };

  return (
    <PageContainer title="Admin Dashboard">
      <div className="container mx-auto px-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <ShoppingBag size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Orders</p>
                <h3 className="text-2xl font-bold">247</h3>
              </div>
            </div>
            <div className="mt-4 text-sm text-green-600">
              ↑ 12% from yesterday
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-indigo-100 rounded-full mr-4">
                <Utensils size={24} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Sales</p>
                <h3 className="text-2xl font-bold">$3,842</h3>
              </div>
            </div>
            <div className="mt-4 text-sm text-indigo-600">
              ↑ 8% from yesterday
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-amber-100 rounded-full mr-4">
                <User size={24} className="text-amber-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Customers</p>
                <h3 className="text-2xl font-bold">159</h3>
              </div>
            </div>
            <div className="mt-4 text-sm text-amber-600">
              ↑ 5% from yesterday
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-full mr-4">
                <Clock size={24} className="text-red-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Avg. Waiting Time</p>
                <h3 className="text-2xl font-bold">12 min</h3>
              </div>
            </div>
            <div className="mt-4 text-sm text-red-600">
              ↓ 3% from yesterday
            </div>
          </div>
        </div>
        
        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Sales Overview</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setDateRange('week')}
                className={`px-3 py-1 text-sm rounded-md ${
                  dateRange === 'week' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                Week
              </button>
              <button 
                onClick={() => setDateRange('month')}
                className={`px-3 py-1 text-sm rounded-md ${
                  dateRange === 'month' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                Month
              </button>
              <button 
                onClick={() => setDateRange('year')}
                className={`px-3 py-1 text-sm rounded-md ${
                  dateRange === 'year' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                Year
              </button>
            </div>
          </div>
          <div className="h-80">
            <Line 
              data={salesData} 
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }} 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Popular Items */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-6">Most Popular Items</h2>
            <div className="h-80">
              <Bar 
                data={popularItemsData} 
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }} 
              />
            </div>
          </div>
          
          {/* Recent Orders */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recent Orders</h2>
              <Link to="/admin/orders" className="text-green-600 hover:text-green-700 text-sm font-medium">
                View All
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      SCN-392854
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      John Smith
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      $24.99
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      SCN-392853
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      Emma Johnson
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      $18.50
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Preparing
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      SCN-392852
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      Michael Brown
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      $32.75
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        Ready
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      SCN-392851
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      Sarah Wilson
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      $15.25
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link 
            to="/admin/menu-items" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-green-100 rounded-full mb-4">
                <Utensils size={24} className="text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Manage Menu</h3>
              <p className="text-gray-500 text-sm">
                Add, edit, or remove menu items
              </p>
            </div>
          </Link>
          
          <Link 
            to="/admin/orders" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-indigo-100 rounded-full mb-4">
                <ShoppingBag size={24} className="text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">View Orders</h3>
              <p className="text-gray-500 text-sm">
                See current and past orders
              </p>
            </div>
          </Link>
          
          <Link 
            to="/admin/reports" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-amber-100 rounded-full mb-4">
                <LineChart size={24} className="text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Reports</h3>
              <p className="text-gray-500 text-sm">
                View and export detailed reports
              </p>
            </div>
          </Link>
          
          <Link 
            to="/admin/settings" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-red-100 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Settings</h3>
              <p className="text-gray-500 text-sm">
                Configure application settings
              </p>
            </div>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
};

export default AdminDashboard;