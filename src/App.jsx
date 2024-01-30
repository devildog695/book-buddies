import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "./API";
import Navigations from "./components/Navigations";
import SingleBook from "./components/SingleBook";
import Account from "./components/Account";
import Login from "./components/Login";
import Register from "./components/Register";
import Books from "./components/Books";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      const nextUser = await getUser(token);
      setUser(nextUser);
    };

    fetchUser();
  }, [token]);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <>
      <Navigations onLogout={handleLogout} isLoggedIn={!!token} />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/books/:bookId" element={<SingleBook token={token} />} />
        {token && (
          <>
            <Route
              path="/account"
              element={<Account token={token} user={user} />}
            />
          </>
        )}
        {!token && (
          <>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route
              path="/register"
              element={<Register setToken={setToken} />}
            />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
