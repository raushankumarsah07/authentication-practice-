import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3000/dashboard")
      .then((result) => {
        if (result.data === "success") {
          navigate("/dashboard");
        }
      })
      .catch((err) => console.log("Error: ", err));
  }, []);
  return <h1>Welcome to succes of authentication project</h1>;
}

export default Dashboard;
