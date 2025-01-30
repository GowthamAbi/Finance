require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const secret_key = process.env.secret_key;

module.exports = {
  MONGODB_URL,
  PORT,
  secret_key,
};
