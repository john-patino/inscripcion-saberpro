// src/Core/Routes/privateRoutes.jsx
import { Routes, Route } from "react-router-dom";
import AuthPrivateRoute from "../utils/services/authPrivateRoute";
import AdminLayout from "../App/admin/layouts/adminLayout";
import Dashboard from "../App/admin/pages/dashboard/dashboard";
import UserList from "../App/admin/pages/users/userList";
import Reports from "../App/admin/pages/graph/graphView";
import CrearConvocatoria from "../App/admin/pages/convocatorias/CrearConvocatoria";
import ListarConvocatorias from "../App/admin/pages/convocatorias/ListarConvocatorias";
import InscripcionesListar from "../App/admin/pages/inscripciones/InscripcionesListar";
import Facultades from "../App/admin/pages/configuracion/Facultades";
import Programas from "../App/admin/pages/configuracion/Programas";
import Inscripcion from "../App/student/pages/Inscripcion";
import MisInscripciones from "../App/student/pages/MisInscripciones";
import NotFound from "../App/public/pages/notFound404";

const PrivateRoutes = () => (
  <Routes>
    <Route path="" element={<AuthPrivateRoute><AdminLayout /></AuthPrivateRoute>}>
      <Route index element={<Dashboard />} />
      <Route path="usuarios" element={<UserList />} />
     

      {/* Convocatorias */}
      <Route path="convocatorias/crear" element={<CrearConvocatoria />} />
      <Route path="convocatorias/listar" element={<ListarConvocatorias />} />

      {/* Inscripciones */}
      <Route path="inscripciones/listar" element={<InscripcionesListar />} />

      {/* Configuración */}
      <Route path="facultades" element={<Facultades />} />
      <Route path="programas" element={<Programas />} />

      {/* Estudiante */}
      <Route path="inscripcion" element={<Inscripcion />} />
      <Route path="mis-inscripciones" element={<MisInscripciones />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default PrivateRoutes;
