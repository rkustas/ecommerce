import React from "react";
import ProductsFilter from "./ProductsFilter";
import ProductsList from "./ProductsList";
import { withProductConsumer } from "../Components/Context";
import Title from "../Components/Title";

function ProductsContainer({ context }) {
  const { products, tempProducts } = context;

  return (
    <>
      <div>
        <Title name="Search" title="Products" />
        <ProductsFilter products={products} />
      </div>
      <Title name="all" title="products" />
      <ProductsList products={tempProducts} />
    </>
  );
}

export default withProductConsumer(ProductsContainer);

// import React from 'react'
// import ProductsFilter from './ProductsFilter';
// import ProductsList from './ProductsList';
// import {ProductConsumer} from '../Components/Context';

// export default function ProductsContainer() {
//     return (
//         <ProductConsumer>
//             { (value) => {
//                 console.log(value);
//                 const {products} = value
//                 return (
//                 <div>
//                     Hello From Rooms Container
//                     <ProductsFilter products={products}/>
//                     <ProductsList products={products}/>
//                 </div>
//                 )
//             }}
//         </ProductConsumer>
//     )
// }
