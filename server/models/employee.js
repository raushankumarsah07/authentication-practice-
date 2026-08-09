import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

export const employeeModel = mongoose.model("employee", employeeSchema);
