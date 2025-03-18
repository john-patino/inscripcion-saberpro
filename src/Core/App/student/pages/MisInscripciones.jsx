// src/Core/App/student/pages/MisInscripciones.jsx
import { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import { getMisInscripciones } from "../../../utils/services/get";

const MisInscripciones = () => {
  const { user, loading } = useUser();
  const [inscripciones, setInscripciones] = useState([]);
  const [loadingInscripciones, setLoadingInscripciones] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.uid) {
        try {
          const data = await getMisInscripciones(user.uid);
          setInscripciones(data);
        } catch (error) {
          console.error("Error cargando inscripciones:", error);
        } finally {
          setLoadingInscripciones(false);
        }
      }
    };

    if (!loading) fetchData();
  }, [user, loading]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-color-primary">Mis Inscripciones</h2>
      {loadingInscripciones ? (
        <p>Cargando inscripciones...</p>
      ) : inscripciones.length === 0 ? (
        <p>No tienes inscripciones registradas.</p>
      ) : (
        <ul className="space-y-2">
          {inscripciones.map((item) => (
            <li key={item.id} className="border p-4 rounded shadow bg-white">
              <p><strong>Competencia:</strong> {item.competencia}</p>
              <p><strong>Facultad:</strong> {item.facultad}</p>
              <p><strong>Programa ID:</strong> {item.programaId}</p>
              <p><strong>Fecha:</strong> {item.fechaInscripcion?.toDate().toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MisInscripciones;
