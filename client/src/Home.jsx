import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <h1>Welcome to our website</h1>
      <Link to="/register">REGISTER</Link>
      <Link to="/login">LOGIN</Link>
    </>
  );
}

export default Home;
