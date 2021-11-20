import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, useParams } from "react-router";
import { Button, Image, Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./onebook.css";

export const OneBook = () => {
  window.scrollTo(0, 0)
  let idd = useParams().id;
  const [book, setBook] = useState();
  const [type, setType] = useState([]);

  useEffect(() => {
    axios
      .get(`https://c3-bookshop.herokuapp.com/books/Book/${idd}`)
      .then((result) => {
        setBook(result.data.book[0]);

        console.log("typeee", result.data.book[0].type);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  useEffect(async () => {
    await axios
      .get(
        `https://c3-bookshop.herokuapp.com/books/typeOfBook/${
          book && book.type
        }`
      )
      .then(async (result) => {
        console.log("cta", result.data.book);
        await setType(result.data.book);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  return (
    <div className="container">
      <div style={{ display: "flex" }}>
        <div className="imgDetails">
          <Container>
            <Row>
              <Col>
                <Image src={book && book.image} thumbnail />
              </Col>
            </Row>
          </Container>
          <p className="nameBook">{book && book.name}</p>

          <Button
            variant="outline-warning"
            style={{ width: "150px", margin: "auto", fontWeight: "bold" }}
          >
            Add to cart
          </Button>
        </div>
        <div className="detailss">
          <label className="labelBook">About Book</label>
          <p className="descriptionBook">{book && book.description}</p>
          <label> Book type</label>
          <p>{book && book.type} </p>
        </div>
      </div>
    </div>
  );
};
