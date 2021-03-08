import React from "react";
import { Popconfirm, message } from "antd";

function BasketLigne(props) {
  return (
    <>
      <tr>
        <td class="cart_product">
          <a href="">
            <img src="images/cart/one.png" alt="" />
          </a>
        </td>
        <td class="cart_description">
          <h4>
            <a href="">{props.product.name}</a>
          </h4>
          <p>Web ID: {props.product.id}</p>
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
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => props.deleteItem(props.product.id)}
            onCancel={() => {
              console.log("Delete Canceled");
            }}
            okText="Yes"
            cancelText="No"
          >
            <a className="cart_quantity_delete">
              <i className="fa fa-times"></i>
            </a>
          </Popconfirm>
        </td>
      </tr>
    </>
  );
}

export default BasketLigne;
