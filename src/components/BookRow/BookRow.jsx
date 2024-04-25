import React from "react";
import "./styles.css";

const BookRow = ({ book, addToCart, removeFromCart, selected }) => {
  const title = book.volumeInfo?.title;
  return (
    <div className="book" title={title}>
      <img src={book.volumeInfo?.imageLinks?.smallThumbnail} alt={title} />
      <div className="titleWrapper">
        <div className="title">
          {title}
        </div>
      </div>
      {selected ? (
        <button onClick={removeFromCart}> Remove from cart</button>
      ) : (
        <button onClick={addToCart}>+ Add to cart</button>
      )}
    </div>
  );
};

export default BookRow;
