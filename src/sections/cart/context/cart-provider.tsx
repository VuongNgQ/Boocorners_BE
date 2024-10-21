import type { Product } from 'src/types/product';
import type { ICartState, CartContextValue } from 'src/types/cart';

import { useMemo, Suspense, useCallback, createContext } from 'react';

import { useLocalStorage } from 'src/hooks/use-local-storage';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

export const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartConsumer = CartContext.Consumer;

const STORAGE_KEY = 'app-cart';

const initialState: ICartState = {
  products: [],
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function CartProvider({ children }: Props) {
  return (
    <Suspense fallback={<SplashScreen />}>
      <Container>{children}</Container>
    </Suspense>
  );
}

// ----------------------------------------------------------------------

function Container({ children }: Props) {
  const { state, setState, setField, canReset, resetState } = useLocalStorage<ICartState>(
    STORAGE_KEY,
    initialState
  );

  // const updateTotalField = useCallback(() => {
  //   setField('tours', state.tours);
  // }, [setField, state.tours]);

  // useEffect(() => {
  //   const restoredValue = getStorage(STORAGE_KEY);
  //   if (restoredValue) {
  //     updateTotalField();
  //   }
  // }, [updateTotalField]);

  const isInCart = useCallback(
    (id: any) => !!state.products.find((product) => product.id === id),
    [state.products]
  );

  const onChangeAmount = useCallback(
    (id: any, amount: number) => {
      const indexInCart = state.products.findIndex((product) => product.id === id);
      if (indexInCart !== -1) {
        const updatedTours = [...state.products];
        const cartUpdate = updatedTours[indexInCart];
        updatedTours[indexInCart] = {
          ...cartUpdate,
          quantityInCart: amount,
        };
        setField('products', updatedTours);
      }
    },
    [state.products, setField]
  );

  const onAddToCart = useCallback(
    (newProduct: Product) => {
      const indexInCart = state.products.findIndex((product) => product.id === newProduct.id);
      if (indexInCart === -1) {
        const updatedTours = [...state.products, { ...newProduct, quantityInCart: 1 }];
        setField('products', updatedTours);
      } else {
        const updatedTours = [...state.products];
        const cartUpdate = updatedTours[indexInCart];
        updatedTours[indexInCart] = {
          ...cartUpdate,
          quantityInCart: cartUpdate.quantityInCart + 1,
        };
        setField('products', updatedTours);
      }
    },
    [setField, state.products]
  );

  const onDeleteCart = useCallback(
    (itemId: any) => {
      const updatedTours = state.products.filter((item) => item.id !== itemId);

      setField('products', updatedTours);
    },
    [setField, state.products]
  );

  // Reset
  const onReset = useCallback(() => {
    resetState();
  }, [resetState]);

  const memoizedValue = useMemo(
    () => ({
      ...state,
      canReset,
      onReset,
      onUpdate: setState,
      onUpdateField: setField,
      //
      onAddToCart,
      onDeleteCart,
      isInCart,
      onChangeAmount,
    }),
    [
      state,
      onReset,
      canReset,
      setField,
      setState,
      onAddToCart,
      onDeleteCart,
      isInCart,
      onChangeAmount,
    ]
  );

  return <CartContext.Provider value={memoizedValue}>{children}</CartContext.Provider>;
}
