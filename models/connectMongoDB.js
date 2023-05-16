const mongoose = require("mongoose");

function ConnectDB(url) {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(url)
    .then((db) => {
      console.log(`Mongodb connections established`);
    })
    .catch((err) => {
      console.log(`Mongodb connection error: ${err}`);
    });
}

module.exports = ConnectDB;
