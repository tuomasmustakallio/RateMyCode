import validateToken from "@/auth/validateToke";
import express from "express";
const router = express.Router();
import Post, { IPost } from "../models/Post";

//Return all posts
router.get("/all", function (_req, res, _next) {
  Post.find()
    .then((posts) => {
      return res.status(200).json({ posts });
    })
    .catch((err: Error) => {
      console.log(err);
      throw err;
    });
});

//Return a single post
router.get("/:id", function (req, res, _next) {
  Post.findById(req.params.id)
    .then((post) => {
      return res.status(200).json({ post });
    })
    .catch((err: Error) => {
      console.log(err);
      throw err;
    });
});

//Create a new post
router.post("/new", validateToken, function (req, res, _next) {
  Post.create({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    votes: 0,
    voters: [],
    comments: [],
  })
    .then((post: IPost) => {
      return res.status(200).json({ post });
    })
    .catch((err: Error) => {
      console.log(err);
      throw err;
    });
});

//Upvote post check if user has already voted
router.put("/upvote/:id", validateToken, function (req, res, _next) {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        if (post.voters.includes(req.body.userId)) {
          return res.status(403).json({ message: "You have already voted" });
        } else {
          post.votes += 1;
          post.voters.push(req.body.userId);
          post.save();
          return res.status(200).json({ post });
        }
      } else {
        return res.status(404).json({ message: "Post not found" });
      }
    })
    .catch((err: Error) => {
      console.log(err);
      throw err;
    });
});

//Add comment to post
router.put("/comment/:id", validateToken, function (req, res, _next) {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        post.comments.push(req.body.comment);
        post.save();
        return res.status(200).json({ post });
      } else {
        return res.status(404).json({ message: "Post not found" });
      }
    })
    .catch((err: Error) => {
      console.log(err);
      throw err;
    });
});

export default router;
