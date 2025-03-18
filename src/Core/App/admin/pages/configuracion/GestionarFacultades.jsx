// src/Core/App/admin/pages/configuracion/GestionarFacultades.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../../../../firebase/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { toast } from 'sonner';

const GestionarFacultades = () => {
  const [facultades, setFacultades] = useState([]);
  const [nombreFacultad, setNombreFacultad] = useState('');

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
    fetchFacultades();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombreFacultad.trim()) {
      toast.error('El nombre de la facultad es obligatorio');
      return;
    }
    try {
      await addDoc(collection(db, 'facultades'), {
        nombre: nombreFacultad.trim(),
      });
      toast.success('Facultad registrada exitosamente');
      setNombreFacultad('');
      fetchFacultades();
    } catch (error) {
      console.error('Error al registrar facultad:', error);
      toast.error('No se pudo registrar la facultad');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-color-primary mb-6">Gestión de Facultades</h2>

        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nombre de la nueva facultad</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={nombreFacultad}
              onChange={(e) => setNombreFacultad(e.target.value)}
              placeholder="Ej. Facultad de Ingeniería"
            />
          </div>

          <button type="submit" className="btn bg-color-primary text-white w-full">
            Registrar Facultad
          </button>
        </form>

        <hr className="my-6" />

        <h3 className="text-xl font-semibold mb-4">Facultades registradas</h3>
        {facultades.length > 0 ? (
          <ul className="space-y-2">
            {facultades.map((fac) => (
              <li key={fac.id} className="bg-gray-50 p-3 rounded border shadow-sm">
                🏫 {fac.nombre}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No hay facultades registradas.</p>
        )}
      </div>
    </div>
  );
};

export default GestionarFacultades;
