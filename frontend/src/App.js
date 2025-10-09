import React, { useContext } from "react"; // <-- useContext added
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"; // <-- useNavigate added

// Corrected import path, and AuthContext added
import { AuthProvider, AuthContext } from "./context/AuthContext"; 

// Import all pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import Home from "./pages/Home"; 
import Logout from "./pages/Logout";

// Simple Protected Route Component
const ProtectedRoute = ({ children }) => {
  // AuthContext and useNavigate are now defined here
  const { user, loading } = useContext(AuthContext); 
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>; 

  if (!user) {
    navigate('/login');
    return null; 
  }

  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Authentication Routes */}
          <Route path="/" element={<Home />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route exact path="/logout" element={<Logout/>}></Route>
          {/* Authenticated Route */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home /> 
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}