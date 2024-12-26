const express = require("express");
const cors = require("cors");
const connect = require("./lib/db.js");
// const authenticateToken = require("../middlewares/authMiddleware");


const app = express();


app.use(cors());
app.use(express.json());

const fetchDataRoute = require("./routes/fetchDataRoute.js");
const userRoute = require("./routes/userRoute.js");


app.use("/formData", fetchDataRoute);
app.use("/user", userRoute);




const start = async () => {
  try {
    app.listen(4000, () => {
      console.log(`Server listening to port : 4000`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};


  
  start();
  connect()



