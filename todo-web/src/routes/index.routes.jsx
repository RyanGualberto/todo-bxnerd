import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "../pages/App.jsx";
import Sign from "../pages/Sign";

import useAuth from "../hooks/useAuth";

export default function AppRouter() {
  const { signed } = useAuth();
  return (
    <Router>
      <Routes>
        {signed ? (
          <Route path="/" element={<App />} />
        ) : (
          <Route path="/" element={<Sign />} />
        )}
      </Routes>
      <Toaster position="top-right" />
    </Router>
  );
}
