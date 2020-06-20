import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { auth } from "../../firebase/firebase.utils";

import CartIcon from "../cart-icon/cart-icon.components";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import "./header.styles.scss";
import CartDropDown from "../cart-dropdown/cart-dropdown.component";

const Header = ({ currentUser }) => {
  return (
    <div className="header">
      {/* <div>
        <div>hello world</div>
        <div ref={myRef}>hello world 2222</div>
      </div> */}

      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/shop">
          CONTACT
        </Link>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            Sign In
          </Link>
        )}

        <CartIcon />
      </div>
      <CartDropDown />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(Header);
