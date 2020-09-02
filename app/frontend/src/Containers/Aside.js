import React, { Component } from 'react'
import {MenuItem} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';



export default class Aside extends Component {
    render() {
        const {Category} = this.props.product;
        // console.log(Category);
        return (
            <MenuItem id="categories">{Category}</MenuItem>
        )
    }
}

