import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import connectToMongoDB from "./db.js";

dotenv.config();

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

connectToMongoDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      return console.log("Server running....");
    });
  })
  .catch((err) => {
    console.log(err);
  });
