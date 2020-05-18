import { ADD_TO_CART } from '../actions/cart';
import CartItem from '../../models/cart-item';

const initialState = {
  itemsInCart: {},
  total: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.addedProduct;
      const productId = addedProduct.id;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;

      let cartItem;

      if (state.itemsInCart[productId]) {
        // item is already in cart
        cartItem = newCartItem(
          state.itemsInCart[productId].quantity + 1,
          productPrice,
          productTitle,
          state.itemsInCart[productId].sum + productPrice
        );
      } else {
        // add item to cart
        cartItem = new CartItem(1, productPrice, productTitle, productPrice);
      }
      return {
        ...state,
        itemsInCart: { ...state.itemsInCart, [productId]: cartItem },
        total: state.total + productPrice,
      };

    default:
      return state;
  }
};
