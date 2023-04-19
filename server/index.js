import express from "express";
// import { connect } from "mongoose";

import cors from "cors";
import bodyParser from "body-parser";

import Connection from "./database/db.js";
import Routes from "./routes/route.js";

const app = express();
const port = 2000; //port

app.use(cors());

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", Routes);

Connection();
// listening on port 2000
app.listen(port, (err, res) => {
  console.log("server listening ");
});
