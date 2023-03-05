import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type Props = {
  setUser: (user: any) => void;
};

const Register = ({ setUser }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Handle login form submission
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const req = Object.fromEntries(formData.entries());
    console.log("submitting: " + JSON.stringify(req));
    fetch("http://localhost:5000/api/user/register", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.user) {
          navigate("/login");
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
        <Grid item alignItems={"center"}>
          <Typography color={"black"} fontSize={28} fontWeight={600}>
            {t("register")}
          </Typography>
        </Grid>
        <Box component="form" onSubmit={submitHandler}>
          <Grid item>
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
          <Grid item>
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
          <Grid item>
            <Button color={"secondary"} variant="contained" type="submit">
              <Typography fontWeight={"600"} textTransform={"none"}>
                {t("register")}
              </Typography>
            </Button>
          </Grid>
        </Box>
      </Grid>
    </Paper>
  );
};

export default Register;
