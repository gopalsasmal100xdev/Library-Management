/**
 * Imports
 */
const express = require("express");
const env = require("dotenv").config();
const ConnectDB = require("./models/connectMongoDB");
const Home = require("./Routes/home.routes");
const path = require("path");
// const cookieParser = require("cookieParser");
const Profile = require("./Routes/profile.routes");
const Login = require("./Routes/login.routes");
const Card = require("./Routes/card.routes");
const Register = require("./Routes/register.routes");
const Books = require("./Routes/book.routes");
const session = require("express-session");
const Logout = require("./Routes/logout.routes");
const Return = require("./Routes/return.routes");
const CardLogin = require("./Routes/cardLogin.routes");
const CreateBook = require("./Routes/createBook.routes");
/**
 * Constant variables
 */
const app = express();
const PORT = process.env.PORT || 8080;

/**
 * Middleware
 */

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SECRET_CODE,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);
/**
 * Routes
 */
app.use("/", Home);
app.use("/profile", Profile);
app.use("/login", Login);
app.use("/card", Card);
app.use("/register", Register);
app.use("/books", Books);
app.use("/logout", Logout);
app.use("/cardLogin", CardLogin);
app.use("/return", Return);
app.use("/createBook", CreateBook);
/**
 * Listening
 */

(async () => {
  try {
    ConnectDB(process.env.MOGODB_URI);
    app.listen(PORT, (err) => {
      const starterText = err
        ? `Error in starting server on  port ${PORT}`
        : `Server started at port http://localhost:${PORT}`;
      console.log(starterText);
    });
  } catch (error) {
    console.log(`Could't connect to server: ${error.message}`);
  }
})();
