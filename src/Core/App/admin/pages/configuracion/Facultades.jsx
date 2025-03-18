// src/Core/App/admin/pages/configuracion/Facultades.jsx
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";
import { toast } from "sonner";

const Facultades = () => {
  const [facultades, setFacultades] = useState([]);
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchFacultades = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "facultades"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFacultades(data);
    } catch (error) {
      console.error("Error al obtener facultades:", error);
      toast.error("Error al cargar facultades");
    } finally {
      setLoading(false);
    }
  };

  const handleAgregar = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return toast.warning("Debe ingresar un nombre válido");

    try {
      await addDoc(collection(db, "facultades"), { nombre });
      toast.success("Facultad agregada correctamente");
      setNombre("");
      fetchFacultades();
    } catch (error) {
      console.error("Error al agregar facultad:", error);
      toast.error("No se pudo agregar la facultad");
    }
  };

  const handleEliminar = async (id) => {
    try {
      await deleteDoc(doc(db, "facultades", id));
      toast.success("Facultad eliminada");
      fetchFacultades();
    } catch (error) {
      console.error("Error al eliminar facultad:", error);
      toast.error("No se pudo eliminar la facultad");
    }
  };

  useEffect(() => {
    fetchFacultades();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-color-primary">Gestión de Facultades</h2>

      <form onSubmit={handleAgregar} className="flex gap-4 mb-6">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="input input-bordered w-full"
          placeholder="Nombre de la facultad"
        />
        <button type="submit" className="btn bg-color-primary text-white">
          Agregar
        </button>
      </form>

      {loading ? (
        <p className="text-gray-500">Cargando facultades...</p>
      ) : facultades.length === 0 ? (
        <p className="text-gray-500">No hay facultades registradas.</p>
      ) : (
        <ul className="space-y-2">
          {facultades.map((fac) => (
            <li key={fac.id} className="bg-white rounded shadow p-4 flex justify-between items-center">
              <span>{fac.nombre}</span>
              <button
                onClick={() => handleEliminar(fac.id)}
                className="btn btn-sm bg-red-600 text-white"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Facultades;
