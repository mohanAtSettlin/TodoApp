import React, { useState } from "react";
import Todos from "./TodoHead.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import { TodoBody } from "./TodoBody.jsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: grey,
    divider: grey[700],
    background: {
      default: "#0B1928",
      paper: "#0B1928",
    },
    text: {
      primary: "#fff",
      secondary: "#33A5DD",
    },
  },
});

export const App = () => {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Todos />
        <TodoBody />
      </ThemeProvider>
    </div>
  );
};
