// src/Core/utils/services/authPrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const AuthPrivateRoute = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) {
    return <div className="p-4 text-center">Cargando sesión...</div>;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default AuthPrivateRoute;
