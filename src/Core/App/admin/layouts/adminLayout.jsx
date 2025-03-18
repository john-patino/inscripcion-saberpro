// src/Core/App/admin/layouts/adminLayout.jsx
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { logoutUser } from "../../../utils/services/logoutUser";
import { useUser } from "../../../context/UserContext";
import { useEffect } from "react";

const AdminLayout = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Datos del usuario actual:", user);
    }, [user]);

    return (
        <div className="h-screen w-full">
            <div className="w-full h-full flex flex-col">
                <div className="w-full h-full md:flex-row flex flex-col">
                    <Sidebar />
                    <div className="flex-1 p-4">
                        <div className="flex justify-between items-center mb-4">
                            {user && (
                                <div className="text-sm text-gray-600">
                                    Bienvenido: <strong>{user.nombre}</strong> | Rol: <strong>{user.rol}</strong>
                                </div>
                            )}
                            <button
                                onClick={() => logoutUser(navigate)}
                                className="btn bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-700"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;