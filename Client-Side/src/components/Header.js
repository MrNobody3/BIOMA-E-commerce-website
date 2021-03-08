import React, { useContext } from "react";
import StateContext from "../StateContext";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const appState = useContext(StateContext);
  return (
    <>
      <header id="header">
        <div className="header_top">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <div className="contactinfo">
                  <ul className="nav nav-pills">
                    <li>
                      <a href="#">
                        Developed by <strong>TOURABI Zakaria</strong>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-phone"></i> +212 6 54 354046
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-envelope"></i> admin@bioma.ma
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="social-icons pull-right">
                  <ul className="nav navbar-nav">
                    <li>
                      <a href="https://www.facebook.com/zakaria.davide/">
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/in/zakaria-tourabi-b5abb5142/">
                        <i className="fa fa-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-dribbble"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-google-plus"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-middle">
          <div className="container">
            <div className="row">
              <div className="col-md-4 clearfix">
                <div className="logo pull-left">
                  <Link to="/">
                    <img src="images/home/logo.png" alt="" />
                  </Link>
                </div>
                <div className="btn-group pull-right clearfix">
                  {/*
                  To Change Langue To do Later 
                  <div className="btn-group">
                    <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                      USA
                      <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="">Canada</a>
                      </li>
                      <li>
                        <a href="">UK</a>
                      </li>
                    </ul>
                  </div> */}

                  {/*
                  To change the currency to do later 
                  <div className="btn-group">
                    <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                      DOLLAR
                      <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="">Canadian Dollar</a>
                      </li>
                      <li>
                        <a href="">Pound</a>
                      </li>
                    </ul>
                  </div> */}
                </div>
              </div>
              <div className="col-md-8 clearfix">
                <div className="shop-menu clearfix pull-right">
                  <ul className="nav navbar-nav">
                    <li>
                      <div className="sinlge-bar shopping">
                        <Link className="single-icon" to="/cart">
                          <i className="ti-bag"></i> <span className="total-count">{appState.shoppingCartCount < 10 ? appState.shoppingCartCount : "9+"}</span>
                        </Link>
                        {/* <a href="#" className="single-icon">
                          <i className="ti-bag"></i> <span className="total-count">{appState.shoppingCartCount < 10 ? appState.shoppingCartCount : "9+"}</span>
                        </a> */}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-bottom">
          <div className="container">
            <div className="row">
              <div className="col-sm-9">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </div>
                <div className="mainmenu pull-left">
                  <ul className="nav navbar-nav collapse navbar-collapse">
                    <li>
                      <NavLink to="/" activeClassName="active">
                        Home
                      </NavLink>
                    </li>
                    <li className="dropdown">
                      <a href="#">
                        Shop<i className="fa fa-angle-down"></i>
                      </a>
                      <ul role="menu" className="sub-menu">
                        <li>
                          <NavLink to="/products" activeClassName="active">
                            products
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/checkout" activeClassName="active">
                            Checkout
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/cart" activeClassName="active">
                            Cart
                          </NavLink>
                        </li>
                        {/* <li>
                          <a href="login.html">Login</a>
                        </li> */}
                      </ul>
                    </li>
                    <li>
                      <a href="contact-us.html">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-1">
                <div className="search_box pull-right">
                  <input type="text" placeholder="Search a product" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
