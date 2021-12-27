import React from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import SelectView from "./views/select-view";
import QuizView from "./views/quiz-view";
import { AppBar, Container, Button } from "@mui/material";
import StoreProvider from "./store";

const views = [
  { name: "Verbs", route: "/" },
  { name: "Quiz", route: "/quiz" },
];

function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <AppBar position="static">
          <Container sx={{ flexGrow: 1, display: { md: "flex" } }}>
            {views.map(({ name, route }) => (
              <Link key={route} to={route} style={{ textDecoration: "none" }}>
                <Button role="link" sx={{ my: 2, color: "white" }}>
                  {name}
                </Button>
              </Link>
            ))}
          </Container>
        </AppBar>
        <Routes>
          <Route path="/" element={<SelectView />} />
          <Route path="/quiz" element={<QuizView />} />
          <Route path="*" element={<SelectView />} />
        </Routes>
      </HashRouter>
    </StoreProvider>
  );
}

export default App;
