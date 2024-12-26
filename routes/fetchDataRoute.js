const express = require("express");
const Router = express.Router();
const fs = require("fs");

const data = JSON.parse(fs.readFileSync("./list.json", "utf8"));


Router.get("/states", (req, res) => {
  res.json(data.state);
});

Router.get("/groups", (req, res) => {
  res.json(data.groups);
});




module.exports = Router