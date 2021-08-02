import { vendingActionTypes } from "./vendingActionsType";

const INITIAL_VALUE = {
  products: [],
  totalSales: 0,
  wallet: 10,
};

const vendingReducer = (state = INITIAL_VALUE, { type, payload }) => {
  switch (type) {
    case vendingActionTypes.GET_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    case vendingActionTypes.CLEAR_PRODUCTS:
      return {
        ...state,
        products: [],
      };
    case vendingActionTypes.REMOVE_ITEM_FROM_STOCK:
      return {
        ...state,
        products: removeItem(state.products, payload),
        totalSales: computeSale(state.products, payload, state.totalSales),
        wallet: deductFromWallet(state.products, payload, state.wallet),
      };
    case vendingActionTypes.ADD_FUNDS:
      return {
        ...state,
        wallet: addFundsToWallet(state.wallet, payload),
      };

    case vendingActionTypes.REPLEN_ITEM:
      return {
        ...state,
        products: replenItem(state.products, payload),
      };

    default:
      return state;
  }
};

export default vendingReducer;

const replenItem = (products, id) => {
  return products.map((product) =>
    product.id === id
      ? { ...product, quantity: (product.quantity = 15) }
      : product
  );
};

const deductFromWallet = (products, id, walletState) => {
  const findProduct = products.find((product) => product.id === id);
  if (findProduct.quantity <= 0) {
    return "Product needs replenishing";
  }
  const wallet = walletState - findProduct.price;
  return wallet;
};

const addFundsToWallet = (walletState, value) => {
  const wallet = walletState + value;

  return wallet;
};

const computeSale = (products, id, totalSales) => {
  const findProduct = products.find((product) => product.id === id);
  if (findProduct.quantity <= 0) {
    return "Product needs replenishing";
  }
  const total = totalSales + findProduct.price;
  return total;
};

const removeItem = (products, id) => {
  const findProduct = products.find((product) => product.id === id);

  if (findProduct.quantity <= 0) {
    return "Product needs replenishing";
  }

  return products.map((product) =>
    product.id === id ? { ...product, quantity: product.quantity - 1 } : product
  );
};

export const AddFundsToWallet = (value) => async (dispatch) => {
  dispatch({ type: vendingActionTypes.ADD_FUNDS, payload: value });
};

export const RemoveItem = (id) => async (dispatch) => {
  dispatch({ type: vendingActionTypes.REMOVE_ITEM_FROM_STOCK, payload: id });
};

export const ReplenItem = (id) => async (dispatch) => {
  dispatch({ type: vendingActionTypes.REPLEN_ITEM, payload: id });
};
