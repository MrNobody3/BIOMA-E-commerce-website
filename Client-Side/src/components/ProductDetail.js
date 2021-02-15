import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

function ProductDetail(props) {
  let idPoduct = props.match.params;
  const [product, setProduct] = useState({
    id: idPoduct,
    img: "https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340",
    name: "Test produit",
    price: "20.00",
    categorie: "Categorie 2",
    dateCreated: null
  });
  useEffect(() => {
    if (idPoduct) {
      // console.log("Product Detail == > Product Id: ", idPoduct);
      //Call The API for Fetching the product By His id
      //setProduct(theProductFetched)
    }
  }, [idPoduct]);
  return (
    <>
      <div className="container">
        <div class="product-details">
          <div class="col-sm-5">
            <div class="view-product">
              <img src="images/product-details/1.jpg" alt="" />
              <h3>ZOOM</h3>
            </div>
            <div id="similar-product" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner">
                <div class="item active">
                  <a href="">
                    <img src="images/product-details/similar1.jpg" alt="" />
                  </a>
                  <a href="">
                    <img src="images/product-details/similar2.jpg" alt="" />
                  </a>
                  <a href="">
                    <img src="images/product-details/similar3.jpg" alt="" />
                  </a>
                </div>
                <div class="item">
                  <a href="">
                    <img src="images/product-details/similar1.jpg" alt="" />
                  </a>
                  <a href="">
                    <img src="images/product-details/similar2.jpg" alt="" />
                  </a>
                  <a href="">
                    <img src="images/product-details/similar3.jpg" alt="" />
                  </a>
                </div>
                <div class="item">
                  <a href="">
                    <img src="images/product-details/similar1.jpg" alt="" />
                  </a>
                  <a href="">
                    <img src="images/product-details/similar2.jpg" alt="" />
                  </a>
                  <a href="">
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
              <h2>Anne Klein Sleeveless Colorblock Scuba</h2>
              <p>Web ID: 1089772</p>
              <img src="images/product-details/rating.png" alt="" />
              <span>
                <span>US $59</span>
                <label>Quantity:</label>
                <input type="text" value="3" />
                <button type="button" class="btn btn-fefault cart">
                  <i class="fa fa-shopping-cart"></i>
                  Add to cart
                </button>
              </span>
              <p>
                <b>Availability:</b> In Stock
              </p>
              <p>
                <b>Condition:</b> New
              </p>
              <p>
                <b>Brand:</b> E-SHOPPER
              </p>
              <a href="">
                <img src="images/product-details/share.png" class="share img-responsive" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(ProductDetail);
