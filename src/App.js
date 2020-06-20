import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shoppage/shop.component";
import SignInAndSignUp from "./pages/sign-in-sign-up/sign-in-sign-up.component";
import Header from "./components/header/header.component";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      console.log("userAuth", userAuth);
      if (userAuth) {
        // setCurrentUser(userAuth);

        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapshot) => {
          // console.log(snapshot.data());
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } else {
        setCurrentUser({ currentUser: null });
      }
    });
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    this.unsubscribeFromAuth();
  }

  render() {
    console.log("app render", this.state);
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(App);
