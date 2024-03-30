import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from './routes/authRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import eventModel from "./models/eventModel.js";
import userModel from "./models/userModel.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes)
app.use('/api/event',eventRoutes)


mongoose
  .connect("mongodb://localhost:27017/eventDB")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
