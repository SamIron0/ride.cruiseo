import React, { createContext, useContext, useState } from 'react';

const PriceContext = createContext("0");

export function PriceProvider({ children }) {
  const [price, setPrice] = useState('');

  const updatePrice = (newPrice) => {
    setPrice(newPrice);
  };

  return (
    <PriceContext.Provider value={{ price, updatePrice }}>
      {children}
    </PriceContext.Provider>
  );
}

export const usePrice = () => {
  return useContext(PriceContext);
};
