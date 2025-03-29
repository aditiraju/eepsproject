import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "15px", backgroundColor: "#282c34", color: "white", textAlign: "center" }}>
      <Link to="/" style={{ margin: "15px", color: "white", textDecoration: "none" }}>Home</Link>
      <Link to="/climate-data" style={{ margin: "15px", color: "white", textDecoration: "none" }}>Climate Data</Link>
      {/* <Link to="/solutions" style={{ margin: "15px", color: "white", textDecoration: "none" }}>Solutions</Link> */}
      {/* <Link to="/about" style={{ margin: "15px", color: "white", textDecoration: "none" }}>About</Link> */}
    </nav>
  );
};

export default Navbar;
