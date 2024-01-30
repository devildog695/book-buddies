import { useEffect, useState } from "react";
import { fetchAllBooks } from "../API";
import { useNavigate } from "react-router-dom";

export default function GetAllBooks() {
  const [search, setSearch] = useState({ title: "", author: "" });
  const [storedBooks, setStoredBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBooks() {
      try {
        const allBooks = await fetchAllBooks();
        setStoredBooks(allBooks);
      } catch (err) {
        console.error(err);
      }
    }
    fetchBooks();
  }, []);

  const filterBooks = (book) => {
    const { title, author } = search;
    const titleMatch = book.title.toLowerCase().includes(title.toLowerCase());
    const authorMatch = book.author
      .toLowerCase()
      .includes(author.toLowerCase());
    return titleMatch && authorMatch;
  };

  return (
    <div className="container-main">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title..."
          value={search.title}
          onChange={(e) => setSearch({ ...search, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Search by author..."
          value={search.author}
          onChange={(e) => setSearch({ ...search, author: e.target.value })}
        />
      </div>
      <div id="books-container">
        {storedBooks.filter(filterBooks).map((book) => (
          <div className="cards" key={book.id}>
            <h2>{book.title}</h2>
            <h2>By: {book.author}</h2>
            <img src={book.coverimage} alt={`Cover for ${book.title}`} />
            <button
              className="button"
              onClick={() => {
                navigate(`/books/${book.id}`);
              }}
            >
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
