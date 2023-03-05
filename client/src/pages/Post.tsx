import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import IconButton from "@mui/material/IconButton";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";
import { marked } from "marked";

type PostType = {
  _id: string;
  title: string;
  content: string;
  author: string;
  votes: number;
  voters: string[];
  comments: string[];
};

const Post = () => {
  useEffect(() => {
    hljs.highlightAll();
  });
  const { id } = useParams();
  const [data, setData] = useState<PostType>();
  const [comment, setComment] = useState("");
  const { t } = useTranslation();

  // Fetch post
  useEffect(() => {
    async function getPost() {
      fetch(`http://localhost:5000/api/post/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setData(data.post);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    getPost();
  }, [id]);

  // Upvote post
  const handleUpvote = (id: string) => {
    fetch(`http://localhost:5000/api/post/upvote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setData(data.post);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChange = (e: any) => {
    setComment(e.target.value);
  };

  // Add comment
  const addComment = () => {
    fetch(`http://localhost:5000/api/post/comment/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ comment }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setData(data.post);
        setComment("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Box>
      {data ? (
        <Paper
          sx={{
            m: 4,
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: 4,
          }}
        >
          <Typography color="primary" fontSize={24} fontWeight={600}>
            {data.title}
          </Typography>
          <Paper sx={{ padding: 2 }}>
            <div dangerouslySetInnerHTML={{ __html: marked(data.content) }} />
          </Paper>
          <Typography color="primary">{`${t("by")} ${data.author}`}</Typography>
          <Typography color="primary">{`${t("votes")}: ${
            data.votes
          }`}</Typography>
          {/* Only show upvote button if user is logged in */}
          {localStorage.getItem("token") && (
            <IconButton
              aria-label="upvote"
              onClick={() => handleUpvote(data._id)}
            >
              <ArrowCircleUpIcon color={"secondary"} />
            </IconButton>
          )}
          {data.comments.map((comment, i) => (
            <Typography color="primary" key={i}>
              {comment}
            </Typography>
          ))}
          {/* Only show comment box if user is logged in */}
          {localStorage.getItem("token") && (
            <Box>
              <TextField
                variant="outlined"
                color="secondary"
                focused
                sx={{ input: { color: "black" } }}
                onChange={(e) => handleChange(e)}
                value={comment}
              />
              <Button
                color={"secondary"}
                variant="contained"
                onClick={addComment}
              >
                <Typography fontWeight={"600"} textTransform={"none"}>
                  {t("add-comment")}
                </Typography>
              </Button>
            </Box>
          )}
        </Paper>
      ) : (
        <Box>{t("loading")}</Box>
      )}
    </Box>
  );
};

export default Post;
