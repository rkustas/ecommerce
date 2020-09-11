import React from "react";
import Product from "./Product";

export default function ProductsList({ products }) {
  if (products.length === 0) {
    return (
      <div className="empty-search">
        <h3>There aren't any products that match your search parameters</h3>
      </div>
    );
  }

  return (
    <section className="productslist">
      <div className="productslist-center">
        {products.map((product) => {
          return <Product key={product.productID} product={product} />;
        })}
      </div>
    </section>
  );
}
