import React from "react";
import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ReactComponent as Logo } from "../assets/images/logo.svg";
import LanguageIcon from "@mui/icons-material/Language";
import AddCircleIcon from "@mui/icons-material/AddCircle";

type Props = {
  setUser: (user: any) => void;
};

const Header = ({ setUser }: Props) => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Show language selection menu
  const handleLangClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle language selection
  const handleLangClose = (lng: string) => {
    i18n.changeLanguage(lng);
    setAnchorEl(null);
  };

  // Close language selection menu
  const handleNoLangClose = () => {
    setAnchorEl(null);
  };

  // Log out
  const handleLogOut = () => {
    localStorage.removeItem("token");
    setUser({});
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Button component={RouterLink} to="/" color={"inherit"}>
              <Logo />
            </Button>
          </Box>
          {/*Add post button only visible when logged in*/}
          {localStorage.getItem("token") && (
            <IconButton component={RouterLink} to="/addpost">
              <AddCircleIcon color={"secondary"} />
            </IconButton>
          )}
          <Grid
            container
            alignItems={"center"}
            spacing={2}
            justifyContent={"flex-end"}
          >
            {/*Login and register buttons only visible when not logged in*/}
            {!localStorage.getItem("token") ? (
              <Grid item>
                <Button
                  sx={{ mr: 2 }}
                  component={RouterLink}
                  to="/login"
                  color={"secondary"}
                  variant="contained"
                >
                  <Typography fontWeight={"600"} textTransform={"none"}>
                    {t("login")}
                  </Typography>
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  color={"secondary"}
                  variant="contained"
                >
                  <Typography fontWeight={"600"} textTransform={"none"}>
                    {t("register")}
                  </Typography>
                </Button>
              </Grid>
            ) : (
              //Logout button only visible when logged in
              <Grid item>
                <Button
                  onClick={handleLogOut}
                  color={"secondary"}
                  variant="contained"
                >
                  <Typography fontWeight={"600"} textTransform={"none"}>
                    {t("logout")}
                  </Typography>
                </Button>
              </Grid>
            )}
            <Grid item>
              <IconButton
                onClick={handleLangClick}
                aria-label="select language"
              >
                <LanguageIcon />
              </IconButton>
            </Grid>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleNoLangClose}
              MenuListProps={{
                "aria-labelledby": "lock-button",
                role: "listbox",
              }}
            >
              <MenuItem onClick={() => handleLangClose("en")}>
                {t("en")}
              </MenuItem>
              <MenuItem onClick={() => handleLangClose("fi")}>
                {t("fi")}
              </MenuItem>
            </Menu>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
