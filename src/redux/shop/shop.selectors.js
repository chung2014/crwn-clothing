import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectShopCollections = createSelector([selectShop], (shop) => {
  return shop.collections;
});

export const selectCollectionForPreview = createSelector(
  [selectShopCollections],
  (collections) => {
    return collections
      ? Object.keys(collections).map((key) => collections[key])
      : [];
  }
);

export const selectCollection = (collectionUrlParam) => {
  return createSelector([selectShopCollections], (collections) => {
    return collections ? collections[collectionUrlParam] : null;
  });
};

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);
