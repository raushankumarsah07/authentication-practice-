import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { employeeModel } from "./models/employee.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  }),
);
app.use(cookieParser());

const uri = process.env.MONGO_URI;
mongoose.connect(uri);

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.json("the token wat not available");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json("token is wrong");
      }
      next();
    });
  }
};

app.get("/dashboard", verifyUser, (req, res) => {
  return res.json("success");
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
            const token = jwt.sign({ email: user.email }, "jwt-secret-key", {
              expiresIn: "1d",
            });
            res.cookie("token", token);
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
