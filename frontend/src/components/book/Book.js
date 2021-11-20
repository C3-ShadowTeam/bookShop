import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router";
import { Rate } from "../rate/rate";
import { AddCart } from "../cart/cart";
import Favourite from "../favourite/favourite";
import axios from "axios";
import SlideShow from "./slide";
import { Col, Card, Row, Button, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export const AllBook = () => {
  const [books, setBooks] = useState([]);
  const history = useHistory();
  useEffect(() => {
    axios.get("https://c3-bookshop.herokuapp.com/books/").then((res) => {
      setBooks([...res.data.books]);
    });
  }, []);
  return (
    <div className="">
      <div className="INTRO">
        <div className="intrtolkk">
          {" "}
          <h1>TODAY A READER ,, TOMORROW A LEADER</h1>
          <h4>lets make you tomorrow's leader </h4>{" "}
        </div>
        <div className="intrpick">
          {" "}
          <img
            src="https://c.tenor.com/GrKqz4mmq_0AAAAd/spiritual-book-glow.gif"
            style={{ borderRadius: "5px" }}
          ></img>{" "}
        </div>
      </div>
      <SlideShow />
      <div className="container">
        <Row xs={1} md={4} className="g-4">
          {books &&
            books.map((element, index) => {
              return (
                <Col key={element.id}>
                  <Card
                    style={{ textAlign: "left", width: "100%", height: "100%" }}
                  >
                    <Card.Img
                      variant="top"
                      src={element.image}
                      height="200px"
                      width="200px"
                      onClick={() => {
                        history.push(`/Book/${element._id}`);
                      }}
                    />
                    <Card.Body>
                      <Card.Title
                        style={{
                          fontSize: "18px",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        onClick={() => {
                          history.push(`/Book/${element._id}`);
                        }}
                      >
                        {element.name}{" "}
                        <Route
                          
                          path={"/" || "/home"}
                          render={() => <Favourite bookId={element._id} />}
                        />
                      </Card.Title>
                      <Card.Text
                        style={{
                          fontSize: "13px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          lineHeight: "16px",
                          maxHeight: "32px",
                          WebkitLineClamp: "2",
                          WebkitBoxOrient: "vertical",
                        }}
                        onClick={() => {
                          history.push(`/Book/${element._id}`);
                        }}
                      >
                        {element.description}
                      </Card.Text>
                      <Card.Text
                        style={{ fontSize: "13px", textAlign: "left" }}
                      ></Card.Text>
                      <Card.Text
                        style={{ fontSize: "16px" }}
                        onClick={() => {
                          history.push(`/Book/${element._id}`);
                        }}
                      >
                        Price: {element.price} $
                      </Card.Text>
                      <Route
                        
                        path={"/" || "/home"}
                        render={() => <AddCart bookId={element._id} />}
                      />
                      <Card.Text style={{ fontSize: "13px" }}>
                        <p>
                          <Route
                            
                            path={"/" || "/home"}
                            render={() => (
                              <Rate
                                bookId={element._id}
                                rateCount={element.rating}
                              />
                            )}
                          />
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </div>
    </div>
  );
};
