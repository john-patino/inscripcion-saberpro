// src/Core/App/admin/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import { logoutUser } from "../../../utils/services/logoutUser";

const Sidebar = () => {
  const { user } = useUser();

  return (
    <aside className="h-full flex-col md:flex-row flex shadow-lg">
      <div className="flex md:flex-col p-4 w-full md:w-64 bg-white border-r border-gray-100 justify-between md:h-full">
        <div className="flex flex-col gap-4">
          <div className="text-center border-b pb-4">
            <h2 className="text-xl font-bold text-color-primary">Administrador</h2>
            <p className="text-sm text-gray-500">{user?.nombre} ({user?.rol})</p>
          </div>

          <ul className="h-full w-full flex flex-col gap-2">
            <p className="uppercase font-extrabold text-gray-500 ml-2 mt-2 mb-3">Menú</p>

            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => `text-gray-800 w-full rounded-lg p-2 items-center gap-2 font-semibold text-sm flex hover:bg-gray-200 hover:text-blue-600 transition-all duration-150 ${isActive ? 'bg-blue-50 text-blue-600' : ''}`}
              >
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/convocatorias/crear"
                className={({ isActive }) => `text-gray-800 w-full rounded-lg p-2 items-center gap-2 font-semibold text-sm flex hover:bg-gray-200 hover:text-blue-600 transition-all duration-150 ${isActive ? 'bg-blue-50 text-blue-600' : ''}`}
              >
                Crear Convocatoria
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/convocatorias/listar"
                className={({ isActive }) => `text-gray-800 w-full rounded-lg p-2 items-center gap-2 font-semibold text-sm flex hover:bg-gray-200 hover:text-blue-600 transition-all duration-150 ${isActive ? 'bg-blue-50 text-blue-600' : ''}`}
              >
                Ver Convocatorias
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/inscripciones/listar"
                className={({ isActive }) => `text-gray-800 w-full rounded-lg p-2 items-center gap-2 font-semibold text-sm flex hover:bg-gray-200 hover:text-blue-600 transition-all duration-150 ${isActive ? 'bg-blue-50 text-blue-600' : ''}`}
              >
                Ver Inscripciones
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/usuarios"
                className={({ isActive }) => `text-gray-800 w-full rounded-lg p-2 items-center gap-2 font-semibold text-sm flex hover:bg-gray-200 hover:text-blue-600 transition-all duration-150 ${isActive ? 'bg-blue-50 text-blue-600' : ''}`}
              >
                Gestión de Usuarios
              </NavLink>
            </li>

            <p className="uppercase font-extrabold text-gray-500 ml-2 mt-6 mb-3">Configuración</p>

            <li>
              <NavLink
                to="/dashboard/facultades"
                className={({ isActive }) => `text-gray-800 w-full rounded-lg p-2 items-center gap-2 font-semibold text-sm flex hover:bg-gray-200 hover:text-blue-600 transition-all duration-150 ${isActive ? 'bg-blue-50 text-blue-600' : ''}`}
              >
                Facultades
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/programas"
                className={({ isActive }) => `text-gray-800 w-full rounded-lg p-2 items-center gap-2 font-semibold text-sm flex hover:bg-gray-200 hover:text-blue-600 transition-all duration-150 ${isActive ? 'bg-blue-50 text-blue-600' : ''}`}
              >
                Programas
              </NavLink>
            </li>
          </ul>

          <div className="mt-auto pt-4 border-t">
            <button
              onClick={logoutUser}
              className="btn bg-red-600 text-white w-full mt-4"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
