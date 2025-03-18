// src/Core/Routes/publicRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../App/public/pages/Home/home";
import NotFound from "../App/public/pages/notFound404";

const PublicRoutes = () => (
  <Routes>
    <Route path="" element={<Home />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default PublicRoutes;
