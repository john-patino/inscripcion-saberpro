// src/Core/Routes/authRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Login from "../App/auth/pages/login";
import Register from "../App/auth/pages/register";
import NotFound from "../App/public/pages/notFound404";

const AuthRoutes = () => (
  <Routes>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AuthRoutes;