require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("./db/connect");
const router = require("./Routes/router");
const PORT = 1000;

// middleware
app.use(express.json());
app.use(cors());
app.use(router);


app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server start at port no. ${PORT}`);
});
