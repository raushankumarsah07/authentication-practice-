import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/register", { name, email, password })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => console.log("Error: ", err));
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h1 class="h3 mb-3 fw-normal text-center">REGISTER</h1>
        <div class="form-floating">
          <input
            type="text"
            class="form-control w-100 m-1"
            id="floatingInput"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
          <label for="floatingInput">Name</label>
        </div>
        <div class="form-floating">
          <input
            type="email"
            class="form-control w-100 m-1"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control w-100 m-1"
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label for="floatingPassword">Password</label>
        </div>
        <button class="btn btn-outline-primary w-100 py-2 m-1" type="submit">
          Register
        </button>
        <p class="mt-1 mb-2 text-body-secondary text-center">
          © 2017-{new Date().getFullYear()}
        </p>
      </form>
      <p class="text-center">Have an account</p>
      <Link
        to="/login"
        class="btn btn-outline-success w-100 py-2 m-1"
        type="submit"
      >
        Login
      </Link>
    </div>
  );
}
export default Signup;
