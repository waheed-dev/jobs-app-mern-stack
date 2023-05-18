import express from "express";
import notFoundMiddleware from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";
import dotenv from "dotenv";
import connectDb from "./db/connect.js";
import authRoutes from "./routes/authRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";
import morgan from 'morgan'
dotenv.config();
const app = express();
import 'express-async-errors'
import authenticateUser from "./middlewares/auth.js";
import  {dirname} from 'path'
import {fileURLToPath} from 'url'
import path from 'path'
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
app.use(express.json());
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname,'./client/dist')))

app.use("/api/v1/jobs",jobsRoutes);
app.use("/api/v1/auth", authRoutes);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname,'./client/dist', 'index.html'))
});
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
