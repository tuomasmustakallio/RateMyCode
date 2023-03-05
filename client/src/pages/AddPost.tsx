import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type Props = {
  user: any;
};

const AddPost = ({ user }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Handle form submission
  const submitHandler = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const req = {
      title: formData.get("title"),
      content: formData.get("content"),
      author: user.email,
    };
    console.log("submitting: " + JSON.stringify(req));
    fetch("http://localhost:5000/api/post/new", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .then((data) => {
        //If post is created successfully, navigate to the post page
        console.log(data);
        navigate("/post/" + data.post._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Paper sx={{ m: 4, backgroundColor: "#ffffff", borderRadius: "16px" }}>
      <Grid container padding={4} direction="column">
        <Grid item paddingY={2}>
          <Typography color="primary" fontSize={24} fontWeight={600}>
            {t("addPost")}
          </Typography>
        </Grid>
        <Box component="form" onSubmit={submitHandler}>
          <Grid item paddingY={2}>
            <TextField
              name="title"
              label={t("title")}
              variant="outlined"
              color="secondary"
              focused
              sx={{ input: { color: "black" } }}
              type="text"
              required
            />
          </Grid>
          <Grid item paddingY={2}>
            <TextField
              name="content"
              label={t("content")}
              variant="outlined"
              color="secondary"
              focused
              type="text"
              required
              multiline={true}
              rows={10}
              placeholder={"```typescript \n console.log('Hello World') \n```"}
              inputProps={{ style: { color: "black" } }}
              sx={{ input: { color: "black" }, width: "100%" }}
            />
          </Grid>
          <Grid item paddingY={2}>
            <Button color={"secondary"} variant="contained" type="submit">
              <Typography fontWeight={"600"} textTransform={"none"}>
                {t("addPost")}
              </Typography>
            </Button>
          </Grid>
        </Box>
      </Grid>
    </Paper>
  );
};

export default AddPost;
