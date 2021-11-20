import React, { useState, useEffect, useContext } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../App";
import { numberContext } from "../../App";
import { BsCheckCircle } from "react-icons/bs";
import { MdAddShoppingCart } from "react-icons/md";
import { Col, Card, Row, Button, Nav,InputGroup,FormControl } from "react-bootstrap";
import Payment from "../payment/payment";
import "./ShoppingCart.css";

export const ShoppingCart = () => {
  const [book, setBook] = useState([]);
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState();
  const state = useContext(userContext);
  const token = state.token;
  const cart = useContext(numberContext);

  const getBooks = () => {
    axios
      .get("http://localhost:5000/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setBook(result.data.message);

        setPrice(
          result.data.message.reduce((acc, elem, i) => {
            return acc + parseInt(elem.bookId.price, 10);
          }, 0)
        );
      })
      .catch((err) => {
        setBook([]);
        setPrice(0);
      });
  };

  useEffect(() => {
    getBooks();
  }, [cart.number]);

  const deleteBook = (id, bookId) => {
    cart.setNumber(cart.number - 1);
    axios
      .delete(
        `http://localhost:5000/cart/${id}`,

        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: { bookId },
        }
      )
      .then((result) => {
        if (result.data.success) {
          getBooks();
        }
      })
      .catch((err) => {
        setStatus(<div>{`some thing wrong`}</div>);
      });
  };

  const disc = (code) => {
    if (code.toLowerCase() == "meraki") {
      setPrice(price / 2);
      setStatus(<BsCheckCircle></BsCheckCircle>);
    } else {
      setPrice(book.reduce((acc, elem, i) => {
        return acc + parseInt(elem.bookId.price, 10);
      }, 0))
    }
  };
  return (
    <>
      <div className="contaner">
        {!book.length ? (
          <div >
            <div>
              <MdAddShoppingCart size="5em" className="pssss" />{" "}
            </div>
            <div className="iiiiii">
              {" "}
              <h3>Shopping cart is Empty !</h3>
            </div>
          </div>
        ) : (
          <>
          <div className="container">
        <Row xs={1} md={4} className="g-4">
            {book.map((element, i) => {
              return (
                <div className="container">
                   <Col key={element.bookId.id}>
                  <Card
                    style={{ textAlign: "left", width: "100%", height: "100%" }}
                  >
                    <Card.Img
                      variant="top"
                      src={element.bookId.image}
                      height="200px"
                      width="200px"
                    />
                    <Card.Body style={{ height: "200px" }}>
                      <Card.Title style={{ fontSize: "18px", display: "flex" }}>
                        {element.bookId.name}{" "}
                       
                      </Card.Title>
                      
                      

                      <Card.Text style={{ fontSize: "16px" }}>
                        Price: {element.bookId.price} $
                      </Card.Text>
                      <Card.Text style={{ fontSize: "16px" , textAlign: "center"}} >
                      <h1 onClick={() => {
                        deleteBook(element._id, element.bookId._id);
                      }} className="trash">🗑️</h1>
                      </Card.Text>

                      

                    </Card.Body>
                  </Card>
                </Col>

                </div>
                
              );
            })}
            </Row>
        </div>
          </>
        )}
      </div>
      <div className="container">
      <div className="devider">
        <div className="total_Price">
          <span className="span">Total price : {price} JD</span>
          <br />
         
          <input
            className="pppp"
            type="text"
            placeholder="Enter youre discount code"
            onChange={(e) => {
              disc(e.target.value);
            }}
          ></input>
          <div className="ll">{status}</div>
          <br />
          <div >
          <Route
            exact
            path="/cart"
            render={() => (
              <Payment
              
              />
            )}
          />
        </div>
          
        </div>
       
      </div>
      </div>
    </>
  );
};
