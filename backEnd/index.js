import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

//Line to to added 
import userRoute from "./routes/userRoute.js";
import commandeRoute from './routes/commandeRoute.js';

const app = express();
app.use(bodyParser.json());
 
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

// Line to be added 
app.use("/user", userRoute);
app.use('/commande', commandeRoute);