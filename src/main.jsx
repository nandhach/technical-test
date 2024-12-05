import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "./index.css";
import LoginPage from "./pages/LoginPage.jsx";
import CustomerPage from "./pages/CustomerPage.jsx";
import TransactionPage from "./pages/TransactionPage.jsx";

const isAuthenticated = () => {
  // Replace with real authentication logic
  return !!localStorage.getItem("user"); // Check if user data is stored
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/customer" element={<ProtectedRoute element={<CustomerPage />} />} />
        <Route path="/transaction" element={<ProtectedRoute element={<TransactionPage />} />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
