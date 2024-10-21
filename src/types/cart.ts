import type { Product } from './product';

export type ProductInCart = Product & { quantityInCart: number };

export type ICartState = {
  products: ProductInCart[];
};

export type CartContextValue = ICartState & {
  canReset: boolean;
  onReset: () => void;
  onUpdate: (updateValue: Partial<ICartState>) => void;
  onUpdateField: (name: keyof ICartState, updateValue: ICartState[keyof ICartState]) => void;
  //
  onAddToCart: (newItem: Product) => void;
  onDeleteCart: (itemId: any) => void;
  isInCart: (id: any) => Boolean;
  onChangeAmount: (id: any, amount: number) => void;
};
