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
  .connect("mongodb+srv://karanrajeshirke11:ANRka83x4rJxTuhq@cluster0.kyfgan5.mongodb.net/mern-task?retryWrites=true&w=majority&appName=Cluster0")
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
