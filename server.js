import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import connectToMongoDB from "./db.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";

dotenv.config();

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

connectToMongoDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
