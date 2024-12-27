const express = require("express");
const cors = require("cors");
const connect = require("./lib/db.js");
const axios = require("axios")
// const authenticateToken = require("../middlewares/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

const fetchDataRoute = require("./routes/fetchDataRoute.js");
const userRoute = require("./routes/userRoute.js");

app.use("/formData", fetchDataRoute);
app.use("/user", userRoute);

app.get("/call", async (req, res, next) => {
  console.log("calling");
});

const start = async () => {
  try {
    app.listen(4000, () => {
      console.log(`Server listening to port : 4000`);
    });
  } catch (err) {
    console.log(err);
  }
};

setInterval(() => {
  axios
    .get("http://localhost:4000/call")
    .then((response) => {
      console.log("Response from /call:", response.data);
    })
    .catch((error) => {
      console.error("Error calling /call:", error.message);
    });
}, 10000);

start();
connect();
