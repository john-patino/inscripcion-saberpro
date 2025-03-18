// src/Core/App/admin/pages/convocatorias/CrearConvocatoria.jsx
import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";
import { toast } from "sonner";

const CrearConvocatoria = () => {
  const [form, setForm] = useState({
    competencia: "",
    grupo: "",
    docente: "",
    fechaInicio: "",
    fechaFin: "",
    cupos: "",
    estado: "Abierta"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.competencia || !form.grupo || !form.fechaInicio || !form.fechaFin || !form.cupos) {
      toast.error("Todos los campos obligatorios deben estar completos");
      return;
    }

    try {
      await addDoc(collection(db, "convocatorias"), {
        ...form,
        cupos: parseInt(form.cupos),
        fechaInicio: Timestamp.fromDate(new Date(form.fechaInicio)),
        fechaFin: Timestamp.fromDate(new Date(form.fechaFin)),
        createdAt: Timestamp.now()
      });

      toast.success("Convocatoria creada exitosamente");
      setForm({
        competencia: "",
        grupo: "",
        docente: "",
        fechaInicio: "",
        fechaFin: "",
        cupos: "",
        estado: "Abierta"
      });
    } catch (error) {
      console.error("Error al crear convocatoria:", error);
      toast.error("Error al crear la convocatoria");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-color-primary">Crear Convocatoria</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label-text font-semibold">Competencia *</label>
          <input
            type="text"
            name="competencia"
            value={form.competencia}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label-text font-semibold">Grupo *</label>
          <input
            type="text"
            name="grupo"
            value={form.grupo}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label-text font-semibold">Docente</label>
          <input
            type="text"
            name="docente"
            value={form.docente}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label-text font-semibold">Fecha Inicio *</label>
            <input
              type="date"
              name="fechaInicio"
              value={form.fechaInicio}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label-text font-semibold">Fecha Fin *</label>
            <input
              type="date"
              name="fechaFin"
              value={form.fechaFin}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        <div>
          <label className="label-text font-semibold">Cupos *</label>
          <input
            type="number"
            name="cupos"
            value={form.cupos}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label-text font-semibold">Estado</label>
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="Abierta">Abierta</option>
            <option value="Cerrada">Cerrada</option>
            <option value="En curso">En curso</option>
            <option value="Finalizada">Finalizada</option>
          </select>
        </div>

        <button type="submit" className="btn bg-color-primary text-white w-full">
          Crear Convocatoria
        </button>
      </form>
    </div>
  );
};

export default CrearConvocatoria;
