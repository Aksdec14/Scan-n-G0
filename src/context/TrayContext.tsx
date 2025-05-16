import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  nutritionTags: string[];
  imageURL: string;
  countInStock?: number;
}

export interface TrayItem extends MenuItem {
  quantity: number;
}

interface TrayContextType {
  trayItems: TrayItem[];
  addToTray: (item: MenuItem, quantity: number) => void;
  removeFromTray: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  clearTray: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getTotalCalories: () => number;
}

const TrayContext = createContext<TrayContextType | undefined>(undefined);

export const useTray = () => {
  const context = useContext(TrayContext);
  if (!context) {
    throw new Error('useTray must be used within a TrayProvider');
  }
  return context;
};

interface TrayProviderProps {
  children: ReactNode;
}

export const TrayProvider: React.FC<TrayProviderProps> = ({ children }) => {
  const [trayItems, setTrayItems] = useState<TrayItem[]>(() => {
    const storedTray = localStorage.getItem('tray');
    return storedTray ? JSON.parse(storedTray) : [];
  });

  useEffect(() => {
    localStorage.setItem('tray', JSON.stringify(trayItems));
  }, [trayItems]);

  const addToTray = (item: MenuItem, quantity: number) => {
    setTrayItems(prev => {
      const existingItem = prev.find(i => i._id === item._id);
      
      if (existingItem) {
        return prev.map(i => 
          i._id === item._id 
            ? { ...i, quantity: i.quantity + quantity } 
            : i
        );
      } else {
        return [...prev, { ...item, quantity }];
      }
    });
  };

  const removeFromTray = (itemId: string) => {
    setTrayItems(prev => prev.filter(item => item._id !== itemId));
  };

  const updateItemQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromTray(itemId);
      return;
    }
    
    setTrayItems(prev => 
      prev.map(item => 
        item._id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearTray = () => {
    setTrayItems([]);
  };

  const getTotalPrice = () => {
    return trayItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return trayItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalCalories = () => {
    return trayItems.reduce((total, item) => total + (item.calories * item.quantity), 0);
  };

  return (
    <TrayContext.Provider value={{
      trayItems,
      addToTray,
      removeFromTray,
      updateItemQuantity,
      clearTray,
      getTotalPrice,
      getTotalItems,
      getTotalCalories
    }}>
      {children}
    </TrayContext.Provider>
  );
};