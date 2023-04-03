import express from "express";
import notFoundMiddleware from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";
import dotenv from "dotenv";
import connectDb from "./db/connect.js";
import authRoutes from "./routes/authRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";
dotenv.config();
const app = express();
import 'express-async-errors'
app.use(express.json());
app.get("/", (req, res) => {
  res.send("welcome haha");
});
app.use("/api/v1/jobs", jobsRoutes);
app.use("/api/v1/auth", authRoutes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is running on ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
