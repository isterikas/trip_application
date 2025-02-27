import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { URL } from "../lib/constants";

export interface Item {
  id: number;
  name: string;
  category: string;
  image: string;
  duration: string;
  price: number;
  available: boolean;
  rating: number;
}

interface ItemContextType {
  items: Item[];
  loading: boolean;
  error: string | null;
  setItems: Function;
}

export const ItemContext = createContext<ItemContextType | undefined>(
  undefined
);

export function ItemProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${URL}/api/trips`);
        setItems(response.data);
      } catch (err) {
        setError("Failed to fetch items");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <ItemContext.Provider value={{ items, loading, error, setItems }}>
      {children}
    </ItemContext.Provider>
  );
}

export const useItemContext = () => {
  const context = React.useContext(ItemContext);
  if (!context) {
    throw new Error("useItemContext must be used within an ItemProvider");
  }
  return context;
};
