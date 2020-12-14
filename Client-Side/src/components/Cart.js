import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useImmer } from "use-immer";
import BasketLigne from "./BasketLigne";

function Cart() {
  const [state, setState] = useImmer([
    {
      product: {},
      amount: 1
    }
  ]);
  const [cartSubTotale, setCartSubTotale] = useState(0);
  useEffect(() => {
    var cookiesFromBrowser = new Cookies();
    let totale = 0;
    async function getProductById(idProduct) {
      //this function to fetch the product from the server by his id
    }
    if (cookiesFromBrowser.get("shoppingCart") && cookiesFromBrowser.get("shoppingCart").length) {
      for (let i = 0; i < cookiesFromBrowser.get("shoppingCart").length; i++) {
        console.log(cookiesFromBrowser.get("shoppingCart")[i].idProduct);
        //must be productfetched = getProductById(cookiesFromBrowser.get("shoppingCart")[i].idProduct)
        let productfetched = {
          id: 2,
          img: "https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340",
          name: "Test produit",
          price: "20.00",
          categorie: "Categorie 2",
          dateCreated: null
        };
        setState(draft => {
          draft.push({ product: productfetched, amount: 2 });
        });
        totale += productfetched.price * cookiesFromBrowser.get("shoppingCart")[i].amount;
      }
      setCartSubTotale(totale);
    }
  }, []);
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
                  if (!(Object.keys(item.product).length === 0 && item.product.constructor === Object)) return <BasketLigne key={item.product.id} product={item.product} amount={item.amount} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section id="do_action">
        <div class="container">
          <div class="row">
            <div class="col-sm-6">
              <div class="total_area">
                <ul>
                  <li>
                    Cart Sub Total <span>{cartSubTotale}</span>
                  </li>
                  <li>
                    Eco Tax <span>$2</span>
                  </li>
                  <li>
                    Shipping Cost <span>Free</span>
                  </li>
                  <li>
                    Total <span>$61</span>
                  </li>
                </ul>
                <a class="btn btn-default update" href="">
                  Update
                </a>
                <a class="btn btn-default check_out" href="">
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
