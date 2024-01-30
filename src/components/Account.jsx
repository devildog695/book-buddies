import { useNavigate } from "react-router-dom";
import { deleteReservation } from "../API";
import PropTypes from "prop-types";

export default function Account({ user, fetchUser, token }) {
  const navigate = useNavigate();
  async function returnBook(bookId) {
    try {
      await deleteReservation(bookId, token);
      await fetchUser();
    } catch (err) {
      console.error(err);
    }
  }

  if (!user) {
    return (
      <div className="account-text">
        <p>You must be logged in!</p>
        <button
          className="button"
          type="button"
          onClick={() => {
            navigate("/register");
          }}
        >
          Signup!
        </button>
      </div>
    );
  }

  return (
    <div className="account-container">
      <p>{user.firstname}</p>
      <p>{user.lastname}</p>
      <p>{user.id}</p>
      <p>{user.email}</p>
      {user.books.map((book, index) => (
        <div key={index}>
          <p>{book.title}</p>
          <button
            className="button"
            onClick={() => {
              returnBook(book.id);
            }}
          >
            Return
          </button>
        </div>
      ))}
    </div>
  );
}

Account.propTypes = {
  user: PropTypes.object,
  fetchUser: PropTypes.func.isRequired,
  token: PropTypes.string,
};
