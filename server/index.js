import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { employeeModel } from "./models/employee.js";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/login_register");

app.get("/", (req, res) => {
  res.send("welcome to make it use and login authentication project.");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      employeeModel
        .create({ name, email, password: hash })
        .then((employee) => res.json(employee))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  employeeModel
    .findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (err) {
            console.log(err);
          }
          if (response) {
            res.json("success");
          } else {
            res.json("the password is incorrect");
          }
        });
      } else {
        res.json("No record existed");
      }
    })
    .catch((err) => console.log("Error: ", err));
});

app.listen(port, () => {
  console.log("Server is running on port: ", port);
});
