import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { URL } from "../lib/constants";

// Define item type interface
interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

// Define context type
interface ItemContextType {
  items: Item[];
  loading: boolean;
  error: string | null;
}

// Create context with default values
export const ItemContext = createContext<ItemContextType | undefined>(undefined);

// Create provider component
export const ItemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${URL}/api/trips`);;
        
        setItems(response.data)
        console.log(response.data);
        ;
      } catch (err) {
        setError("Failed to fetch items");
        console.log(err);
        
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <ItemContext.Provider value={{ items, loading, error }}>
      {children}
    </ItemContext.Provider>
  );
};

// Custom hook to use context
export const useItemContext = () => {
  const context = React.useContext(ItemContext);
  if (!context) {
    throw new Error("useItemContext must be used within an ItemProvider");
  }
  return context;
};