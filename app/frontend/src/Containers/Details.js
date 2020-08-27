import React, {Component} from 'react';
import {ProductConsumer} from '../Components/Context';
import {Link} from 'react-router-dom';
import { ButtonContainer } from '../Components/Button';

export default class Details extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value) =>{
                    console.log(value)
                    const {id, Name, Image, Price, CompanyName, CompanyCountry, Category, BodyLocation, CompanyCity, inCart } = value.detailData;
                    return (
                        <div className="container py-5">
                            {/* title */}
                            <div className="row">
                            <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                            <h1>{Name}</h1>
                            </div>
                            </div>
                            {/* end title */}
                            {/* Product Image */}
                            <div className="row">
                            <div className="col-10 mx-auto col-md-6 my-3">
                                <img src={Image} className="img-fluid" alt="product"/>
                            </div>
                            {/* Product Text */}
                            <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                <h2>Product: {Name}</h2>
                                <h3>Manufacturer Detail:</h3>
                                <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                    made by : <span className="text-uppercase">
                                        {CompanyName}
                                    </span>
                                </h4>
                                <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                    made in : <span className="text-uppercase">
                                        {CompanyCity}, {CompanyCountry}
                                    </span>
                                </h4>
                                <h4 className="text-blue">
                                    <strong>
                                        Price: <span>$</span>{Price}
                                    </strong>
                                </h4>
                                <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                    some info about the product:
                                </p>
                                <p className="text-muted lead">
                                    Location: {BodyLocation}
                                </p>
                                <p className="text-muted lead">
                                    Product Category: {Category}
                                </p>
                                {/* buttons */}
                                <div>
                                    <Link to='/'>
                                        <ButtonContainer>
                                            back to products
                                        </ButtonContainer>
                                    </Link>
                                    <ButtonContainer 
                                        cart
                                        disabled={inCart ? true : false}
                                        onClick={() => {
                                            value.addToCart(id);
                                            value.openModal(id);
                                     }}>
                                        {inCart ? 'inCart':'add to cart'}
                                    </ButtonContainer>
                                </div>
                            </div>
                            </div>
                        </div>  
                    )
                }}
            </ProductConsumer>
    )
    }
}