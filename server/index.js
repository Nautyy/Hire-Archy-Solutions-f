import express from "express";
import connectDB from "./config/connectDB.js";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

import { cloudinaryConfig } from "./config/cloudinaryConfig.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/*", cloudinaryConfig);
app.use(express.static(path.join(__dirname, "../src")));

app.use("/api", routes);
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../src/404.html"));
});

// Use the PORT environment variable provided by Render, or default to 7777 locally
const PORT = process.env.PORT || 7777;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}! 🚀`);
    console.log("Waiting for MongoDB to connect...");
    connectDB();
});
