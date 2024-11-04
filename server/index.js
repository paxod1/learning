import express from "express";
import { connectDB } from "./config/db.js";
import { apiRouter } from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
const port = 3000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173","https://learning-dashboard-client.vercel.app"],
    credentials:true,
    methods:["GET","POST","PUT","DELETE","OPTIONS"]
  }
  ));
app.use(cookieParser());



connectDB();
console.log("Hello");

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})