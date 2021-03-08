import React, { useEffect, useState, useContext } from "react";
import { Cookies } from "react-cookie";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "./Cart";
import DispatchContext from "../DispatchContext";
import { useParams, withRouter } from "react-router-dom";
import { notification } from "antd";
import PreLoader from "./PreLoader";

function ProductDetail(props) {
  const [amount, setAmount] = useState(1);
  const { idProduct } = useParams();
  const appDispatch = useContext(DispatchContext);
  let cookies = new Cookies();
  function addToCart(val) {
    var r = null;
    if (cookies.get("shoppingCart") && cookies.get("shoppingCart").length) {
      r = new Set(cookies.get("shoppingCart"));
    } else {
      r = new Set();
    }
    if (!compareValIsExist({ idProduct: val.id, amount }, r)) {
      r.add({ idProduct: val.id, amount: parseInt(amount) });
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
    } else {
      const index = cookies.get("shoppingCart").findIndex(x => x.idProduct === val.id);
      if (index !== -1 && cookies.get("shoppingCart")[index].amount != amount) {
        let newData = cookies.get("shoppingCart");
        newData.map(cookie => {
          if (cookie.idProduct == val.id) {
            cookie.amount = parseInt(amount);
          }
        });
        r = new Set(newData);
        notification.info({
          message: "Cart updated",
          description: "Quantity Product updated",
          duration: 3,
          onClick: () => {
            console.log("Notification Clicked!");
          }
        });
      }
    }
    cookies.set("shoppingCart", [...r]);
  }
  function compareValIsExist(val, listOfVal) {
    for (let item of listOfVal) {
      if (item.idProduct === val.idProduct) {
        return true;
      }
    }
    return false;
  }
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
  if (!data) return <p>Not found</p>;

  return (
    <>
      <div className="container">
        {data && data.product && (
          <div class="product-details">
            <div class="col-sm-5">
              <div class="view-product">
                <img src={"images/shop/product7.jpg"} alt="" />
                <h3>ZOOM</h3>
              </div>
              <div id="similar-product" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                  <div class="item active">
                    <a>
                      <img src="images/product-details/similar1.jpg" alt="" />
                    </a>
                    <a>
                      <img src="images/product-details/similar2.jpg" alt="" />
                    </a>
                    <a>
                      <img src="images/product-details/similar3.jpg" alt="" />
                    </a>
                  </div>
                  <div class="item">
                    <a>
                      <img src="images/product-details/similar1.jpg" alt="" />
                    </a>
                    <a>
                      <img src="images/product-details/similar2.jpg" alt="" />
                    </a>
                    <a>
                      <img src="images/product-details/similar3.jpg" alt="" />
                    </a>
                  </div>
                  <div class="item">
                    <a>
                      <img src="images/product-details/similar1.jpg" alt="" />
                    </a>
                    <a>
                      <img src="images/product-details/similar2.jpg" alt="" />
                    </a>
                    <a>
                      <img src="images/product-details/similar3.jpg" alt="" />
                    </a>
                  </div>
                </div>

                <a class="left item-control" href="#similar-product" data-slide="prev">
                  <i class="fa fa-angle-left"></i>
                </a>
                <a class="right item-control" href="#similar-product" data-slide="next">
                  <i class="fa fa-angle-right"></i>
                </a>
              </div>
            </div>
            <div class="col-sm-7">
              <div class="product-information">
                <img src="images/product-details/new.jpg" class="newarrival" alt="" />
                <h2>{data.product.name}</h2>
                <p>Web ID: 1089772</p>
                <img src="images/product-details/rating.png" alt="" />
                <span>
                  <span>{data.product.price} MAD</span>
                  <label>Quantity:</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={e => {
                      if (e.target.value >= 1 && e.target.value <= 10) {
                        setAmount(e.target.value);
                      }
                    }}
                  />
                  <button type="button" class="btn btn-fefault cart" onClick={() => addToCart(data.product)}>
                    <i class="fa fa-shopping-cart"></i>
                    Add to cart
                  </button>
                </span>
                <p>
                  <b>Availability:</b>
                  {data.product.numberInStock > 0 ? "In Stock" : "Not in Stock for the moment"}
                </p>
                <p>
                  <b>Condition:</b> {data.product.dateCreated > new Date().setTime(new Date().getTime() - 7 * 24 * 60 * 60 * 1000) ? "New" : ""}
                </p>
                <p>
                  <b>Category:</b> {data.product.category.name}
                </p>
                <a>
                  <img src="images/product-details/share.png" class="share img-responsive" alt="" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/*
        //ADD Related Products Section
      */}
      </div>
    </>
  );
}

export default withRouter(ProductDetail);
