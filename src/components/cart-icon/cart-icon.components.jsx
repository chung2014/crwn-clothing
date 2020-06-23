import React from "react";

import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";
import { connect } from "react-redux";

function getItemCount(state) {
  console.log("getItemCount");
  return state.cart.cartItems.reduce((acc, val) => acc + val.quantity, 0);
}

const CartIcon = ({ toggleCartHidden, itemCount }) => {
  console.log("[CartIcon] render");
  return (
    <div className="cart-icon" onClick={toggleCartHidden}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("[CartIcon] mapStateToProps");
  return {
    itemCount: selectCartItemsCount(state),
    // itemCount: getItemCount(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCartHidden: () => dispatch(toggleCartHidden()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
