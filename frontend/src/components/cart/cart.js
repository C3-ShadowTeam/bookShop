import React, { useState, useContext } from "react";
import { userContext } from "../../App";
import { MdAddShoppingCart } from "react-icons/md";
import axios from "axios";
import "./cart.css";
import Login from "../auth/login";
import { numberContext } from "../../App";
import { Route, useHistory } from "react-router-dom";
import swal from "sweetalert";

export const AddCart = ({ bookId }) => {
  window.scrollTo(0, 0)
  const history = useHistory();
  const [cart, setCart] = useState();
  const state = useContext(userContext);
  const cartD = useContext(numberContext);
  const token = state.token;

  const adding = () => {
    if (!token) {
      swal({
        title: "You have to login first so you can buy",
        icon: "error",
        button: "OK",
      });
    }
    axios
      .post(
        "https://c3-bookshop.herokuapp.com/cart",
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        swal({
          title: "success added to cart ",
          icon: "success",
          button: "OK",
        });

        cartD.setNumber(cartD.number + 1);
      })
      .catch((err) => {});
  };

  return (
    <div className="cart1">
      <MdAddShoppingCart size="3em" className="c" onClick={adding} />
    </div>
  );
};
