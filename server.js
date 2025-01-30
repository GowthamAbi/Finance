const mongoose = require("mongoose");
const app = require("./app");
const { MONGODB_URL, PORT } = require("./utils/config");
require("dotenv").config();
console.log(`Connecting to the database...`);

//Connect to Data Base
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Database  Connected");
    //app connect to Database
    app.listen(PORT, "127.0.0.1", () => {
      console.log(`Server running @ http://127.0.0.1:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error connecting to the database: ${error}`);
  });
