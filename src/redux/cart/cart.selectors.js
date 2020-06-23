import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector([selectCart], (cart) => {
  console.log("selectCartItems");
  return cart.cartItems;
});

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) => {
    console.log("selectCartItemsCount");
    return cartItems.reduce((acc, val) => acc + val.quantity, 0);
  }
);