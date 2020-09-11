import React, { Component } from "react";
import { ProductConsumer } from "../Components/Context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "../Components/Button";

export default class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const {
            productID,
            Name,
            Image,
            Price,
            CompanyName,
            CompanyCountry,
            Category,
            BodyLocation,
            CompanyCity,
            inCart,
          } = value.detailData;
          return (
            <div className="container py-5 bg-white">
              {/* title */}
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <h1>{Name}</h1>
                </div>
              </div>
              <hr />
              {/* end title */}
              {/* Product Image */}
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                  <img src={Image} className="h-100 w-100 p-5" alt="product" />
                </div>
                {/* Product Text */}
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize mb-5 align-self-center">
                  {/* <h2 className="mb-5">{Name}</h2> */}
                  <h3 className="text-capitalize font-weight-bold">
                    Manufacturer Detail:
                  </h3>
                  <h4 className="text-title text-uppercase text-muted mb-3">
                    made by :{" "}
                    <span className="text-uppercase">{CompanyName}</span>
                  </h4>
                  <h4 className="text-title text-uppercase text-muted mb-5">
                    made in :{" "}
                    <span className="text-uppercase">
                      {CompanyCity}, {CompanyCountry}
                    </span>
                  </h4>
                  <h4 className="text-blue mb-5 text-uppercase">
                    <strong>
                      Price: <span>$</span>
                      {Price}
                    </strong>
                  </h4>
                  <h4 className="text-capitalize font-weight-bold">
                    some info about the product:
                  </h4>
                  <h5 className="text-title text-muted lead mb-0">
                    Location: {BodyLocation}
                  </h5>
                  <h5 className="text-title text-muted lead">
                    Product Category: {Category}
                  </h5>
                  {/* buttons */}
                  <div>
                    <Link to="/">
                      <ButtonContainer>back to products</ButtonContainer>
                    </Link>
                    <ButtonContainer
                      cart
                      disabled={inCart ? true : false}
                      onClick={() => {
                        value.addToCart(productID);
                        value.openModal(productID);
                      }}
                    >
                      {inCart ? "inCart" : "add to cart"}
                    </ButtonContainer>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}
