const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Databse connected successfullly");
    })
    .catch((err) => {
      console.log("error in databse connection");
    });
};

module.exports = dbConnect;
