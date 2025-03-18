// src/Core/App/student/pages/Inscripcion.jsx
import React, { useState, useEffect } from 'react';
import { db } from "../../../firebase/firebaseConfig";
import { useUser } from "../../../context/UserContext";


import { collection, addDoc, Timestamp, getDocs } from 'firebase/firestore';
import { toast } from 'sonner';

const Inscripcion = () => {
  const { user } = useUser();
  const [programas, setProgramas] = useState([]);
  const [programaId, setProgramaId] = useState('');
  const [facultadNombre, setFacultadNombre] = useState('');
  const [horario, setHorario] = useState('');

  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'programas'));
        const programasData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProgramas(programasData);
      } catch (error) {
        toast.error('Error al cargar los programas');
        console.error(error);
      }
    };
    fetchProgramas();
  }, []);

  useEffect(() => {
    const programaSeleccionado = programas.find(p => p.id === programaId);
    setFacultadNombre(programaSeleccionado?.facultad?.nombre || '');
  }, [programaId, programas]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!programaId || !horario) {
      toast.error('Debes seleccionar un programa y un horario.');
      return;
    }

    try {
      const inscripcion = {
        uid: user.uid,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.email,
        cedula: user.cedula,
        programaId,
        facultad: facultadNombre,
        competencia: 'GENÉRICA',
        horario,
        fechaInscripcion: Timestamp.now(),
      };

      await addDoc(collection(db, 'inscripciones'), inscripcion);

      toast.success('Inscripción registrada correctamente');
      setProgramaId('');
      setHorario('');
    } catch (error) {
      console.error('Error al guardar inscripción:', error);
      toast.error('No se pudo guardar la inscripción. Inténtalo más tarde.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-color-primary mb-4">
          Formulario de Inscripción a Competencia
        </h2>

        {user ? (
          <div className="mb-6">
            <p className="text-gray-700">
              👤 <strong>{user.nombre} {user.apellido}</strong><br />
              📧 <strong>{user.email}</strong><br />
              🎓 Programa seleccionado: <strong>{programas.find(p => p.id === programaId)?.nombre || '-'}</strong><br />
              🏫 Facultad detectada: <strong>{facultadNombre || '-'}</strong>
            </p>
          </div>
        ) : (
          <p className="text-red-600 font-medium">
            No se detecta sesión activa. Por favor, inicia sesión.
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Seleccione su programa académico</span>
            </label>
            <select
              className="select select-bordered"
              value={programaId}
              onChange={(e) => setProgramaId(e.target.value)}
            >
              <option value="">-- Seleccionar programa --</option>
              {programas.map((programa) => (
                <option key={programa.id} value={programa.id}>{programa.nombre}</option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Horario Preferido</span>
            </label>
            <select
              className="select select-bordered"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
            >
              <option value="">-- Seleccionar horario --</option>
              <option value="Mañana">Mañana</option>
              <option value="Tarde">Tarde</option>
              <option value="Noche">Noche</option>
            </select>
          </div>

          <div className="pt-4">
            <button type="submit" className="btn bg-color-primary text-white w-full">
              Confirmar Inscripción
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Inscripcion;