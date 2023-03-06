import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Header";
import { createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import AddPost from "./pages/AddPost";
import { useTranslation } from "react-i18next";

// Theme for the app
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#FF851B",
    },
  },
});

function App() {
  const [user, setUser] = useState<any>({});
  const { t } = useTranslation();
  return (
    <div
      style={{
        backgroundColor: "#a6a4a2",
        minHeight: "100vh",
      }}
    >
      <Router>
        <ThemeProvider theme={darkTheme}>
          <Header setUser={setUser} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/addpost" element={<AddPost user={user} />} />
            <Route path="*" element={<h1>{t("404")}</h1>} />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
