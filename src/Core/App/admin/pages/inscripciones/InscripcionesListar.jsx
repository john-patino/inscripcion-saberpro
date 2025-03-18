// src/Core/App/admin/pages/inscripciones/InscripcionesListar.jsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";
import { toast } from "sonner";

const InscripcionesListar = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInscripciones = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "inscripciones"));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setInscripciones(data);
      } catch (error) {
        console.error("Error al obtener inscripciones:", error);
        toast.error("Error al cargar inscripciones");
      } finally {
        setLoading(false);
      }
    };

    fetchInscripciones();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-color-primary">Listado de Inscripciones</h2>

      {loading ? (
        <p className="text-gray-500">Cargando inscripciones...</p>
      ) : inscripciones.length === 0 ? (
        <p className="text-gray-500">No hay inscripciones registradas.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th>Estudiante</th>
                <th>Cédula</th>
                <th>Email</th>
                <th>Competencia</th>
                <th>Grupo</th>
                <th>Docente</th>
                <th>Fecha Inscripción</th>
              </tr>
            </thead>
            <tbody>
              {inscripciones.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre} {item.apellido}</td>
                  <td>{item.cedula}</td>
                  <td>{item.email}</td>
                  <td>{item.competencia}</td>
                  <td>{item.grupo}</td>
                  <td>{item.docente || "No asignado"}</td>
                  <td>{item.fechaInscripcion?.toDate().toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InscripcionesListar;
