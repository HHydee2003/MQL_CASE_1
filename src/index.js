import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v1.5.0";
import "assets/css/demo.css";

import "assets/css/Signup.css";
import Signup from "components/Signup.js";
import Login from "components/Login.js";
import AdminLayout from "layouts/Admin.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes> 
    <Route path="/" element={<Signup />} />
    <Route path="/login" element={<Login />} />
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="*" element={<Navigate to="/" replace />} /> Redirect to Signup component
    </Routes>
  </BrowserRouter>
);
