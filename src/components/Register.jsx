import { useState } from "react";
import { registerUser } from "../API/index";
import PropTypes from "prop-types";

export default function Register({ setToken }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = await registerUser(formData);
    setToken(token);
    console.log(formData);
  };

  return (
    <div className="form-container">
      <h2 className="register-text">Sign up for Bookbuddy</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          First Name:{" "}
          <input
            name="firstname"
            className="form-container"
            value={formData.firstname}
            onChange={handleChange}
            type="text"
          />
        </label>
        <label>
          Last Name:{" "}
          <input
            name="lastname"
            className="form-container"
            value={formData.lastname}
            type="text"
            onChange={handleChange}
          />
        </label>
        <label>
          Email:{" "}
          <input
            name="email"
            className="form-container"
            value={formData.email}
            type="text"
            onChange={handleChange}
          />
        </label>
        <label>
          Password:{" "}
          <input
            name="password"
            className="form-container"
            value={formData.password}
            type="password"
            onChange={handleChange}
          />
        </label>
        <button className="button" type="submit">
          Register
        </button>
        <p>Login and get reading if you have an account!</p>
        <button className="button" onClick={() => setToken("")}>
          Login!
        </button>
      </form>
    </div>
  );
}

Register.propTypes = {
  setToken: PropTypes.func.isRequired,
};
