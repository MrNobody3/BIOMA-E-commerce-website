import React, { useContext } from "react";
import { withCookies, useCookies, Cookies } from "react-cookie";
import DispatchContext from "../DispatchContext";
import { notification } from "antd";

function ProductCard(props) {
  const [cookies, setCookie] = useCookies(["shoppingCart"]);
  var cookiesFromBrowser = new Cookies();
  const appDispatch = useContext(DispatchContext);
  function addToCart(val) {
    var r = null;
    if (cookiesFromBrowser.get("shoppingCart") && cookiesFromBrowser.get("shoppingCart").length) {
      console.log("in cookies lenght");
      r = new Set(cookiesFromBrowser.get("shoppingCart"));
    } else {
      r = new Set();
    }
    if (!compareValIsExist({ idProduct: val.id, amount: 1 }, r)) {
      r.add({ idProduct: val.id, amount: 1 });
      //dispatch
      appDispatch({ type: "incrementShoppingCartCount" });
      notification.success({
        message: "Cart updated",
        description: "Cart updated one item added",
        duration: 3,
        onClick: () => {
          console.log("Notification Clicked!");
        }
      });
    }
    setCookie("shoppingCart", [...r]);
  }
  function compareValIsExist(val, listOfVal) {
    for (let item of listOfVal) {
      if (JSON.stringify(item) === JSON.stringify(val)) {
        return true;
      }
    }
    return false;
  }

  return (
    <div key={props.id} className="col-sm-4">
      <div className="product-image-wrapper">
        <div className="single-products">
          <div className="productinfo text-center">
            <img src={props.product.img} alt="" />
            <h2>{props.product.price}MAD</h2>
            <p>{props.product.name}</p>
            <a onClick={() => addToCart(props.product)} className="btn btn-default add-to-cart">
              <i className="fa fa-shopping-cart"></i>Add to cart
            </a>
          </div>
          <div className="product-overlay">
            <div className="overlay-content">
              <h2>{props.product.price}MAD</h2>
              <p>{props.product.name}</p>
              <a onClick={() => addToCart(props.product)} className="btn btn-default add-to-cart">
                <i className="fa fa-shopping-cart"></i>Add to cart
              </a>
            </div>
          </div>
          {props.product.dateCreated > new Date().setTime(new Date().getTime() - 7 * 24 * 60 * 60 * 1000) && <img src="images/home/new.png" className="new" alt="" />}
        </div>
        <div className="choose">
          <ul className="nav nav-pills nav-justified">
            <li>
              <a href="#">
                <i className=" ti-eye"></i>Consulter produit
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default withCookies(ProductCard);
