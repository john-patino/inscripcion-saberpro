// src/Core/App/student/pages/InscribirseConvocatoria.jsx
import { useState, useEffect } from "react";
import { collection, getDocs, query, where, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useUser } from "../../../context/UserContext";
import { toast } from "sonner";

const InscribirseConvocatoria = () => {
  const { user } = useUser();
  const [convocatorias, setConvocatorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inscribiendo, setInscribiendo] = useState(null);
  const [cuposRestantes, setCuposRestantes] = useState({});
  const [inscripcionesUsuario, setInscripcionesUsuario] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const qConv = query(collection(db, "convocatorias"), where("estado", "==", "Abierta"));
        const snapshotConv = await getDocs(qConv);
        const dataConv = snapshotConv.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setConvocatorias(dataConv);

        const cupos = {};
        for (let convocatoria of dataConv) {
          const inscrQ = query(collection(db, "inscripciones"), where("convocatoriaId", "==", convocatoria.id));
          const inscrSnap = await getDocs(inscrQ);
          cupos[convocatoria.id] = convocatoria.cupos - inscrSnap.docs.length;
        }
        setCuposRestantes(cupos);

        if (user?.uid) {
          const qUserInscr = query(collection(db, "inscripciones"), where("uid", "==", user.uid));
          const snapshotUserInscr = await getDocs(qUserInscr);
          const dataInscripciones = snapshotUserInscr.docs.map(doc => doc.data().convocatoriaId);
          setInscripcionesUsuario(dataInscripciones);
        }
      } catch (error) {
        console.error("Error al cargar convocatorias o inscripciones:", error);
        toast.error("Error al cargar convocatorias");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleInscribirse = async (convocatoria) => {
    if (!user?.uid) return;
    setInscribiendo(convocatoria.id);

    try {
      if (inscripcionesUsuario.includes(convocatoria.id)) {
        toast.warning("Ya estás inscrito en esta convocatoria");
        setInscribiendo(null);
        return;
      }

      if (cuposRestantes[convocatoria.id] <= 0) {
        toast.error("No hay cupos disponibles en este grupo");
        setInscribiendo(null);
        return;
      }

      const inscripcion = {
        uid: user.uid,
        nombre: user.nombre,
        apellido: user.apellido,
        cedula: user.cedula,
        email: user.email,
        competencia: convocatoria.competencia,
        grupo: convocatoria.grupo,
        docente: convocatoria.docente,
        fechaInscripcion: Timestamp.now(),
        convocatoriaId: convocatoria.id,
        facultad: user.facultadId,
        programaId: user.programaId
      };

      await addDoc(collection(db, "inscripciones"), inscripcion);
      toast.success("Inscripción realizada correctamente");
      setInscripcionesUsuario(prev => [...prev, convocatoria.id]);
      setCuposRestantes(prev => ({ ...prev, [convocatoria.id]: prev[convocatoria.id] - 1 }));
    } catch (error) {
      console.error("Error al inscribirse:", error);
      toast.error("No se pudo completar la inscripción");
    } finally {
      setInscribiendo(null);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-color-primary">Convocatorias Abiertas</h2>
      {loading ? (
        <p className="text-gray-500">Cargando convocatorias...</p>
      ) : convocatorias.length === 0 ? (
        <p className="text-gray-500">No hay convocatorias disponibles actualmente.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {convocatorias.map((c) => {
            const yaInscrito = inscripcionesUsuario.includes(c.id);
            return (
              <div key={c.id} className="border p-4 bg-white rounded-xl shadow-md">
                <p><strong>Competencia:</strong> {c.competencia}</p>
                <p><strong>Grupo:</strong> {c.grupo}</p>
                <p><strong>Docente:</strong> {c.docente || "No asignado"}</p>
                <p><strong>Inicio:</strong> {new Date(c.fechaInicio.toDate()).toLocaleDateString()}</p>
                <p><strong>Fin:</strong> {new Date(c.fechaFin.toDate()).toLocaleDateString()}</p>
                <p><strong>Cupos Disponibles:</strong> {cuposRestantes[c.id] ?? c.cupos}</p>
                {yaInscrito ? (
                  <p className="mt-2 text-green-600 font-semibold text-sm">Ya estás inscrito ✅</p>
                ) : (
                  <button
                    className="btn bg-color-primary text-white w-full mt-3"
                    disabled={inscribiendo === c.id || cuposRestantes[c.id] <= 0}
                    onClick={() => handleInscribirse(c)}
                  >
                    {inscribiendo === c.id ? "Inscribiendo..." : "Inscribirse"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InscribirseConvocatoria;
