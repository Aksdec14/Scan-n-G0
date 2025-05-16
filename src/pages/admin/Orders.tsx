import React, { useState } from 'react';
import { Search, Filter, Clock, Check, X } from 'lucide-react';
import PageContainer from '../../components/Layout/PageContainer';

// Mock data
const mockOrders = [
  {
    id: 'SCN-392854',
    customer: 'John Smith',
    email: 'john@example.com',
    total: 24.99,
    status: 'completed',
    date: '2023-07-01T10:30:00',
    items: [
      { name: 'Grilled Chicken Salad', quantity: 2, price: 8.99 },
      { name: 'Classic Cheeseburger', quantity: 1, price: 9.99 }
    ]
  },
  {
    id: 'SCN-392853',
    customer: 'Emma Johnson',
    email: 'emma@example.com',
    total: 18.50,
    status: 'preparing',
    date: '2023-07-01T11:15:00',
    items: [
      { name: 'Vegetable Stir Fry', quantity: 1, price: 7.99 },
      { name: 'Caesar Salad', quantity: 1, price: 6.99 },
      { name: 'Iced Tea', quantity: 1, price: 3.49 }
    ]
  },
  {
    id: 'SCN-392852',
    customer: 'Michael Brown',
    email: 'michael@example.com',
    total: 32.75,
    status: 'ready',
    date: '2023-07-01T09:45:00',
    items: [
      { name: 'Pasta Primavera', quantity: 2, price: 8.49 },
      { name: 'Caesar Salad', quantity: 1, price: 6.99 },
      { name: 'Sparkling Water', quantity: 2, price: 2.99 }
    ]
  },
  {
    id: 'SCN-392851',
    customer: 'Sarah Wilson',
    email: 'sarah@example.com',
    total: 15.25,
    status: 'completed',
    date: '2023-07-01T08:30:00',
    items: [
      { name: 'Classic Cheeseburger', quantity: 1, price: 9.99 },
      { name: 'French Fries', quantity: 1, price: 3.49 },
      { name: 'Soda', quantity: 1, price: 1.99 }
    ]
  },
  {
    id: 'SCN-392850',
    customer: 'David Lee',
    email: 'david@example.com',
    total: 27.97,
    status: 'cancelled',
    date: '2023-07-01T12:15:00',
    items: [
      { name: 'Grilled Chicken Salad', quantity: 3, price: 8.99 }
    ]
  }
];

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const toggleExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>;
      case 'preparing':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Preparing</span>;
      case 'ready':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Ready</span>;
      case 'cancelled':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Cancelled</span>;
      default:
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Unknown</span>;
    }
  };

  return (
    <PageContainer title="Order Management">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <p className="text-gray-600 mb-4 md:mb-0">
            View and manage all customer orders
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input pl-10 appearance-none"
              >
                <option value="all">All Status</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <React.Fragment key={order.id}>
                    <tr 
                      className={`hover:bg-gray-50 cursor-pointer ${expandedOrder === order.id ? 'bg-gray-50' : ''}`}
                      onClick={() => toggleExpand(order.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.customer}</div>
                        <div className="text-xs text-gray-500">{order.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(order.id);
                          }}
                        >
                          {expandedOrder === order.id ? 'Hide' : 'View'}
                        </button>
                      </td>
                    </tr>
                    
                    {expandedOrder === order.id && (
                      <tr className="bg-gray-50">
                        <td colSpan={6} className="px-6 py-4">
                          <div className="border-t border-gray-200 pt-4">
                            <h4 className="text-lg font-medium mb-3">Order Items</h4>
                            <div className="space-y-2">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between">
                                  <div>
                                    <span className="font-medium">{item.name}</span>
                                    <span className="text-gray-500 ml-2">x{item.quantity}</span>
                                  </div>
                                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                              <div className="font-medium">Total</div>
                              <div className="font-medium">${order.total.toFixed(2)}</div>
                            </div>
                            
                            <div className="mt-6">
                              <h4 className="text-lg font-medium mb-3">Update Status</h4>
                              <div className="flex space-x-2">
                                {order.status !== 'preparing' && (
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleStatusChange(order.id, 'preparing');
                                    }}
                                    className="btn btn-outline text-sm px-3 py-1 flex items-center"
                                  >
                                    <Clock size={16} className="mr-1 text-yellow-500" />
                                    Preparing
                                  </button>
                                )}
                                
                                {order.status !== 'ready' && (
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleStatusChange(order.id, 'ready');
                                    }}
                                    className="btn btn-outline text-sm px-3 py-1 flex items-center"
                                  >
                                    <Check size={16} className="mr-1 text-blue-500" />
                                    Ready
                                  </button>
                                )}
                                
                                {order.status !== 'completed' && (
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleStatusChange(order.id, 'completed');
                                    }}
                                    className="btn btn-outline text-sm px-3 py-1 flex items-center"
                                  >
                                    <Check size={16} className="mr-1 text-green-500" />
                                    Completed
                                  </button>
                                )}
                                
                                {order.status !== 'cancelled' && (
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleStatusChange(order.id, 'cancelled');
                                    }}
                                    className="btn btn-outline text-sm px-3 py-1 flex items-center"
                                  >
                                    <X size={16} className="mr-1 text-red-500" />
                                    Cancel
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No orders match your search</p>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default AdminOrders;