import React from "react";
import { connect } from "react-redux";

import { selectCollection } from "../../redux/shop/shop.selectors";

import CollectionItem from "../../components/collection-item/collection-item.component";

import "./collection.styles.scss";

const CollectionPage = (props) => {
  const { match, collection } = props;
  console.log(match);
  console.log(props);
  const { title, items } = collection;
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log("CollectionPage mapStateToProps ownProps", ownProps);
  return {
    collection: selectCollection(ownProps.match.params.collectionId)(state)
  };
};

export default connect(mapStateToProps)(CollectionPage);
