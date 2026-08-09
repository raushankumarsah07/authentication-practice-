import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/login", { email, password })
      .then((result) => {
        if (result.data === "success") {
          navigate("/dashboard");
        }
      })
      .catch((err) => console.log("Error: ", err));
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h1 class="h3 mb-3 fw-normal text-center">LOGIN</h1>
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
          Login
        </button>
        <p class="mt-1 mb-2 text-body-secondary text-center">
          © 2017-{new Date().getFullYear()}
        </p>
      </form>
      <p class="text-center">no account</p>
      <Link
        to="/register"
        class="btn btn-outline-info w-100 py-2 m-1"
        type="submit"
      >
        Register
      </Link>
    </div>
  );
}
export default Login;
