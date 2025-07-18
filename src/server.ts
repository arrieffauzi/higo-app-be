import mongoose from "mongoose";
import app from "./app";
import config from "./config/config";
import { getEnv } from "./libs/getEnv";

const DB_URL =
  "mongodb+srv://higo-user:R7x7rt7ptAwZq3cg@higocluster.tyioape.mongodb.net/higo_db?retryWrites=true&w=majority&appName=HigoCluster";

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("MongoDB Atlas connected");
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
