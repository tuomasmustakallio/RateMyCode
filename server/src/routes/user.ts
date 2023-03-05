import express from "express";
const router = express.Router();
import { body, validationResult } from "express-validator";
import User, { IUser } from "../models/User";
const bcrypt = require("bcrypt");
import jwt from "jsonwebtoken";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });

//Register a new user
router.post(
  "/register",
  body("email").isEmail().trim().escape(),
  body("password").isLength({ min: 3 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          return res.status(403).json({ email: "Email already in use." });
        } else {
          User.create({
            email: req.body.email,
            password: req.body.password,
          })
            .then((user: IUser) => {
              return res.status(200).json({ user });
            })
            .catch((err: Error) => {
              console.log(err);
              throw err;
            });
        }
      })
      .catch((err: Error) => {
        console.log(err);
        throw err;
      });
  }
);

//Login a user
router.post("/login", upload.none(), (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(403).json({ message: "Login failed :(" });
      } else {
        console.log(req.body.password, user.password);
        if (req.body.password === user.password) {
          const jwtPayload = {
            id: user._id,
            email: user.email,
          };
          jwt.sign(
            jwtPayload,
            process.env.SECRET as string,
            {
              expiresIn: 120,
            },
            (err, token) => {
              res.json({ success: true, token });
            }
          );
        } else {
          return res.status(403).json({ message: "password did not match" });
        }
      }
    })
    .catch((err: Error) => {
      console.log(err);
      throw err;
    });
});

export default router;
