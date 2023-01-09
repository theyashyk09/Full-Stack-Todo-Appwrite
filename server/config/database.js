const mongoose = require("mongoose");
const { MONGODBURL } = process.env;

const connectionToDb = () => {
  mongoose
    .connect(MONGODBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((cnct) => {
      console.log("Database connected successfully");
      console.log(`Hosting at ${cnct.connection.host}`);
    })
    .catch((error) => {
      console.log("Database connection failed");
      console.log(error.message);
      process.exit(1);
    });
};

module.exports = connectionToDb;
