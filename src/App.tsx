import { CssBaseline } from "@mui/material";
import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./modules/private/Private";
import PublicRoute from "./modules/public/Public";
import { ProviderAuth } from "./providers/AuthProvider";

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <ProviderAuth>
          <Routes>
            {PublicRoute()}
            {PrivateRoute()}
          </Routes>
        </ProviderAuth>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
