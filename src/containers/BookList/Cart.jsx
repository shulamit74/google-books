import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeBook } from "./bookListSlice";
import BookRow from "../../components/BookRow/BookRow";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  return (
    <div className="mainPage">
      <header className="header">
        <div>Cart</div>
        <button className="addButton" onClick={() => navigate("/")}>
          Back
        </button>
      </header>

      <div className="bookList">
        {Object.keys(cart).length > 0 ? (
          Object.keys(cart).map((key, idx) => (
            <div className="bookItem" key={idx}>
              <BookRow
                selected={true}
                book={cart[key]}
                removeFromCart={() => dispatch(removeBook({ id: key }))}
              />
            </div>
          ))
        ) : (
          <div>Empty cart</div>
        )}
      </div>
    </div>
  );
};

export default Cart;
