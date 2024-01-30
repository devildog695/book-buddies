import { useEffect, useState, useCallback } from "react";
import { checkoutBook, fetchSingleBook } from "../API";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

export default function SingleBook({ token, fetchUser }) {
  const [book, setBook] = useState([]);
  const param = useParams();
  const navigate = useNavigate();

  const fetchBook = useCallback(async () => {
    try {
      const singleBook = await fetchSingleBook(param.bookId);
      setBook(singleBook);
      console.log(singleBook);
    } catch (err) {
      console.error(err);
    }
  }, [param.bookId]);

  async function handleCheckout() {
    try {
      await checkoutBook(book.id, token);
      await fetchUser();
      await fetchBook();
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  return (
    <>
      <div id="books-container">
        <div className="cards">
          <h2>{book.title}</h2>
          <h3>{book.author}</h3>
          <img
            src={book.coverimage}
            alt={`This is the cover artwork for ${book.title}`}
          />
          <h4>{book.description}</h4>
          <p>
            Book is currently: <span></span>
            {book.available ? <strong>Available</strong> : "Checked out"}
          </p>
          {!token && book.available ? (
            <button
              className="button"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login to checkout...
            </button>
          ) : token && book.available ? (
            <button className="button" onClick={handleCheckout}>
              Checkout book
            </button>
          ) : null}
          <button
            className="button"
            onClick={() => {
              navigate("/");
            }}
          >
            Back to Library
          </button>
        </div>
      </div>
    </>
  );
}

SingleBook.propTypes = {
  token: PropTypes.string.isRequired,
  fetchUser: PropTypes.func.isRequired,
};
