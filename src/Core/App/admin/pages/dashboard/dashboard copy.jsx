// src/Core/App/admin/pages/dashboard/dashboard.jsx
console.log("Dashboard se está montando");

import React, { useState, useEffect } from 'react';
import { LuSearch } from "react-icons/lu";
import { getAllInscripciones, getFacultades, getProgramas } from "../../../../utils/services/get";
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../../../context/UserContext";
import { logoutUser } from "../../../../utils/services/logoutUser";
import InscripcionCard from "../../components/InscripcionCard";

const Dashboard = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [filteredInscripciones, setFilteredInscripciones] = useState([]);
  const [facultades, setFacultades] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ facultad: '', programa: '' });

  const navigate = useNavigate();
  const { user, loading: userLoading } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [inscripcionesData, facultadesData, programasData] = await Promise.all([
          getAllInscripciones(),
          getFacultades(),
          getProgramas()
        ]);
        setInscripciones(inscripcionesData);
        setFilteredInscripciones(inscripcionesData);
        setFacultades(facultadesData);
        setProgramas(programasData);
      } catch (err) {
        setError('Error al cargar los datos. Inténtalo de nuevo más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = inscripciones;
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.apellido?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.competencia?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filters.facultad) {
      filtered = filtered.filter(item => item.facultad === filters.facultad);
    }
    if (filters.programa) {
      filtered = filtered.filter(item => item.programaId === filters.programa);
    }
    setFilteredInscripciones(filtered);
  }, [searchTerm, filters, inscripciones]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  if (userLoading || loading) {
    return <div className="p-6 text-gray-600">Cargando información del dashboard...</div>;
  }

  if (!user) {
    return <div className="p-6 text-red-600">No se ha podido cargar la información del usuario.</div>;
  }

  return (
    <div className="w-full overflow-auto h-screen flex flex-col p-4 md:p-8 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-700">
          Bienvenido, <strong>{user.nombre}</strong> | Rol: <strong>{user.rol}</strong>
        </div>
        <button onClick={() => logoutUser(navigate)} className="btn bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-700">
          Cerrar Sesión
        </button>
      </div>

      <div className="w-full flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex-grow">
          <label className="input input-bordered flex items-center gap-2 shadow-sm">
            <LuSearch className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              className="grow bg-transparent focus:outline-none"
              placeholder="Buscar inscripciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
        </div>

        <div className="flex gap-4">
          <select
            name="facultad"
            className="select select-bordered"
            value={filters.facultad}
            onChange={handleFilterChange}
          >
            <option value="">Todas las Facultades</option>
            {facultades.map(f => (
              <option key={f.id} value={f.nombre}>{f.nombre}</option>
            ))}
          </select>

          <select
            name="programa"
            className="select select-bordered"
            value={filters.programa}
            onChange={handleFilterChange}
          >
            <option value="">Todos los Programas</option>
            {programas.map(p => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
        {filteredInscripciones.length > 0 ? (
          filteredInscripciones.map((item) => (
            <InscripcionCard key={item.id} inscripcion={item} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-8">
            {error || "No se encontraron inscripciones"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
