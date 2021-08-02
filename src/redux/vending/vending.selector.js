import { createSelector } from "reselect";

const wallet = (state) => state.vending;

export const getWalletFromRedux = createSelector(
  [wallet],
  (vending) => vending.wallet
);

export const getProductsFromRedux = createSelector(
  [wallet],
  (vending) => vending.products
);
