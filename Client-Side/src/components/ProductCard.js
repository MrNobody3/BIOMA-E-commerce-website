import React, { useEffect } from "react";

function ProductCard(props) {
  return (
    <div key={props.id} className="col-sm-4">
      <div className="product-image-wrapper">
        <div className="single-products">
          <div className="productinfo text-center">
            <img src={props.product.img} alt="" />
            <h2>{props.product.price}MAD</h2>
            <p>{props.product.name}</p>
            <a href="#" className="btn btn-default add-to-cart">
              <i className="fa fa-shopping-cart"></i>Add to cart
            </a>
          </div>
          <div className="product-overlay">
            <div className="overlay-content">
              <h2>{props.product.price}MAD</h2>
              <p>{props.product.name}</p>
              <a href="#" className="btn btn-default add-to-cart">
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
                <i className="fas fa-eye"></i>Consulter produit
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
