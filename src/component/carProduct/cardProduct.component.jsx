import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Image } from "semantic-ui-react";
import { RemoveItem, ReplenItem } from "../../redux/vending/vending.reducer";
import { getWalletFromRedux } from "../../redux/vending/vending.selector";
import "./carProduct.styles.css";

const CardProduct = ({ description, title, price, quantity, id, image }) => {
  const dispatch = useDispatch();
  const walletFromRedux = useSelector(getWalletFromRedux);

  const handleSelection = (id, price) => (event) => {
    if (walletFromRedux - price < 0) {
      return alert("Sorry, not enough money. Please add some funds");
    }
    dispatch(RemoveItem(id));
  };

  const handleReplen = (id) => (event) => {
    dispatch(ReplenItem(id));

    alert("Nice, item in stock again");
  };

  return (
    <Card className="card">
      <Image src={image} />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta> Price $ {price}</Card.Meta>
        <Card.Description>{description}</Card.Description>
        <Card.Content extra>
          {quantity > 0 ? (
            <div>In stock ({quantity}) </div>
          ) : (
            <div style={{ color: "red" }}>Out of stock, sorry </div>
          )}
          <Button
            color="green"
            content="Select"
            onClick={handleSelection(id, price)}
            disabled={quantity <= 0}
          />
          {quantity <= 0 && (
            <Button
              color="yellow"
              floated="right"
              content="Replen"
              onClick={handleReplen(id)}
            />
          )}
        </Card.Content>
      </Card.Content>
    </Card>
  );
};
export default CardProduct;
