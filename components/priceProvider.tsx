import React, { createContext, useContext, useState } from 'react';

const PriceContext = createContext(undefined);

export function PriceProvider({ children }) {
  const [price, setPrice] = useState('');

  // Import statements...

const { updatePrice } = usePrice() as { updatePrice: (newPrice: string) => void };

// Rest of your code...


  return (
    <PriceContext.Provider value={{ price, updatePrice }}>
      {children}
    </PriceContext.Provider>
  );
}

export const usePrice = () => {
  return useContext(PriceContext);
};
