'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Destination, UserDetails } from '@/types';
interface ListingsContextProps {
  children: ReactNode;
}

interface ListingsContextValue {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  prices: any;
  setPrices: any;
  allListings: Destination[] | undefined;
  setAllListings: any;
  userDetails: UserDetails | undefined;
  setUserDetails: any;
}

const ListingsContext = createContext<ListingsContextValue | undefined>(
  undefined
);

/**
 * Initializes the ListingsProvider component with the provided props.
 *
 * @param {ListingsContextProps} {
 *   children, // The children components
 * }
 * @return {ReactElement} The rendered ListingsProvider component
 */
export const ListingsProvider: React.FC<ListingsContextProps> = ({
  children
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [prices, setPrices] = useState(new Map<string, number>()); // Initialize with your default value
  const [allListings, setAllListings] = useState<Destination[]>();
  const [userDetails, setUserDetails] = useState<UserDetails>();
  return (
    <ListingsContext.Provider
      value={{
        activeCategory,
        setActiveCategory,
        prices,
        setPrices,
        allListings,
        setAllListings,
        userDetails,
        setUserDetails
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
};

export const useListings = (): ListingsContextValue => {
  const context = useContext(ListingsContext);

  if (!context) {
    throw new Error(
      'useListings must be used within an ActiveCategoryProvider'
    );
  }

  return context;
};
