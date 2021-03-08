import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import CategoriesNav from "./CategoriesNav";
import Cart from "./Cart";
import Checkout from "./Checkout";
import ProductDetail from "./ProductDetail";
import Header from "./Header";
import NotFound from "./NotFound";
import Footer from "./Footer";

class Store extends Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path="/">
            <CategoriesNav />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/products/:idProduct">
            <ProductDetail />
          </Route>
          <Route component={NotFound}></Route>
        </Switch>
        <Footer />
      </>
    );
  }
}

export default Store;
