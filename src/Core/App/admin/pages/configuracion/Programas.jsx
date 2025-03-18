// src/Core/App/admin/pages/configuracion/Programas.jsx
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";
import { toast } from "sonner";

const Programas = () => {
  const [programas, setProgramas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [facultades, setFacultades] = useState([]);
  const [facultadId, setFacultadId] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProgramas = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "programas"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProgramas(data);
    } catch (error) {
      console.error("Error al obtener programas:", error);
      toast.error("Error al cargar programas");
    } finally {
      setLoading(false);
    }
  };

  const fetchFacultades = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "facultades"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFacultades(data);
    } catch (error) {
      console.error("Error al obtener facultades:", error);
      toast.error("Error al cargar facultades");
    }
  };

  const handleAgregar = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !facultadId) return toast.warning("Debe completar todos los campos");

    try {
      await addDoc(collection(db, "programas"), { nombre, facultad: { id: facultadId } });
      toast.success("Programa agregado correctamente");
      setNombre("");
      setFacultadId("");
      fetchProgramas();
    } catch (error) {
      console.error("Error al agregar programa:", error);
      toast.error("No se pudo agregar el programa");
    }
  };

  const handleEliminar = async (id) => {
    try {
      await deleteDoc(doc(db, "programas", id));
      toast.success("Programa eliminado");
      fetchProgramas();
    } catch (error) {
      console.error("Error al eliminar programa:", error);
      toast.error("No se pudo eliminar el programa");
    }
  };

  useEffect(() => {
    fetchProgramas();
    fetchFacultades();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-color-primary">Gestión de Programas</h2>

      <form onSubmit={handleAgregar} className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="input input-bordered w-full"
          placeholder="Nombre del programa"
        />
        <select
          value={facultadId}
          onChange={(e) => setFacultadId(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="">Selecciona una facultad</option>
          {facultades.map((fac) => (
            <option key={fac.id} value={fac.id}>{fac.nombre}</option>
          ))}
        </select>
        <button type="submit" className="btn bg-color-primary text-white">Agregar</button>
      </form>

      {loading ? (
        <p className="text-gray-500">Cargando programas...</p>
      ) : programas.length === 0 ? (
        <p className="text-gray-500">No hay programas registrados.</p>
      ) : (
        <ul className="space-y-2">
          {programas.map((prog) => (
            <li key={prog.id} className="bg-white rounded shadow p-4 flex justify-between items-center">
              <span>{prog.nombre}</span>
              <button
                onClick={() => handleEliminar(prog.id)}
                className="btn btn-sm bg-red-600 text-white"
              >Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Programas;
