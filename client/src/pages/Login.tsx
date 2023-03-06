import { Button, Grid, Paper, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type Props = {
  setUser: (user: any) => void;
};

const Login = ({ setUser }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Handle login form submission
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const req = Object.fromEntries(formData.entries());
    console.log("submitting: " + JSON.stringify(req));
    fetch("http://localhost:5000/api/user/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .then((data) => {
        // If login is successful, set user and navigate to home page
        console.log(data);
        if (data.token) {
          setUser(req);
          localStorage.setItem("token", data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Paper sx={{ m: 4, backgroundColor: "#ffffff", borderRadius: "16px" }}>
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        padding={4}
        spacing={2}
        direction="column"
        paddingBottom={10}
      >
        <Grid item alignItems={"center"} paddingY={1}>
          <Typography color={"black"} fontSize={28} fontWeight={600}>
            {t("login")}
          </Typography>
        </Grid>
        <Box component="form" onSubmit={submitHandler}>
          <Grid item paddingY={1}>
            <TextField
              label={t("email")}
              name="email"
              variant="outlined"
              color="secondary"
              focused
              sx={{ input: { color: "black" } }}
              type="email"
              required
            />
          </Grid>
          <Grid item paddingY={1}>
            <TextField
              label={t("password")}
              name="password"
              variant="outlined"
              color="secondary"
              focused
              sx={{ input: { color: "black" } }}
              type="password"
              required
            />
          </Grid>
          <Grid item paddingY={1}>
            <Button color={"secondary"} variant="contained" type="submit">
              <Typography fontWeight={"600"} textTransform={"none"}>
                {t("login")}
              </Typography>
            </Button>
          </Grid>
        </Box>
      </Grid>
    </Paper>
  );
};

export default Login;
