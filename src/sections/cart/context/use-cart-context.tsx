import { useContext } from 'react';

import { CartContext } from './cart-provider';

// ----------------------------------------------------------------------

export function useCartContext() {
  const context = useContext(CartContext);

  if (!context) throw new Error('useCartContext must be use inside CartProvider');

  return context;
}
