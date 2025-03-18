// src/Core/App/admin/pages/convocatorias/ListarConvocatorias.jsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";
import { toast } from "sonner";

const ListarConvocatorias = () => {
  const [convocatorias, setConvocatorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConvocatorias = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "convocatorias"));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setConvocatorias(data);
      } catch (error) {
        console.error("Error al obtener convocatorias:", error);
        toast.error("Error al cargar convocatorias");
      } finally {
        setLoading(false);
      }
    };

    fetchConvocatorias();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-color-primary">Listado de Convocatorias</h2>

      {loading ? (
        <p className="text-gray-500">Cargando convocatorias...</p>
      ) : convocatorias.length === 0 ? (
        <p className="text-gray-500">No hay convocatorias registradas.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th>Competencia</th>
                <th>Grupo</th>
                <th>Docente</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Cupos</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {convocatorias.map((c) => (
                <tr key={c.id}>
                  <td>{c.competencia}</td>
                  <td>{c.grupo}</td>
                  <td>{c.docente || "No asignado"}</td>
                  <td>{new Date(c.fechaInicio.toDate()).toLocaleDateString()}</td>
                  <td>{new Date(c.fechaFin.toDate()).toLocaleDateString()}</td>
                  <td>{c.cupos}</td>
                  <td>
                    <span className={`badge ${c.estado === 'Abierta' ? 'badge-success' : c.estado === 'Cerrada' ? 'badge-error' : 'badge-info'}`}>
                      {c.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListarConvocatorias;
