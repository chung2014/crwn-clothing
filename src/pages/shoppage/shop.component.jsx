import React from "react";
import { Route } from "react-router-dom";

import WithSipnner from "../../components/with-spinner/with-spinner.component";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSipnner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
    //   async (snapshot) => {
    //     // console.log("collectionRef onSnapshot snapshot");
    //     // console.log(snapshot);
    //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //     // console.log("collectionsMap", collectionsMap);
    //     updateCollections(collectionsMap);
    //     this.setState({ loading: false });
    //   }
    // );

    collectionRef.get().then((snapshot) => {
      console.log("collectionRef.get().then snapshot", snapshot);
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    console.log(match);
    return (
      <div className="shop-page">
        <Route
          exact
          path={match.path}
          render={(props) => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCollections: (collectionsMap) =>
      dispatch(updateCollections(collectionsMap))
  };
};

export default connect(null, mapDispatchToProps)(ShopPage);
