import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../API/index";
import PropTypes from "prop-types";

export default function Login({ setToken }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await loginUser(credentials);
      setToken(token);
      navigate("/account");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-main-container">
      <h2 className="login-text">Login please</h2>
      <form className="login-form-container" onSubmit={handleSubmit}>
        <label>
          Email:{" "}
          <input
            name="email"
            value={credentials.email}
            type="text"
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:{" "}
          <input
            name="password"
            value={credentials.password}
            type="password"
            onChange={handleChange}
          />
        </label>
        <button className="button" type="submit">
          Login
        </button>
        <button className="button" onClick={() => navigate("/signup")}>
          Signup
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
