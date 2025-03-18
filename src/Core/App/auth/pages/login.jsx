// src/Core/App/auth/pages/login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import { toast } from "sonner";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!correo || !contrasena) {
      toast.error("Debes ingresar correo y contraseña");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, correo, contrasena);
      toast.success("Inicio de sesión exitoso");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      toast.error("Error al iniciar sesión", {
        description: error.message
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="bg-white shadow-md p-6 rounded w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="input input-bordered w-full"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn bg-color-primary text-white w-full">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
