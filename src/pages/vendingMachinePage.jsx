import React, { useEffect } from "react";
import { Container, Grid } from "semantic-ui-react";
import CardProduct from "../component/carProduct/cardProduct.component";
import { MockingData } from "../data/mockingData";
import "./vendingMachinePage.styles.css";

import { useDispatch, useSelector } from "react-redux";
import { vendingActionTypes } from "../redux/vending/vendingActionsType";
import SalesInfo from "../component/salesInfo.component";

import Wallet from "../component/wallet/wallet.component";
import { getProductsFromRedux } from "../redux/vending/vending.selector";

const VendingMachinePage = () => {
  const dispatch = useDispatch();
  const productsFromRedux = useSelector(getProductsFromRedux);

  useEffect(() => {
    const products = MockingData;

    dispatch({ type: vendingActionTypes.GET_PRODUCTS, payload: products });

    return () => {
      dispatch({ type: vendingActionTypes.GET_PRODUCTS, payload: products });
    };
  }, [dispatch]);

  return (
    <Container className="main">
      <div>
        <h2 style={{ verticalAlign: "center", float: "left" }}>
          Vending machine
        </h2>

        <Wallet />
      </div>
      <Grid celled>
        <Grid.Row columns={4}>
          {productsFromRedux &&
            productsFromRedux.map((product) => (
              <Grid.Column key={product.id} className="grid">
                <CardProduct key={product.id} {...product} />
              </Grid.Column>
            ))}
        </Grid.Row>
      </Grid>
      <SalesInfo />
    </Container>
  );
};

export default VendingMachinePage;
