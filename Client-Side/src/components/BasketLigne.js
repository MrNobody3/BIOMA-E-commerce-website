import React from "react";

function BasketLigne(props) {
  return (
    <>
      <tr>
        <td className="cart_product">
          <a href="">
            <img src={props.product.img} width="20%" height="20%" alt="" />
          </a>
        </td>
        <td className="cart_description">
          <h4>
            <a href="">{props.product.name}</a>
          </h4>
        </td>
        <td className="cart_price">
          <p>{props.product.price}MAD</p>
        </td>
        <td className="cart_quantity">
          <div className="cart_quantity_button">
            <a
              className="cart_quantity_up"
              onClick={() => {
                props.incrementAmount(props.amount, props.product.id);
              }}
            >
              {" "}
              +{" "}
            </a>
            <input className="cart_quantity_input" type="text" name="quantity" onChange={value => console.log("onChange : ", value)} value={props.amount} autoComplete="off" size="2" />
            <a
              className="cart_quantity_down"
              onClick={() => {
                props.decrementAmount(props.amount, props.product.id);
              }}
            >
              {" "}
              -{" "}
            </a>
          </div>
        </td>
        <td className="cart_total">
          <p className="cart_total_price">{props.product.price * props.amount}MAD</p>
        </td>
        <td className="cart_delete">
          <a className="cart_quantity_delete" onClick={() => props.deleteItem(props.product.id)}>
            <i className="fa fa-times"></i>
          </a>
        </td>
      </tr>
    </>
  );
}

export default BasketLigne;
