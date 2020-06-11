import React from "react";
import { Switch, Route } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shoppage/shop.component";
import SignInAndSignUp from "./pages/sign-in-sign-up/sign-in-sign-up.component";
import Header from "./components/header/header.component";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapshot) => {
          // console.log(snapshot.data());
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          });
        });
      } else {
        this.setState({ currentUser: null });
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
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
