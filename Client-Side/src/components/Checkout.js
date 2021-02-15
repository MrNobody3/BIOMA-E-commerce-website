import React, { useState, useEffect } from "react";
import { ECO_TAX, SHIPPING_COST } from "../constants/constants";
import { Cookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import { useImmerReducer } from "use-immer";
import Page from "./Page";
function Checkout(props) {
  const [subTotale, setSubTotale] = useState(0);
  const initialValue = {
    firstName: {
      value: "",
      hasErrors: false,
      message: ""
    },
    lastName: {
      value: "",
      hasErrors: false,
      message: ""
    },
    phone: {
      value: "",
      hasErrors: false,
      message: ""
    },
    address: {
      value: "",
      hasErrors: false,
      message: ""
    },
    codePostal: {
      value: "",
      hasErrors: false,
      message: ""
    },
    email: {
      value: "",
      hasErrors: false,
      message: ""
    },
    country: {
      value: ""
    },
    city: {
      value: ""
    },
    submitCount: 0
  };
  function ourReducer(draft, action) {
    switch (action.type) {
      case "firstNameImmediatly":
        draft.firstName.hasErrors = false;
        draft.firstName.value = action.value;
        if (draft.firstName.value.length > 50) {
          draft.firstName.hasErrors = true;
          draft.firstName.message = "First Name must not exceed 50 caracters";
        }
        return;
      case "firstNameAfterDelay":
        if (draft.firstName.value.length < 3) {
          draft.firstName.hasErrors = true;
          draft.firstName.message = "the FirstName must has at least 3 caracters";
        }
        return;
      case "lastNameImmediatly":
        draft.lastName.hasErrors = false;
        draft.lastName.value = action.value;
        if (draft.lastName.value.length > 50) {
          draft.lastName.hasErrors = true;
          draft.lastName.message = "Last Name must not exceed 50 caracters";
        }
        return;
      case "lastNameAfterDelay":
        if (draft.lastName.value.length < 3) {
          draft.lastName.hasErrors = true;
          draft.lastName.message = "the Last Name must has at least 3 caracters";
        }
        return;
      case "emailImmediatly":
        draft.email.hasErrors = false;
        draft.email.value = action.value;
        return;
      case "emailAfterDelay":
        if (!/^\S+@\S+$/.test(draft.email.value)) {
          draft.email.hasErrors = true;
          draft.email.message = "you must provide a valid email";
        }
        return;
      case "phoneImmediatly":
        draft.phone.hasErrors = false;
        draft.phone.value = action.value;
        return;
      case "phoneAfterDelay":
        if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(draft.phone.value)) {
          draft.phone.hasErrors = true;
          draft.phone.message = "you must provide a valid phone number";
        }
        return;
      case "adresseImmediatly":
        draft.address.hasErrors = false;
        draft.address.value = action.value;
        return;
      case "adresseAfterDelay":
        if (draft.lastName.value.length < 4) {
          draft.address.hasErrors = true;
          draft.address.message = "you must provide a valid address";
        }
        return;
      case "codePostalImmediatly":
        draft.codePostal.hasErrors = false;
        draft.codePostal.value = action.value;
        return;
      case "codePostalAfterDelay":
        if (draft.lastName.value.length < 4) {
          draft.codePostal.hasErrors = true;
          draft.codePostal.message = "you must provide a valid code Postal";
        }
        return;
      case "cityImmediatly":
        console.log("city", action.value);
        draft.city.value = action.value;
        return;
      case "submitForm":
        if (!draft.firstName.hasErrors && !draft.lastName.hasErrors && !draft.address.hasErrors && !draft.codePostal.hasErrors && !draft.email.hasErrors && !draft.phone.hasErrors) {
          draft.submitCount++;
        }
        return;
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialValue);

  useEffect(() => {
    //Read the cookies
    //get the product by his id from the cookie
    //read the amount from each product from the cookies
    //and set the sub totale by the price of the product fetched and his amount
    var cookiesFromBrowser = new Cookies();
    let totale = 0;
    function getProductById(idProduct) {
      //this function to fetch the product from the server by his id
      const product = {
        id: idProduct,
        img: "",
        name: `"Produit " ${idProduct}`,
        price: "20.00",
        categorie: "Categorie 2",
        dateCreated: null
      };
      return product;
    }
    if (cookiesFromBrowser.get("shoppingCart") && cookiesFromBrowser.get("shoppingCart").length) {
      for (let i = 0; i < cookiesFromBrowser.get("shoppingCart").length; i++) {
        let priceProduct = getProductById(cookiesFromBrowser.get("shoppingCart")[i].idProduct).price;
        totale += priceProduct * cookiesFromBrowser.get("shoppingCart")[i].amount;
      }
      setSubTotale(totale);
    }
  }, []);
  useEffect(() => {
    if (state.submitCount) {
      //Logic to handle
      //Call the API ValidateOrder
      // IF Response OK navigate to thanks Page
      // IF SOMETHING Goes Wrong Show error Notification
      props.history.push("/");
    }
  }, [state.submitCount]);
  function formatTotale() {
    if (SHIPPING_COST !== "Free") return subTotale + parseFloat(SHIPPING_COST) + parseFloat(ECO_TAX);
    return subTotale + parseFloat(ECO_TAX);
  }

  function validateOrder(event) {
    event.preventDefault();
    dispatch({ type: "firstNameImmediatly", value: state.firstName.value });
    dispatch({ type: "firstNameAfterDelay", value: state.firstName.value });
    dispatch({ type: "lastNameImmediatly", value: state.lastName.value });
    dispatch({ type: "lastNameAfterDelay", value: state.lastName.value });
    dispatch({ type: "emailImmediatly", value: state.email.value });
    dispatch({ type: "emailAfterDelay", value: state.email.value });
    dispatch({ type: "phoneImmediatly", value: state.phone.value });
    dispatch({ type: "phoneAfterDelay", value: state.phone.value });
    dispatch({ type: "adresseImmediatly", value: state.address.value });
    dispatch({ type: "adresseAfterDelay", value: state.address.value });
    dispatch({ type: "codePostalImmediatly", value: state.codePostal.value });
    dispatch({ type: "codePostalAfterDelay", value: state.codePostal.value });
    dispatch({ type: "submitForm" });
  }
  return (
    <Page title={"Checkout"}>
      <section className="shop checkout section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12">
              <div className="checkout-form">
                <h2>Make Your Checkout Here</h2>
                <p>Please register in order to checkout more quickly</p>
                <form className="form" method="post" action="#">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          First Name<span>*</span>
                        </label>
                        <input onChange={e => dispatch({ type: "firstNameImmediatly", value: e.target.value })} type="text" name="name" placeholder="" required="required" />
                        {state.firstName.hasErrors && <div class="alert alert-danger small">{state.firstName.message}</div>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          Last Name<span>*</span>
                        </label>
                        <input onChange={e => dispatch({ type: "lastNameImmediatly", value: e.target.value })} type="text" name="name" placeholder="" required="required" />
                        {state.lastName.hasErrors && <div class="alert alert-danger small">{state.lastName.message}</div>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          Email Address<span>*</span>
                        </label>
                        <input onChange={e => dispatch({ type: "emailImmediatly", value: e.target.value })} type="email" name="email" placeholder="" required="required" />
                        {state.email.hasErrors && <div class="alert alert-danger small">{state.email.message}</div>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          Phone Number<span>*</span>
                        </label>
                        <input onChange={e => dispatch({ type: "phoneImmediatly", value: e.target.value })} type="text" name="phone" placeholder="" required="required" />
                        {state.phone.hasErrors && <div class="alert alert-danger small">{state.phone.message}</div>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          Country<span></span>
                        </label>
                        <select name="country_name" id="country">
                          <option value="AF">Morocco</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          State / Divition<span>*</span>
                        </label>
                        <select onChange={e => dispatch({ type: "cityImmediatly", value: e.target.value })} name="state-province" id="state-province">
                          <option value="divition" selected="selected">
                            Rabat
                          </option>
                          <option>Kenitra</option>
                          <option>casablanca</option>
                          <option>Berrchid</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          Address <span>*</span>
                        </label>
                        <input onChange={e => dispatch({ type: "adresseImmediatly", value: e.target.value })} type="text" name="address" placeholder="" required="required" />
                        {state.address.hasErrors && <div class="alert alert-danger small">{state.address.message}</div>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          Postal Code<span>*</span>
                        </label>
                        <input onChange={e => dispatch({ type: "codePostalImmediatly", value: e.target.value })} type="text" name="post" placeholder="" required="required" />
                        {state.codePostal.hasErrors && <div class="alert alert-danger small">{state.codePostal.message}</div>}
                      </div>
                    </div>
                    {/* <div className="col-12">
                      <div className="form-group create-account">
                        <input id="cbox" type="checkbox" />
                        <label>Create an account?</label>
                      </div>
                    </div> */}
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-4 col-12">
              <div className="order-details">
                <div className="single-widget">
                  <h2>CART TOTALS</h2>
                  <div className="content">
                    <ul>
                      <li>
                        Sub Total<span>{subTotale}</span>
                      </li>
                      <li>
                        (+) Shipping<span>{SHIPPING_COST}</span>
                      </li>
                      <li className="last">
                        Total<span>{formatTotale()}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="single-widget">
                  <h2>Payments</h2>
                  <div className="content">
                    <div className="checkbox">
                      <label className="checkbox-inline" for="1">
                        {/* <input name="updates" id="1" type="checkbox" checked />  */}
                        Cash on delivery
                      </label>
                      {/* <label className="checkbox-inline">
                        <input type="checkbox" checked />
                        Cash On Delivery
                      </label> */}
                      {/* <label className="checkbox-inline" for="3">
                        <input name="news" id="3" type="checkbox" /> PayPal
                      </label> */}
                    </div>
                  </div>
                </div>
                {/* <div className="single-widget payement">
                  <div className="content">
                    <img src="images/payment-method.png" alt="#" />
                  </div>
                </div> */}
                {/* <div className="single-widget get-button">
                  <div className="content">
                    <div className="button">
                      <a href="#" className="btn">
                        proceed to checkout
                      </a>
                    </div>
                  </div>
                </div> */}
                {subTotale > 0 ? (
                  <button class="btn btn-primary centerButton" onClick={validateOrder}>
                    proceed to checkout
                  </button>
                ) : (
                  <button class="btn btn-primary">Go add Some Products to your Cart</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}

export default withRouter(Checkout);
