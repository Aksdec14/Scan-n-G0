import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, PlusCircle, MinusCircle, Info, ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';
import PageContainer from '../components/Layout/PageContainer';
import { useTray, MenuItem } from '../context/TrayContext';

// Mock data (would be fetched from API)
const mockMenuItems: Record<string, MenuItem> = {
  '1': {
    _id: '1',
    name: 'Grilled Chicken Salad',
    description: 'Fresh mixed greens with grilled chicken, cherry tomatoes, cucumber, and balsamic vinaigrette.',
    price: 8.99,
    calories: 320,
    nutritionTags: ['High Protein', 'Low Carb'],
    imageURL: 'https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=600',
    countInStock: 15
  },
  '2': {
    _id: '2',
    name: 'Vegetable Stir Fry',
    description: 'Seasonal vegetables stir-fried with tofu in a savory sauce, served with brown rice.',
    price: 7.99,
    calories: 380,
    nutritionTags: ['Vegan', 'Gluten-Free'],
    imageURL: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=600',
    countInStock: 8
  },
  '3': {
    _id: '3',
    name: 'Classic Cheeseburger',
    description: 'Angus beef patty with cheddar cheese, lettuce, tomato, and special sauce on a brioche bun.',
    price: 9.99,
    calories: 750,
    nutritionTags: ['High Protein'],
    imageURL: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600',
    countInStock: 12
  }
};

// Detailed nutritional info
const nutritionDetails = {
  '1': {
    protein: 28,
    carbs: 15,
    fat: 12,
    fiber: 5,
    sodium: 320,
    ingredients: 'Chicken breast, mixed greens, cherry tomatoes, cucumber, red onion, balsamic vinaigrette'
  },
  '2': {
    protein: 15,
    carbs: 45,
    fat: 8,
    fiber: 7,
    sodium: 450,
    ingredients: 'Tofu, broccoli, carrots, bell peppers, snap peas, brown rice, soy sauce, ginger, garlic'
  },
  '3': {
    protein: 35,
    carbs: 48,
    fat: 42,
    fiber: 2,
    sodium: 820,
    ingredients: 'Beef patty, cheddar cheese, lettuce, tomato, onion, brioche bun, special sauce'
  }
};

const MenuItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<MenuItem | null>(null);
  const [showNutrition, setShowNutrition] = useState(false);
  const { addToTray, trayItems } = useTray();
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, we would fetch from API
    // const fetchItem = async () => {
    //   try {
    //     const { data } = await axios.get(`/api/menu/item/${id}`);
    //     setItem(data);
    //   } catch (error) {
    //     toast.error('Error fetching menu item');
    //     navigate('/');
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    
    // Simulate API call
    setTimeout(() => {
      if (id && mockMenuItems[id]) {
        setItem(mockMenuItems[id]);
      } else {
        toast.error('Menu item not found');
        navigate('/');
      }
      setLoading(false);
    }, 500);
  }, [id, navigate]);

  const handleIncrement = () => {
    if (item?.countInStock && quantity < item.countInStock) {
      setQuantity(prev => prev + 1);
    } else {
      toast.info('Maximum available quantity reached');
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToTray = () => {
    if (item) {
      addToTray(item, quantity);
      toast.success(`${quantity} ${item.name} added to your tray`);
      navigate('/tray');
    }
  };

  const existingQuantity = item ? 
    trayItems.find(i => i._id === item._id)?.quantity || 0 : 0;

  const getNutritionInfo = (id: string) => {
    return nutritionDetails[id as keyof typeof nutritionDetails];
  };

  if (loading) {
    return (
      <PageContainer>
        <div className="container mx-auto px-4 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </PageContainer>
    );
  }

  if (!item) {
    return (
      <PageContainer>
        <div className="container mx-auto px-4 text-center py-12">
          <p className="text-gray-500">Item not found</p>
          <button 
            onClick={() => navigate(-1)}
            className="btn btn-primary mt-4"
          >
            Go Back
          </button>
        </div>
      </PageContainer>
    );
  }

  const nutritionInfo = getNutritionInfo(item._id);

  return (
    <PageContainer noPadding>
      <div className="min-h-screen">
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-20 left-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md"
        >
          <ArrowLeft size={20} />
        </button>
        
        {/* Main image */}
        <div className="h-[40vh] min-h-[300px] bg-gray-200">
          <img 
            src={item.imageURL} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 -mt-6">
          <div className="bg-white rounded-t-3xl shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl md:text-3xl font-bold">{item.name}</h1>
              <div className="text-xl font-semibold text-green-600">${item.price.toFixed(2)}</div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {item.nutritionTags.map((tag, index) => (
                <span key={index} className="badge badge-green">{tag}</span>
              ))}
              <span className="badge badge-amber">{item.calories} cal</span>
            </div>
            
            <p className="text-gray-700 mb-6">{item.description}</p>
            
            {/* Nutrition expandable section */}
            <div className="mb-8">
              <button 
                onClick={() => setShowNutrition(!showNutrition)}
                className="flex items-center justify-between w-full py-2 border-t border-b border-gray-200"
              >
                <div className="flex items-center">
                  <Info size={18} className="mr-2 text-gray-500" />
                  <span className="font-medium">Nutrition Information</span>
                </div>
                <span>{showNutrition ? '−' : '+'}</span>
              </button>
              
              {showNutrition && nutritionInfo && (
                <div className="py-4 px-2">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-gray-600 text-sm">Protein</p>
                      <p className="font-medium">{nutritionInfo.protein}g</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Carbs</p>
                      <p className="font-medium">{nutritionInfo.carbs}g</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Fat</p>
                      <p className="font-medium">{nutritionInfo.fat}g</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Fiber</p>
                      <p className="font-medium">{nutritionInfo.fiber}g</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm">Sodium</p>
                    <p className="font-medium">{nutritionInfo.sodium}mg</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-600 text-sm">Ingredients</p>
                    <p className="text-sm">{nutritionInfo.ingredients}</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Quantity selector */}
            <div className="mb-6">
              <p className="text-gray-700 mb-2">Quantity:</p>
              <div className="flex items-center">
                <button 
                  onClick={handleDecrement}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center"
                  disabled={quantity <= 1}
                >
                  <MinusCircle size={20} className={quantity <= 1 ? 'text-gray-300' : 'text-gray-700'} />
                </button>
                
                <span className="mx-4 w-8 text-center font-medium">{quantity}</span>
                
                <button 
                  onClick={handleIncrement}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center"
                  disabled={item.countInStock ? quantity >= item.countInStock : false}
                >
                  <PlusCircle size={20} className={
                    item.countInStock && quantity >= item.countInStock 
                      ? 'text-gray-300' 
                      : 'text-gray-700'
                  } />
                </button>
                
                <span className="ml-4 text-sm text-gray-500">
                  {item.countInStock ? `${item.countInStock} available` : 'In stock'}
                </span>
              </div>
              
              {existingQuantity > 0 && (
                <p className="text-sm text-green-600 mt-2">
                  You already have {existingQuantity} of this item in your tray
                </p>
              )}
            </div>
            
            {/* Add to tray button */}
            <button 
              onClick={handleAddToTray}
              className="btn btn-primary w-full py-3 flex items-center justify-center"
              disabled={!item.countInStock || item.countInStock === 0}
            >
              <ShoppingCart size={20} className="mr-2" />
              Add to Tray
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default MenuItemPage;