// src/Core/utils/scripts/initFirestoreData.js
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const cargarDatosIniciales = async () => {
  try {
    // Facultades
    const facultades = [
      { id: "fac001", nombre: "Facultad de Ingeniería" },
      { id: "fac002", nombre: "Facultad de Ciencias Sociales" }
    ];

    for (let f of facultades) {
      await addDoc(collection(db, "facultades"), f);
    }

    // Programas
    const programas = [
      { nombre: "Ingeniería de Sistemas", facultad: { id: "fac001", nombre: "Facultad de Ingeniería" } },
      { nombre: "Ingeniería Electrónica", facultad: { id: "fac001", nombre: "Facultad de Ingeniería" } },
      { nombre: "Trabajo Social", facultad: { id: "fac002", nombre: "Facultad de Ciencias Sociales" } }
    ];

    for (let p of programas) {
      await addDoc(collection(db, "programas"), p);
    }

    // Competencias
    const competencias = [
      { codigo: "RC", nombre: "Razonamiento Cuantitativo" },
      { codigo: "LC", nombre: "Lectura Crítica" },
      { codigo: "CC", nombre: "Competencias Ciudadanas" },
      { codigo: "CE", nombre: "Comunicación Escrita" },
      { codigo: "IN", nombre: "Inglés" }
    ];

    for (let c of competencias) {
      await addDoc(collection(db, "competencias"), c);
    }

    console.log("✅ Datos iniciales cargados con éxito.");
  } catch (error) {
    console.error("❌ Error cargando datos iniciales:", error);
  }
};
