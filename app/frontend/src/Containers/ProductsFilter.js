import React from "react";
import { useContext } from "react";
import { ProductContext } from "../Components/Context";

// get all unique values
const getUnique = (items, value) => {
  return [...new Set(items.map((item) => item[value]))];
};

export default function ProductsFilter({ products }) {
  const context = useContext(ProductContext);
  const {
    handleChange,
    category,
    price,
    minPrice,
    maxPrice,
    bodyLocation,
    companyCountry,
    companyName,
  } = context;
  //  get unique types
  let categories = getUnique(products, "Category");

  //   add all
  categories = ["All", ...categories];

  // Map to jsx
  categories = categories.map((item, index) => {
    return (
      <option value={item} key={index}>
        {item}
      </option>
    );
  });
  // body location
  let bloc = getUnique(products, "BodyLocation");
  bloc = ["All", ...bloc];
  bloc = bloc.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });
  //   company country
  let ccountry = getUnique(products, "CompanyCountry");
  ccountry = ["All", ...ccountry];
  ccountry = ccountry.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });
  //   company name
  let cname = getUnique(products, "CompanyName");
  cname = ["All", ...cname];
  cname = cname.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  return (
    <section>
      <form className="filter-form">
        {/* select type */}
        <div className="form-group">
          <label htmlFor="category">
            Product Category
            <select
              name="category"
              id="category"
              value={category}
              className="form-control"
              onChange={handleChange}
            >
              {categories}
            </select>
          </label>
        </div>
        {/* end select type */}
        {/* bodyLocation */}
        <div className="form-group">
          <label htmlFor="bodyLocation">
            Body Location
            <select
              name="bodyLocation"
              id="bodyLocation"
              value={bodyLocation}
              className="form-control"
              onChange={handleChange}
            >
              {bloc}
            </select>
          </label>
        </div>
        {/* bodyLocation */}
        {/* Product price */}
        <div className="form-group">
          <label htmlFor="price">Product Price ${price}</label>
          <input
            type="range"
            name="price"
            min={minPrice}
            max={maxPrice}
            id="price"
            value={price}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {/* Product price */}
        {/* companyCountry */}
        <div className="form-group">
          <label htmlFor="companyCountry">
            Company Country
            <select
              name="companyCountry"
              id="companyCountry"
              value={companyCountry}
              className="form-control"
              onChange={handleChange}
            >
              {ccountry}
            </select>
          </label>
        </div>
        {/* companyCountry */}
        {/* companyName */}
        <div className="form-group">
          <label htmlFor="companyCountry">
            Company Name
            <select
              name="companyName"
              id="companyName"
              value={companyName}
              className="form-control"
              onChange={handleChange}
            >
              {cname}
            </select>
          </label>
        </div>
        {/* companyName */}
      </form>
    </section>
  );
}
