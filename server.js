import express from "express";
import notFoundMiddleware from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";

const app = express();

app.get("/", (req, res) => {
  throw new Error("hahahaha");
  res.send("welcome haha");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
