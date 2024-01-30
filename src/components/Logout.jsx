import PropTypes from "prop-types";

export default function Logout({ onLogout }) {
  const handleLogout = () => {
    onLogout();
  };

  return <button onClick={handleLogout}>Logout</button>;
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
};
