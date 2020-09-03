import React from "react";
import ProductsContainer from "./ProductsContainer";

export default function Home() {
  return (
    <>
      <div className="Home">
        <div id="content">
          <div className="lander">
            <ProductsContainer />
          </div>
        </div>
      </div>
    </>
  );
}
