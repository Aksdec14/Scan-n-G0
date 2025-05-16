import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';
import PageContainer from '../../components/Layout/PageContainer';
import { MenuItem } from '../../context/TrayContext';
import { toast } from 'react-toastify';

// Mock data
const mockItems: MenuItem[] = [
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

const AdminMenuItems: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>(mockItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    calories: 0,
    nutritionTags: [],
    imageURL: '',
    countInStock: 0
  });
  const [newTag, setNewTag] = useState('');
  
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nutritionTags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item._id !== id));
      toast.success('Item deleted successfully');
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      setNewItem(prev => ({
        ...prev,
        nutritionTags: [...(prev.nutritionTags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewItem(prev => ({
      ...prev,
      nutritionTags: prev.nutritionTags?.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItem.name || !newItem.description || !newItem.imageURL) {
      toast.error('Please fill in all required fields');
      return;
    }

    const itemToAdd: MenuItem = {
      _id: Date.now().toString(),
      name: newItem.name || '',
      description: newItem.description || '',
      price: Number(newItem.price) || 0,
      calories: Number(newItem.calories) || 0,
      nutritionTags: newItem.nutritionTags || [],
      imageURL: newItem.imageURL || '',
      countInStock: Number(newItem.countInStock) || 0
    };

    setItems(prev => [...prev, itemToAdd]);
    setShowAddModal(false);
    setNewItem({
      name: '',
      description: '',
      price: 0,
      calories: 0,
      nutritionTags: [],
      imageURL: '',
      countInStock: 0
    });
    toast.success('Item added successfully');
  };

  return (
    <PageContainer title="Manage Menu Items">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <p className="text-gray-600 mb-4 md:mb-0">
            Manage your cafeteria menu items
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <button 
              onClick={() => setShowAddModal(true)} 
              className="btn btn-primary flex items-center"
            >
              <Plus size={18} className="mr-2" />
              Add New Item
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Calories
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tags
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-10 w-10 rounded-full object-cover" src={item.imageURL} alt={item.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{item.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.calories}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {item.nutritionTags.map((tag, index) => (
                          <span key={index} className="badge badge-green text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${
                        (item.countInStock || 0) > 10 
                          ? 'text-green-600' 
                          : (item.countInStock || 0) > 3 
                            ? 'text-amber-600' 
                            : 'text-red-600'
                      }`}>
                        {item.countInStock || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                        aria-label={`Edit ${item.name}`}
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteItem(item._id)}
                        className="text-red-600 hover:text-red-900"
                        aria-label={`Delete ${item.name}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No items match your search</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Add New Menu Item</h2>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={newItem.description}
                    onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                    className="input"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={newItem.price}
                      onChange={(e) => setNewItem(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                      className="input"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Calories *
                    </label>
                    <input
                      type="number"
                      value={newItem.calories}
                      onChange={(e) => setNewItem(prev => ({ ...prev, calories: parseInt(e.target.value) }))}
                      className="input"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    value={newItem.imageURL}
                    onChange={(e) => setNewItem(prev => ({ ...prev, imageURL: e.target.value }))}
                    className="input"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Count
                  </label>
                  <input
                    type="number"
                    value={newItem.countInStock}
                    onChange={(e) => setNewItem(prev => ({ ...prev, countInStock: parseInt(e.target.value) }))}
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nutrition Tags
                  </label>
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={handleAddTag}
                    className="input"
                    placeholder="Type a tag and press Enter"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newItem.nutritionTags?.map((tag, index) => (
                      <span 
                        key={index} 
                        className="badge badge-green flex items-center"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-green-800 hover:text-green-900"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Add Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default AdminMenuItems;