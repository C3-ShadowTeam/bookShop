import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { userContext } from "../../App";

export const FavBage = () => {
  const [book, setBook] = useState();
  const [status, setStatus] = useState();

  const state = useContext(userContext);
  const token = state.token;

  const getAllFavo = () => {
    axios
      .get("https://c3-bookshop.herokuapp.com/favorite/getAllFav/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBook(res.data.message);
      })
      .catch((err) => {
        setBook([]);
      });
  };

  useEffect(() => {
    getAllFavo();
  }, []);

  const deleteBook = (id) => {
    axios
      .delete(`https://c3-bookshop.herokuapp.com/favorite/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        getAllFavo();
        setStatus(<div>{`Success deleted the book with id=>${id}`}</div>);
      })
      .catch((err) => {
        setStatus(<div>Some thing wrong</div>);
      });
  };

  return (
    <>
      <div className="contaner">
        {!book ? (
          <div>Shopping cart is Empty</div>
        ) : (
          <>
            {book.map((element, i) => {
              return (
                <div className="card">
                  <img src={element.bookId.image} className="img9" />
                  <h3>{element.bookId.name}</h3>
                  <p class="price231">Price: {element.bookId.price}JD</p>
                  <p>
                    <button
                      onClick={() => {
                        deleteBook(element._id, element.bookId._id);
                      }}
                    >
                      Remove Item
                    </button>
                  </p>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};
