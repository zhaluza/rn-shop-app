import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
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
    case REMOVE_FROM_CART:
      // if there's only one of a certain item in cart:
      // remove the item entirely

      // if the quantity > 1, just decrease the count

      const selectedCartItem = state.items[action.productId];
      const currentQuantity = state.items[actions.productId].quantity;
      let updatedCartItems;
      if (currentQuantity > 1) {
        // decrement item
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productName,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items, [actions.pid]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.productId];
      }
      return {
        ...state,
        items: updatedCartItems,
        total: state.total - selectedCartItem.productPrice,
      };
  }
  return state;
};
