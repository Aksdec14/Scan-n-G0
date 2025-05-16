import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Info } from 'lucide-react';
import { MenuItem as MenuItemType } from '../../context/TrayContext';

interface MenuItemProps {
  item: MenuItemType;
  compact?: boolean;
  onAddToTray?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, compact = false, onAddToTray }) => {
  const { _id, name, description, price, calories, nutritionTags, imageURL } = item;

  if (compact) {
    return (
      <div className="card hover:shadow-lg transition-shadow">
        <div className="flex">
          <div className="w-20 h-20 flex-shrink-0">
            <img 
              src={imageURL} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-3 flex-grow">
            <h3 className="font-medium text-gray-800">{name}</h3>
            <div className="flex justify-between mt-1">
              <span className="text-green-600 font-medium">${price.toFixed(2)}</span>
              <span className="text-gray-500 text-sm">{calories} cal</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card hover:shadow-lg transition-shadow overflow-hidden">
      <div className="relative h-48">
        <img 
          src={imageURL} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 rounded-full bg-white px-2 py-1 text-xs font-medium shadow text-green-600">
          ${price.toFixed(2)}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-800 text-lg">{name}</h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {nutritionTags.map((tag, index) => (
            <span key={index} className="badge badge-green">{tag}</span>
          ))}
          <span className="badge badge-amber">{calories} cal</span>
        </div>
        
        <div className="flex mt-4 justify-between">
          <Link 
            to={`/menu/item/${_id}`}
            className="btn btn-outline flex items-center text-sm px-3"
          >
            <Info size={16} className="mr-1" />
            Details
          </Link>
          
          {onAddToTray && (
            <button 
              onClick={onAddToTray}
              className="btn btn-primary flex items-center text-sm px-3"
              aria-label={`Add ${name} to tray`}
            >
              <PlusCircle size={16} className="mr-1" />
              Add to Tray
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;