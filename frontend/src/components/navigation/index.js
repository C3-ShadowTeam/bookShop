import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { userContext } from "../../App";
import { MdAddShoppingCart } from "react-icons/md";
import "./navigation.css";
import { numberContext } from "../../App";
import { Profile } from "../profile/profile";
import { Search } from "../search/Search";
import Login from "../auth/login";
import { Register } from "../auth/signUp";
import { About } from "../About/About";
import { Contact } from "../Contact/Contact";
// import {userContext} from "../../App"

const Navigation = () => {
  const cart = useContext(numberContext);
  console.log(cart);
  const token = useContext(userContext);
  token.setToken(localStorage.getItem("token"));
  useEffect(() => {
    axios
      .get(
        "https://c3-bookshop.herokuapp.com/users",

        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      )
      .then((res) => {
        cart.setNumber(res.data.userInfo[0].cart.length);
      });
  });
  return (
    <nav className="fixed">
      {!token.token ? (
        <ul className="nav-list">
          <li className="nav-item">
            <h3 className="keros">KERO BOOK</h3>
          </li>
          <li className="nav-item search">
            <Search />
          </li>
         
          <li className="nav-item">
            <Link to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="nav-item">
            <Login />
          </li>
          <li className="nav-item">
            <Register />
          </li>
        </ul>
      ) : (
        <ul className="nav-list">
          <li className="nav-item">
            <h3 className="keros">KERO BOOK</h3>
          </li>
          <li className="nav-item search">
            <Search />
          </li>
          <li className="nav-item">
            <Link className="Link" to="/home">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link className="Link" to="/favorite">
              Favourite
            </Link>
          </li>
         
          <li className="nav-item">
            <Link to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="nav-item">
            <Link className="Link" to="/logOut">
              LogOut
            </Link>
          </li>
          <li className="nav-item">
            <Link className="Link odai" to="/cart">
              <MdAddShoppingCart size="2em" />{" "}
              <div className="n">{cart.number}</div>
            </Link>
          </li>
          <li className="nav-item">
            <Profile />
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
