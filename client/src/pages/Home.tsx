import { Box, Button, Card, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";
import { marked } from "marked";

const Home = () => {
  // Highlight code
  useEffect(() => {
    hljs.highlightAll();
  });
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Fetch all posts
  useEffect(() => {
    async function fetchAll() {
      fetch("http://localhost:5000/api/post/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setData(data.posts);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    fetchAll();
  }, []);

  // Navigate to post page
  const handleClick = (id: string) => {
    navigate(`/post/${id}`);
  };

  return (
    <Box>
      {data ? (
        data.map((post: any) => {
          return (
            <Card
              sx={{
                m: 4,
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: 4,
              }}
              key={post._id}
            >
              <Typography color="primary" fontSize={24} fontWeight={600}>
                {post.title}
              </Typography>
              <Paper sx={{ padding: 2 }}>
                {/* Highlight code */}
                <div
                  dangerouslySetInnerHTML={{ __html: marked(post.content) }}
                />
              </Paper>
              <Typography color="primary">{`${t("by")}: ${
                post.author
              }`}</Typography>
              <Typography color="primary">{`${t("votes")}: ${
                post.votes
              }`}</Typography>
              <Typography color="primary">{`${post.comments.length} ${t(
                "comments"
              )}`}</Typography>
              <Button
                color={"secondary"}
                variant="contained"
                onClick={() => {
                  handleClick(post._id);
                }}
              >
                <Typography fontWeight={"600"} textTransform={"none"}>
                  {t("show")}
                </Typography>
              </Button>
            </Card>
          );
        })
      ) : (
        <Box>{t("loading")}</Box>
      )}
    </Box>
  );
};

export default Home;
