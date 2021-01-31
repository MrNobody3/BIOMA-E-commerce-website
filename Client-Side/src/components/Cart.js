import React, { useEffect, useState, useContext } from "react";
import { Cookies } from "react-cookie";
import { useImmer } from "use-immer";
import BasketLigne from "./BasketLigne";
import DispatchContext from "../DispatchContext";
import { ECO_TAX, SHIPPING_COST } from "../constants/constants";

function Cart() {
  const [state, setState] = useImmer([
    {
      product: {},
      amount: 1
    }
  ]);
  const [cartSubTotale, setCartSubTotale] = useState(0);
  const appDispatch = useContext(DispatchContext);
  useEffect(() => {
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
        var productfetched = getProductById(cookiesFromBrowser.get("shoppingCart")[i].idProduct);
        setState(draft => {
          draft.push({ product: productfetched, amount: cookiesFromBrowser.get("shoppingCart")[i].amount });
        });
        totale += productfetched.price * cookiesFromBrowser.get("shoppingCart")[i].amount;
      }
      setCartSubTotale(totale);
    }
  }, []);
  function incrementAmountProduct(value, idProduct) {
    if (value < 10) {
      setState(draft => {
        draft.map(x => {
          if (x.product.id === idProduct) {
            x.amount = value + 1;
            var newVal = parseFloat(cartSubTotale);
            setCartSubTotale((newVal += parseFloat(x.product.price)));
          }
        });
        updateCookie(draft);
      });
    }
  }
  function decrementAmountProduct(value, idProduct) {
    if (value > 1) {
      setState(draft => {
        draft.map(x => {
          if (x.product.id === idProduct) {
            x.amount = value - 1;
            var newVal = parseFloat(cartSubTotale);
            setCartSubTotale((newVal -= parseFloat(x.product.price)));
          }
        });
        updateCookie(draft);
      });
    }
  }

  function deleteItem(idProduct) {
    setState(draft => {
      const index = draft.findIndex(x => x.product.id === idProduct);
      var totleIndex = parseFloat(draft[index].product.price) * parseFloat(draft[index].amount);
      var newVal = parseFloat(cartSubTotale);
      if (index !== -1) {
        draft.splice(index, 1);
        setCartSubTotale((newVal -= parseFloat(totleIndex)));
      }
      updateCookie(draft);
    });
    appDispatch({ type: "decrementShoppingCartCount" });
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
    if (SHIPPING_COST !== "Free") return cartSubTotale + parseFloat(SHIPPING_COST) + parseFloat(ECO_TAX);
    return cartSubTotale + parseFloat(ECO_TAX);
  }

  return (
    <>
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
              <tbody>
                {state.map(item => {
                  if (!(Object.keys(item.product).length === 0 && item.product.constructor === Object)) return <BasketLigne key={item.product.id} product={item.product} amount={item.amount} incrementAmount={incrementAmountProduct} decrementAmount={decrementAmountProduct} deleteItem={deleteItem} />;
                })}
              </tbody>
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
                    Cart Sub Total <span>{cartSubTotale}</span>
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
                <a className="btn btn-default update" href="">
                  Update
                </a>
                <a className="btn btn-default check_out" href="">
                  Check Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
