import React from "react";
import { ProductConsumer } from "../Components/Context";
import Product from './Product';
import Aside from './Aside';
import Title from '../Components/Title'
import {ProSidebar, Menu, SubMenu, SidebarContent} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';


export default function Home() {

    return (
      <div className="Home">
          <ProSidebar id="scrollbar" className="bg-dark md">
            {/* {console.log(Category)}; */}
            <Menu iconShape="square">
                <SidebarContent>
                    <SubMenu title="Product Categories">
                      <ProductConsumer>
                          {(value) => {
                            // console.log(value.products);
                            const productsArray = value.products;
                            console.log(productsArray);
                            const result = [];
                            const map = new Map();
                            for (const item of productsArray) {
                              if (!map.has(item.Category)) {
                                map.set(item.Category, true);
                                result.push({
                                  id: item.id,
                                  Category: item.Category
                                })
                              }
                            }
                            // console.log(result);
                            var realCategory = result.filter(function (e) {
                              return e.Category !== "";
                            })
                            
                            // console.log(realCategory);
                            return realCategory.map(product => {
                              return <Aside key={product.id} product={product} />
                            })
                            // return value.products.map(product => {
                            //   return <Aside key={product.id} product={product}/>
                            // })
                          }}
                        </ProductConsumer>
                    </SubMenu>
                </SidebarContent>
            </Menu>
          </ProSidebar>
        <div id="content">
          <div className="lander">
            <Title name="our" title="products"/>
            <div className="card-group">
            <ProductConsumer>
              {(value) =>{
                const filteredProducts = value.products.filterProducts('Medical')
                console.log(filteredProducts);
                // window.addEventListener('load', function () {
                //   const eles = document.getElementsByClassName('pro-item-content');
                //   for ( let i =0; i < eles.length; i++) {
                //     // console.log(eles[i].innerHTML);
                //     eles[i].onclick = myAlert(eles[i].innerHTML);
                //   }
                  

                //   function myAlert(i) {
                //     return function() {
                //     console.log(i);
                //     filteredProducts = value.products.filter(item => item.Category === i)
                //     console.log(filteredProducts);
                    
                //     };
                //   }
                // })
                return value.products.map(product => {
                  return <Product key={product.id} product={product}/>                
                })
              }}
            </ProductConsumer>
            </div>
          </div>
        </div>
      </div>
    );
}