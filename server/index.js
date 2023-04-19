import express from "express";
import Connection from "./database/db.js";
import { connect } from "mongoose";

const app = express();
const port = 2000; //port
Connection();
app.get("/", (req, res) => {
  res.send("<h1>API started successfully</h1>");
});

app.listen(port, (err, res) => {
  console.log("server listening ");
});
