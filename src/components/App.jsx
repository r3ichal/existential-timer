import React from "react";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import { alert } from "@pnotify/core";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "@utils/PrivateRoute";
import { PublicRoute } from "@utils/PublicRoute";
import { routes } from "@config/router";
import Timer from "./Timer/Timer";
import Header from "./Header/Header";
const App = () => {
  return (
    <>
      <Header></Header>
      <Timer></Timer>
    </>
  );
};

export default App;
