import React from "react";
import { Cookies } from "react-cookie";
import BasketLigne from "./BasketLigne";
import Page from "./Page";
import { ECO_TAX, SHIPPING_COST } from "../constants/constants";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import PreLoader from "./PreLoader";

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      price
      category {
        name
      }
      numberInStock
    }
  }
`;

function Cart() {
  var cookieFromBrowser = new Cookies();
  let totale = 0;

  function ProductById({ idProduct }, amount) {
    const { loading, error, data } = useQuery(GET_PRODUCT, {
      variables: { id: idProduct }
    });

    if (loading)
      return (
        <>
          <PreLoader />
        </>
      );
    if (error) return `Error! ${error}`;
    totale += parseFloat(data.product.price) * parseFloat(amount);

    return <BasketLigne key={data.product.id} product={data.product} amount={amount} incrementAmount={incrementAmountProduct} decrementAmount={decrementAmountProduct} deleteItem={deleteItem} />;
  }

  function incrementAmountProduct(value, idProduct) {
    if (value < 10) {
      let cookies = cookieFromBrowser.get("shoppingCart");
      cookies.map(cookie => {
        if (cookie.idProduct == idProduct) {
          cookie.amount = value + 1;
        }
      });
      cookieFromBrowser.set("shoppingCart", cookies);
      window.location.reload();
    }
  }
  function decrementAmountProduct(value, idProduct) {
    if (value > 1) {
      let cookies = cookieFromBrowser.get("shoppingCart");
      cookies.map(cookie => {
        if (cookie.idProduct == idProduct) {
          cookie.amount = value - 1;
        }
      });
      cookieFromBrowser.set("shoppingCart", cookies);
      window.location.reload();
    }
  }

  function deleteItem(idProduct) {
    let cookies = cookieFromBrowser.get("shoppingCart");
    const index = cookies.findIndex(x => x.idProduct === idProduct);
    if (index !== -1) {
      cookies.splice(index, 1);
      cookieFromBrowser.set("shoppingCart", cookies);
      window.location.reload();
    }
  }
  function updateCookie(draft) {
    const cookieFromBrowser = new Cookies();
    cookieFromBrowser.remove("shoppingCart");
    let r = new Set();
    draft.map(x => {
      if (x.product.id !== undefined) r.add({ idProduct: x.product.id, amount: x.amount });
    });
    cookieFromBrowser.set("shoppingCart", [...r]);
  }
  function formatTotale() {
    if (SHIPPING_COST !== "Free") return totale + parseFloat(SHIPPING_COST) + parseFloat(ECO_TAX);
    return totale + parseFloat(ECO_TAX);
  }

  return (
    <Page title={"Cart"}>
      <section id="cart_items">
        <div className="container">
          <div className="table-responsive cart_info">
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="image">Item</td>
                  <td className="description"></td>
                  <td className="price">Price</td>
                  <td className="quantity">Quantity</td>
                  <td className="total">Total</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>{cookieFromBrowser.get("shoppingCart") && cookieFromBrowser.get("shoppingCart").length && cookieFromBrowser.get("shoppingCart").map(cookie => ProductById({ idProduct: cookie.idProduct }, cookie.amount))}</tbody>
            </table>
          </div>
        </div>
      </section>
      <section id="do_action">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="total_area">
                <ul>
                  <li>
                    Cart Sub Total <span>{totale}</span>
                  </li>
                  <li>
                    Eco Tax <span>{ECO_TAX}</span>
                  </li>
                  <li>
                    Shipping Cost <span>{SHIPPING_COST}</span>
                  </li>
                  <li>
                    Total <span>{formatTotale()}</span>
                  </li>
                </ul>
                {/* <a className="btn btn-default update" href="">
                  Update
                </a> */}
                <Link className="btn btn-default check_out" to="/checkout">
                  Check Out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}

export default Cart;
