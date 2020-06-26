const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

//user model
const User = require("../models/User");
const { unsubscribe } = require(".");

//Login page
router.get("/login", (req, res) => res.render("Login"));

//Register
router.get("/register", (req, res) => res.render("register"));

//Register Handle
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "please fill in all fields" });
  }

  //check passwords match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  //Check if password > 6
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    //if validation is ok

    //check if user already exists
    User.findOne({ email }).then((user) => {
      if (user) {
        errors.push({ msg: `User with ${email} already exists` });
        res.render("register", {
          errors,
          password,
          password2,
          email,
          name,
        });
      } else {
        const newUser = new User({
          email,
          name,
          password,
        });

        //Hash password with bcrypt
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            //Set password to hashed
            newUser.password = hash;

            //Save user to db
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered, please log in"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

//Login Handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

module.exports = router;

//Logout Handle
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});
