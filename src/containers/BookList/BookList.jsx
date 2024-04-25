import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBook, removeBook } from "./bookListSlice";
import BookRow from "../../components/BookRow/BookRow";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const booksUrl =
  "https://www.googleapis.com/books/v1/volumes?q=cyber&orderBy=newest";

const BookList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);

  const [books, setBooks] = useState([]);
  const [loadMessage, setLoadMessage] = useState("Loading...");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setStartIndex((pageNumber - 1) * booksPerPage);
  };

  const handleBooksPerPageChange = (e) => {
    const newBooksPerPage = parseInt(e.target.value);
    const newStartIndex = Math.floor(
      (startIndex * booksPerPage) / newBooksPerPage
    );
    setBooksPerPage(newBooksPerPage);
    setStartIndex(newStartIndex);
  };

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        let maxResults = booksPerPage;
        if (booksPerPage === 50) {
          const response1Promise = fetch(
            `${booksUrl}&startIndex=${startIndex}&maxResults=40`
          );
          const response2Promise = fetch(
            `${booksUrl}&startIndex=${startIndex + 40}&maxResults=10`
          );

          const [response1, response2] = await Promise.all([
            response1Promise,
            response2Promise,
          ]);

          const [bookJson1, bookJson2] = await Promise.all([
            response1.json(),
            response2.json(),
          ]);

          const items1 = bookJson1.items || [];
          const items2 = bookJson2.items || [];
          setBooks([...items1, ...items2]);
          return;
        }

        const response = await fetch(
          `${booksUrl}&startIndex=${startIndex}&maxResults=${maxResults}`
        );
        const bookJson = await response.json();
        const items = bookJson.items || [];
        setBooks(items);
      } catch (e) {
        setLoadMessage(`Request failed: ${e.message}. Reload to retry.`);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [currentPage, booksPerPage, startIndex]);

  return (
    <div className="mainPage">
      <header className="header">
        <div>My Bookstore</div>
        <button className="addButton" onClick={() => navigate("/cart")}>
          Cart
        </button>
        <div className="pagination">
          <span>Show: </span>
          <select value={booksPerPage} onChange={handleBooksPerPageChange}>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={50}>50</option>
          </select>
          <span> books per page</span>
        </div>
      </header>

      <div className="bookList">
        {books.length > 0 ? (
          books.map((book, idx) => (
            <div className="bookItem" key={idx}>
              <BookRow
                selected={cart[book.id]}
                book={book}
                removeFromCart={() => dispatch(removeBook({ id: book.id }))}
                addToCart={() => dispatch(addBook({ id: book.id, info: book }))}
              />
            </div>
          ))
        ) : (
          <div>{loading ? loadMessage : "No books available."}</div>
        )}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={books.length < booksPerPage || loading}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookList;
