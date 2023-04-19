import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
//get envs variable
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const Connection = () => {
  const MONGOOSE_URL = `mongodb+srv://${USERNAME}:${PASSWORD}@todolist-db.ft1aaor.mongodb.net/?retryWrites=true&w=majority`;

  mongoose.connect(MONGOOSE_URL, { useNewUrlparser: true });

  mongoose.connection.on("connected", function () {
    console.log("Database connection successful");
  });

  mongoose.connection.on("disconnect", () => {
    console.log("Database connection disconnected");
  });
  mongoose.connection.on("error", () => {
    console.log("Database connection error");
  });
};

export default Connection;
