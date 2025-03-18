// src/Core/App/admin/pages/configuracion/GestionarProgramas.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../../../../firebase/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { toast } from 'sonner';

const GestionarProgramas = () => {
  const [programas, setProgramas] = useState([]);
  const [facultades, setFacultades] = useState([]);
  const [nombrePrograma, setNombrePrograma] = useState('');
  const [facultadId, setFacultadId] = useState('');

  const fetchProgramas = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'programas'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProgramas(data);
    } catch (error) {
      console.error('Error al cargar programas:', error);
      toast.error('No se pudieron cargar los programas.');
    }
  };

  const fetchFacultades = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'facultades'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFacultades(data);
    } catch (error) {
      console.error('Error al cargar facultades:', error);
      toast.error('No se pudieron cargar las facultades.');
    }
  };

  useEffect(() => {
    fetchProgramas();
    fetchFacultades();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombrePrograma.trim() || !facultadId) {
      toast.error('Debes completar todos los campos');
      return;
    }
    try {
      const facultadSeleccionada = facultades.find(f => f.id === facultadId);
      await addDoc(collection(db, 'programas'), {
        nombre: nombrePrograma.trim(),
        facultad: {
          id: facultadSeleccionada.id,
          nombre: facultadSeleccionada.nombre
        }
      });
      toast.success('Programa registrado correctamente');
      setNombrePrograma('');
      setFacultadId('');
      fetchProgramas();
    } catch (error) {
      console.error('Error al registrar programa:', error);
      toast.error('No se pudo registrar el programa');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-color-primary mb-6">Gestión de Programas Académicos</h2>

        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nombre del programa</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={nombrePrograma}
              onChange={(e) => setNombrePrograma(e.target.value)}
              placeholder="Ej. Ingeniería de Sistemas"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Seleccione la facultad asociada</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={facultadId}
              onChange={(e) => setFacultadId(e.target.value)}
            >
              <option value="">-- Seleccionar facultad --</option>
              {facultades.map(f => (
                <option key={f.id} value={f.id}>{f.nombre}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn bg-color-primary text-white w-full">
            Registrar Programa
          </button>
        </form>

        <hr className="my-6" />

        <h3 className="text-xl font-semibold mb-4">Programas registrados</h3>
        {programas.length > 0 ? (
          <ul className="space-y-2">
            {programas.map((p) => (
              <li key={p.id} className="bg-gray-50 p-3 rounded border shadow-sm">
                🎓 {p.nombre} <br /> 🏫 Facultad: <strong>{p.facultad?.nombre}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No hay programas registrados.</p>
        )}
      </div>
    </div>
  );
};

export default GestionarProgramas;
