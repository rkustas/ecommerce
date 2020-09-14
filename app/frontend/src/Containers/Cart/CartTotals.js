import React from "react";
import { Link } from "react-router-dom";
import PayPalButton from "./PayPalButton";

export default function CartTotals({ value, history }) {
  const { clearCart } = value;
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
            <Link to="/">
              <button
                className="btn btn-outline-danger text-uppercase mb-3 px-5"
                type="button"
                onClick={() => clearCart()}
              >
                clear cart
              </button>
            </Link>
            <h5>
              <span className="text-title">subtotal :</span>
              <strong>
                ${" "}
                {!localStorage.getItem("products")
                  ? []
                  : JSON.parse(localStorage.getItem("products")).subtotal}
              </strong>
            </h5>
            <h5>
              <span className="text-title">tax :</span>
              <strong>
                ${" "}
                {!localStorage.getItem("products")
                  ? []
                  : JSON.parse(localStorage.getItem("products")).tax}
              </strong>
            </h5>
            <h5>
              <span className="text-title">total :</span>
              <strong>
                ${" "}
                {!localStorage.getItem("products")
                  ? []
                  : JSON.parse(localStorage.getItem("products")).total}
              </strong>
            </h5>
            <PayPalButton
              total={
                !localStorage.getItem("products")
                  ? []
                  : JSON.parse(localStorage.getItem("products")).total
              }
              clearCart={clearCart}
              history={history}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
