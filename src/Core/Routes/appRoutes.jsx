// src/Core/Routes/appRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import PublicRoutes from "./publicRoutes";
import AuthRoutes from "./authRoutes";
import PrivateRoutes from "./privateRoutes";
import NotFound from "../App/public/pages/notFound404";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redireccionar raíz a dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Rutas públicas */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* Rutas privadas protegidas */}
      <Route path="/dashboard/*" element={<PrivateRoutes />} />

      {/* Página no encontrada */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
