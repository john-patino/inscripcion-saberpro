// src/Core/App/admin/components/InscripcionCard.jsx
import React from "react";

const InscripcionCard = ({ inscripcion }) => {
  if (!inscripcion) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all border border-gray-100">
      <h3 className="text-xl font-semibold text-color-primary mb-2">
        {inscripcion.nombre || 'Sin nombre'} {inscripcion.apellido || ''}
      </h3>

      {inscripcion.cedula && (
        <p className="text-sm text-gray-600 mb-1">
          <strong>Cédula:</strong> {inscripcion.cedula}
        </p>
      )}

      {inscripcion.competencia && (
        <p className="text-sm text-gray-600 mb-1">
          <strong>Competencia:</strong> {inscripcion.competencia}
        </p>
      )}

      {inscripcion.facultad && (
        <p className="text-sm text-gray-600 mb-1">
          <strong>Facultad:</strong> {inscripcion.facultad}
        </p>
      )}

      {inscripcion.programaId && (
        <p className="text-sm text-gray-600 mb-1">
          <strong>Programa ID:</strong> {inscripcion.programaId}
        </p>
      )}

      {inscripcion.fechaInscripcion && typeof inscripcion.fechaInscripcion.toDate === 'function' && (
        <p className="text-sm text-gray-600">
          <strong>Fecha Inscripción:</strong> {inscripcion.fechaInscripcion.toDate().toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default InscripcionCard;
