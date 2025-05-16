import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { TrayItem as TrayItemType, useTray } from '../../context/TrayContext';

interface TrayItemProps {
  item: TrayItemType;
}

const TrayItem: React.FC<TrayItemProps> = ({ item }) => {
  const { updateItemQuantity, removeFromTray } = useTray();
  const { _id, name, price, quantity, calories, imageURL } = item;

  const handleIncrement = () => {
    updateItemQuantity(_id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateItemQuantity(_id, quantity - 1);
    } else {
      removeFromTray(_id);
    }
  };

  const handleRemove = () => {
    removeFromTray(_id);
  };

  return (
    <div className="flex border-b border-gray-200 py-4 relative slide-up">
      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
        <img 
          src={imageURL} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <div className="flex justify-between">
          <h3 className="font-medium">{name}</h3>
          <span className="font-medium text-green-600">
            ${(price * quantity).toFixed(2)}
          </span>
        </div>
        
        <p className="text-gray-500 text-sm">{calories} cal per item</p>
        
        <div className="flex items-center mt-2 justify-between">
          <div className="flex items-center">
            <button 
              onClick={handleDecrement}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            
            <span className="mx-3 w-6 text-center">{quantity}</span>
            
            <button 
              onClick={handleIncrement}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button 
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 transition-colors"
            aria-label="Remove item"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrayItem;