import React from 'react';
import MenuItem from './MenuItem';
import { useTray, MenuItem as MenuItemType } from '../../context/TrayContext';
import { toast } from 'react-toastify';

interface MenuListProps {
  items: MenuItemType[];
  layout?: 'grid' | 'list';
}

const MenuList: React.FC<MenuListProps> = ({ items, layout = 'grid' }) => {
  const { addToTray } = useTray();

  const handleAddToTray = (item: MenuItemType) => {
    addToTray(item, 1);
    toast.success(`${item.name} added to tray!`);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No menu items available</p>
      </div>
    );
  }

  return (
    <div className={
      layout === 'grid' 
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
        : "space-y-4"
    }>
      {items.map(item => (
        <MenuItem 
          key={item._id} 
          item={item} 
          compact={layout === 'list'}
          onAddToTray={() => handleAddToTray(item)}
        />
      ))}
    </div>
  );
};

export default MenuList;