import React from "react";
import { useSelector } from "react-redux";
import { Message } from "semantic-ui-react";

const SalesInfo = () => {
  const totalSales = useSelector((state) => state.vending.totalSales);

  return (
    <Message info>
      <Message.Header>Sales info</Message.Header>
      <p>Sales in products = $ {totalSales}</p>
    </Message>
  );
};

export default SalesInfo;
