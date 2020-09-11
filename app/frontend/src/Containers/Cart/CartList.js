import React from "react";
import CartItem from "./CartItem";

export default function CartList({ value }) {
  const { cart } = value;

  return (
    <div className="container-fluid">
      {cart.map((item) => {
        return <CartItem key={item.productID} item={item} value={value} />;
      })}
    </div>
  );
}
