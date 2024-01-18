"use client";
// ActiveCategoryContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Destination } from "@/types";
interface ActiveCategoryContextProps {
  children: ReactNode;
}

interface ActiveCategoryContextValue {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  prices: any;
  setPrices: any;
  allListings: Destination[] | undefined;
  setAllListings: any
}

const ActiveCategoryContext = createContext<
  ActiveCategoryContextValue | undefined
>(undefined);

export const ActiveCategoryProvider: React.FC<ActiveCategoryContextProps> = ({
  children,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [prices, setPrices] = useState(new Map<string, number>()); // Initialize with your default value
  const [allListings, setAllListings] = useState<Destination[]>();

  return (
    <ActiveCategoryContext.Provider
      value={{
        activeCategory,
        setActiveCategory,
        prices,
        setPrices,
        allListings,
        setAllListings,
      }}
    >
      {children}
    </ActiveCategoryContext.Provider>
  );
};

export const useActiveCategory = (): ActiveCategoryContextValue => {
  const context = useContext(ActiveCategoryContext);

  if (!context) {
    throw new Error(
      "useActiveCategory must be used within an ActiveCategoryProvider"
    );
  }

  return context;
};
