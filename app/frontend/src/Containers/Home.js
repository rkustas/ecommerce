import React from "react";
import { ProductConsumer } from "../Components/Context";
import Product from './Product';
import Title from '../Components/Title'

export default function Home() {

    return (
      <div className="Home">
        <div className="lander">
          <Title name="our" title="products"/>
          <div className="card-group">
          <ProductConsumer>
            {(value) =>{
              console.log(value)
              return value.products.map(product => {
                return <Product key={product.id} product={product}/>
              })
            }}
          </ProductConsumer>
          </div>
        </div>
      </div>
    );
}