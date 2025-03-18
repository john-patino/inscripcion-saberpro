// src/Core/utils/services/get.js
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export const getFacultades = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "facultades"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener facultades:", error);
    throw error;
  }
};

export const getProgramas = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "programas"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener programas:", error);
    throw error;
  }
};

export const getMisInscripciones = async (uid) => {
  try {
    const q = query(collection(db, "inscripciones"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener inscripciones del usuario:", error);
    throw error;
  }
};

export const getAllInscripciones = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "inscripciones"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener todas las inscripciones:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

export const updateUserRole = async (uid, newRole) => {
  try {
    const userRef = doc(db, "usuarios", uid);
    await updateDoc(userRef, { rol: newRole });
    return true;
  } catch (error) {
    console.error("Error al actualizar rol del usuario:", error);
    throw error;
  }
};

export const searchUsers = async (searchTerm) => {
  try {
    const all = await getAllUsers();
    return all.filter(user =>
      user.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.apellido?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error("Error buscando usuarios:", error);
    throw error;
  }
};
