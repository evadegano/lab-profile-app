const router = require("express").Router();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User.model");
const { response } = require("express");

const salt = bcrypt.genSaltSync(10);

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post('/', function (req, res, next) {
  res.json({ok: true})
})

// You put the next routes here 👇
router.post("/auth/login", (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then(user => {
      if (!user) {
        res.status(404).json({
          message: "This user does not exist."
        });

        return;
      }

      if (!bcrypt.compareSync(password, user.password)) {
        res.status(405).json({
          message: "Incorrect password."
        });

        return;
      }

      req.session.currentUser = user;
      res.json(user);
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    })
})

router.post("/auth/signup", (req, res, next) => {
  const { username, password, campus, course } = req.body;

  if (!username | !password | !campus | !course) {
    res.status(400).json({
      message: "Please fill in all fields."
    });

    return;
  }

  User.findOne({ username })
    .then(response => {
      if (response) {
        res.status(400).json({
          message: "Username already taken."
        });

        return;
      }

      const hashedPwd = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username: username,
        password: hashedPwd,
        campus: campus,
        course: course
      })

      newUser.save()
        .then(() => {
          req.session.currentUser = newUser;
          res.status(200).json(newUser);
        })
        .catch(err => {
          res.status(400).json({
            message: "Saving user to database went wrong."
          });
        })
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
})

// router.post("/auth/upload", (req, res, next) {
//   const { file } = req.body;

//   User.find({})
// })

router.post("/auth/logout", (req, res, next) => {

})

router.get("/auth/loggedin", (req, res, next) => {
  
})


module.exports = router;
