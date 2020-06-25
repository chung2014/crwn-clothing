import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectShopCollections = createSelector([selectShop], (shop) => {
  return shop.collections;
});

export const selectCollectionForPreview = createSelector(
  [selectShopCollections],
  (collections) => {
    return Object.keys(collections).map((key) => collections[key]);
  }
);

export const selectCollection = (collectionUrlParam) => {
  return createSelector([selectShopCollections], (collections) => {
    return collections[collectionUrlParam];
  });
};