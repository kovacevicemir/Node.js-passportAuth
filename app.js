const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { Mongoose } = require("mongoose");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");

const app = express();

//DB Config
const db = require("./config/keys").MongoURI;

//connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("mgdb connected"))
  .catch((err) => console.log(err));

//Midlewares:
//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//BodyParser -> need this in order to request data from form body... req.body
app.use(express.urlencoded({ extended: false }));

//Express Session
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

//Connect flash
app.use(flash());

//GLOBAL VARS
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.POPRT || 5000;

app.listen(PORT, console.log(`server started on port ${PORT}`));
