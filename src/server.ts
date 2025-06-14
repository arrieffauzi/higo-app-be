import mongoose from "mongoose";
import app from "./app";
import config from "./config/config";
import { getEnv } from "./libs/getEnv";

const DB_URL = getEnv("DB_URL");

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("MongoDB Atlas connected");
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
