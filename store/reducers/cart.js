import { ADD_TO_CART } from '../actions/cart';
import CartItem from '../../models/cart-item';

const initialState = {
  items: {},
  total: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productId = addedProduct.id;
      const productPrice = addedProduct.price;
      const productName = addedProduct.title;

      let cartItem;

      if (state.items[productId]) {
        // item is already in cart
        cartItem = new CartItem(
          state.items[productId].quantity + 1,
          productPrice,
          productName,
          state.items[productId].sum + productPrice
        );
      } else {
        // add item to cart
        cartItem = new CartItem(1, productPrice, productName, productPrice);
      }
      return {
        ...state,
        items: { ...state.items, [productId]: cartItem },
        total: state.total + productPrice,
      };
  }
  return state;
};
