import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import { AddFundsToWallet } from "../../redux/vending/vending.reducer";
import { getWalletFromRedux } from "../../redux/vending/vending.selector";

const Wallet = () => {
  const walletFromRedux = useSelector(getWalletFromRedux);
  const dispatch = useDispatch();

  const addFunds = () => {
    dispatch(AddFundsToWallet(12));
  };

  return (
    <div>
      (
      <Button animated="vertical" floated="right" color="purple">
        <Button.Content visible>
          <Icon name="dollar" />
          Wallet : {walletFromRedux}
        </Button.Content>
        <Button.Content hidden>That is your limit</Button.Content>
      </Button>
      <Button animated="fade" floated="right" color="blue" onClick={addFunds}>
        <Button.Content visible>
          <Icon name="money bill alternate outline" />
          Click here to add funds
        </Button.Content>
        <Button.Content hidden>It will add $ 12</Button.Content>
      </Button>
    </div>
  );
};

export default Wallet;
