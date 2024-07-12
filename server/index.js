import express from "express";
import connectDB from "./config/connectDB.js";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index.js";
import { cloudinaryConfig } from "./config/cloudinaryConfig.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/*", cloudinaryConfig);

app.use("/api", routes);

app.listen(7777, () => {
    console.log("Server is running on port 7777! 🚀");
    console.log("Waiting for MongoDB to connect...");
    connectDB();
});
