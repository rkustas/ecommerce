import React, { Component } from "react";
import axios from "axios";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    tempProducts: [],
    detailData: [],
    cart: [],
    modalOpen: false,
    modalProduct: [],
    newsubtotal: 0,
    newtax: 0,
    newtotal: 0,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
    category: "All",
    bodyLocation: "All",
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    companyCountry: "All",
    companyName: "All",
  };

  getData = async () => {
    let tempProducts = [];
    let maxPrice = [];
    let newProducts = [];
    let detailData = [];
    await axios.get("http://localhost:5000/products").then((response) => {
      tempProducts = response.data;
      newProducts = [...tempProducts];
      maxPrice = Math.max(...newProducts.map((product) => product.Price));
      detailData = response.data[0];
      this.setState(() => {
        return {
          products: tempProducts,
          price: maxPrice,
          maxPrice,
          tempProducts: newProducts,
          detailData: detailData,
          modalProduct: detailData,
        };
      });
    });
  };

  // Setting up a copy of data and leaving original untouched
  componentDidMount() {
    this.getData();
    this.setState(
      {
        cart: !localStorage.getItem("products")
          ? []
          : JSON.parse(localStorage.getItem("products")).cart,
        newsubtotal: !localStorage.getItem("products")
          ? []
          : JSON.parse(localStorage.getItem("products")).subtotal,
        newtax: !localStorage.getItem("products")
          ? []
          : JSON.parse(localStorage.getItem("products")).tax,
        newtotal: !localStorage.getItem("products")
          ? []
          : JSON.parse(localStorage.getItem("products")).total,
      },
      this.addTotals()
    );
    // this.setProducts();
  }
  // setProducts = () => {
  //   let tempProducts = [];
  //   let maxPrice = [];
  //   sampleData.forEach((item) => {
  //     const singleItem = { ...item };
  //     tempProducts = [...tempProducts, singleItem];
  //     maxPrice = Math.max(...tempProducts.map((product) => product.Price));
  //   });
  //   this.setState(() => {
  //     return {
  //       products: tempProducts,
  //       price: maxPrice,
  //       maxPrice,
  //       tempProducts: tempProducts,
  //     };
  //   });
  // };

  handleChange = (event) => {
    const target = event.target;
    const value = event.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;
    this.setState(
      {
        [name]: value,
      },
      this.filterProducts
    );
  };

  filterProducts = () => {
    let {
      products,
      category,
      bodyLocation,
      price,
      companyCountry,
      companyName,
    } = this.state;
    //  all the products
    let tempProducts = [...products];
    // transform value
    price = parseInt(price);
    // filter by category
    if (category !== "All") {
      tempProducts = tempProducts.filter(
        (product) => product.Category === category
      );
    }

    // filter by bodylocation
    if (bodyLocation !== "All") {
      tempProducts = tempProducts.filter(
        (product) => product.BodyLocation === bodyLocation
      );
    }
    // filter by price
    tempProducts = tempProducts.filter((product) => product.Price <= price);
    // filter by company country
    if (companyCountry !== "All") {
      tempProducts = tempProducts.filter(
        (product) => product.CompanyCountry === companyCountry
      );
    }
    // filter by company country
    if (companyName !== "All") {
      tempProducts = tempProducts.filter(
        (product) => product.CompanyName === companyName
      );
    }
    // change state
    this.setState({
      tempProducts: tempProducts,
    });
  };

  getItem = (productID) => {
    const product = this.state.products.find(
      (item) => item.productID === productID
    );
    return product;
  };

  handleDetail = (productID) => {
    const product = this.getItem(productID);
    this.setState(() => {
      return { detailData: product };
    });
  };

  addToCart = (productID) => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(productID));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.Price;
    product.total = price;

    this.setState(
      () => {
        return { products: tempProducts, cart: [...this.state.cart, product] };
      },
      () => {
        this.addTotals();
        let subTotal = 0;
        this.state.cart.map((item) => (subTotal += item.total));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = Math.round((subTotal + tax) * 100) / 100;
        const unified = Object.assign(
          {},
          { cart: this.state.cart },
          { subtotal: Math.round(subTotal * 100) / 100 },
          { tax: tax },
          { total: total }
        );
        localStorage.setItem("products", JSON.stringify(unified));
      }
    );
  };

  openModal = (productID) => {
    const product = this.getItem(productID);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };
  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };
  increment = (productID) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(
      (item) => item.productID === productID
    );
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count + 1;
    product.total = Math.round(product.count * product.Price * 100) / 100;

    this.setState(
      () => {
        return {
          cart: [...tempCart],
        };
      },
      () => {
        this.addTotals();
        let subTotal = 0;
        this.state.cart.map((item) => (subTotal += item.total));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = Math.round((subTotal + tax) * 100) / 100;
        const unified = Object.assign(
          {},
          { cart: this.state.cart },
          { subtotal: Math.round(subTotal * 100) / 100 },
          { tax: tax },
          { total: total }
        );
        localStorage.setItem("products", JSON.stringify(unified));
      }
    );
  };

  decrement = (productID) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(
      (item) => item.productID === productID
    );
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count - 1;
    if (product.count === 0) {
      this.removeItem(productID);
    } else {
      product.total = Math.round(product.count * product.Price * 100) / 100;

      this.setState(
        () => {
          return {
            cart: [...tempCart],
          };
        },
        () => {
          this.addTotals();
          let subTotal = 0;
          this.state.cart.map((item) => (subTotal += item.total));
          const tempTax = subTotal * 0.1;
          const tax = parseFloat(tempTax.toFixed(2));
          const total = Math.round((subTotal + tax) * 100) / 100;
          const unified = Object.assign(
            {},
            { cart: this.state.cart },
            { subtotal: Math.round(subTotal * 100) / 100 },
            { tax: tax },
            { total: total }
          );
          localStorage.setItem("products", JSON.stringify(unified));
        }
      );
    }
  };
  removeItem = (productID) => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    tempCart = tempCart.filter((item) => item.productID !== productID);

    const index = tempProducts.indexOf(this.getItem(productID));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    this.setState(
      () => {
        return {
          cart: [...tempCart],
          products: [...tempProducts],
        };
      },
      () => {
        this.addTotals();
        let subTotal = 0;
        this.state.cart.map((item) => (subTotal += item.total));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = Math.round((subTotal + tax) * 100) / 100;
        const unified = Object.assign(
          {},
          { cart: this.state.cart },
          { subtotal: Math.round(subTotal * 100) / 100 },
          { tax: tax },
          { total: total }
        );
        localStorage.setItem("products", JSON.stringify(unified));
      }
    );
  };
  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.getData();
        this.addTotals();
        let subTotal = 0;
        this.state.cart.map((item) => (subTotal += item.total));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = Math.round((subTotal + tax) * 100) / 100;
        const unified = Object.assign(
          {},
          { cart: this.state.cart },
          { subtotal: Math.round(subTotal * 100) / 100 },
          { tax: tax },
          { total: total }
        );
        localStorage.setItem("products", JSON.stringify(unified));
      }
    );
  };

  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map((item) => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = Math.round((subTotal + tax) * 100) / 100;
    this.setState(() => {
      return {
        cartSubTotal: Math.round(subTotal * 100) / 100,
        cartTax: tax,
        cartTotal: total,
      };
    });
  };

  getCategory = (Category) => {
    let tempProducts = [...this.state.products];
    const products = tempProducts.filter(
      (products) => products.Category === Category
    );
    return products;
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          handleChange: this.handleChange,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
          getCategory: this.getCategory,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export function withProductConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <ProductConsumer>
        {(value) => <Component {...props} context={value} />}
      </ProductConsumer>
    );
  };
}

export { ProductProvider, ProductConsumer, ProductContext };
