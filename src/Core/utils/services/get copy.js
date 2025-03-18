import axios from "axios";

export const GetProjectbyID = async (id) => {
  try {
    const response = await axios.get(`https://hackathon-back-production.up.railway.app/proyectos/${id}`);
    return response;
  } catch (error) {
    console.error("Error al obtener el proyecto", error);
    return error;
  }
};

export const GetallProject = async () => {
  try {
    const response =
      await axios.get(`https://hackathon-back-production.up.railway.app/proyectos`);
    return response;
  } catch (error) {
    console.error("Error al obtener el proyecto", error);
    return error;
  }
};

export const GetProjectbyUser = async (userid) => {
  try {
    const response = await axios.get(`https://api.example.com/data/${userid}`);
    return response;
  } catch (error) {c
    console.error("Error al obtener el proyecto", error);
    return error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`https://hackathon-back-production.up.railway.app/users`); // Replace with your endpoint
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios", error);
    throw error;
  }
};
export const updateUserRole = async (userId, newRole) => {
  try {
    const response = await axios.put(
      `https://hackathon-back-production.up.railway.app/users/asignar-rol/${userId}`,
      { rol: newRole },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el rol del usuario", error);
    throw error;
  }
};

export const searchUsers = async (query) => {
  try {
    const response = await axios.get(`/api/users/search?q=${query}`); // Replace with your endpoint
    return response.data;
  } catch (error) {
    console.error("Error al buscar usuarios", error);
    throw error;
  }
};

export const getUserinfo = async (id) =>{
  try{
    const response = await axios.get(`https://hackathon-back-production.up.railway.app/users/${id}`);
    return response.data;
  
  }catch(error){
    console.error(error);
    throw error;
  }
};



export const getFacultades = async () =>{
  try{
    const response = await axios.get(`https://hackathon-back-production.up.railway.app/facultad`);
    return response.data;
  }
  catch(error){
    console.log(error)
    throw error;
  }
}

export const getProgramas =async ()=>{
  try{
    const response=await axios.get(`https://hackathon-back-production.up.railway.app/programa`);

    return response.data
  }
  catch(error){
    console.log(error)
  }
}