// src/Core/App/auth/pages/register.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import { getFacultades, getProgramas } from '../../../utils/services/get';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const navigate = useNavigate();
  const [facultades, setFacultades] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [formState, setFormState] = useState({
    cedula: "",
    nombre: "",
    apellido: "",
    correo: "",
    usuario: "",
    contrasena: "",
    confirmarContrasena: "",
    facultadId: "",
    programaId: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [facultadesData, programasData] = await Promise.all([
          getFacultades(),
          getProgramas()
        ]);
        setFacultades(facultadesData);
        setProgramas(programasData);
      } catch (error) {
        toast.error('Error al cargar datos', {
          description: 'No se pudieron cargar las facultades y programas'
        });
      }
    };
    loadInitialData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
    if (name === 'facultadId') {
      setFormState(prev => ({ ...prev, programaId: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formState.cedula || !/^[0-9]{7,10}$/.test(formState.cedula)) newErrors.cedula = "La cédula debe tener entre 7 y 10 dígitos";
    if (!formState.nombre) newErrors.nombre = "El nombre es requerido";
    if (!formState.apellido) newErrors.apellido = "El apellido es requerido";
    if (!formState.correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.correo)) newErrors.correo = "Correo electrónico inválido";
    if (!formState.usuario) newErrors.usuario = "El nombre de usuario es requerido";
    if (!formState.contrasena || formState.contrasena.length < 8) newErrors.contrasena = "Contraseña mínima 8 caracteres";
    if (formState.contrasena !== formState.confirmarContrasena) newErrors.confirmarContrasena = "Las contraseñas no coinciden";
    if (!formState.facultadId) newErrors.facultadId = "Seleccione una facultad";
    if (!formState.programaId) newErrors.programaId = "Seleccione un programa";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Object.values(newErrors).forEach(msg => toast.error(msg));
      return;
    }
    try {
      const cred = await createUserWithEmailAndPassword(auth, formState.correo, formState.contrasena);
      await setDoc(doc(db, "usuarios", cred.user.uid), {
        uid: cred.user.uid,
        nombre: formState.nombre,
        apellido: formState.apellido,
        cedula: formState.cedula,
        email: formState.correo,
        usuario: formState.usuario,
        facultadId: formState.facultadId,
        programaId: formState.programaId,
        rol: "estudiante"
      });
      toast.success("Usuario registrado correctamente", { description: "Redirigiendo a inicio de sesión" });
      navigate("/auth/login");
    } catch (error) {
      console.error("Error en registro:", error);
      let message = "Ocurrió un error al registrar el usuario";
      if (error.code === "auth/email-already-in-use") message = "Este correo ya está registrado";
      else if (error.code === "auth/invalid-email") message = "El correo no es válido";
      toast.error("Error al registrar", { description: message });
    }
  };

  const filteredProgramas = programas.filter(p => p.facultad?.id === formState.facultadId);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-color-primary mb-2">Registro de Usuario</h1>
          <p className="text-gray-600">
            ¿Ya tienes una cuenta?
            <a href="/auth/login" className="text-color-primary hover:underline ml-1 font-semibold">Inicia sesión</a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <input name="cedula" value={formState.cedula} onChange={handleChange} className="input input-bordered w-full" placeholder="Cédula" />
            <input name="nombre" value={formState.nombre} onChange={handleChange} className="input input-bordered w-full" placeholder="Nombre" />
            <input name="apellido" value={formState.apellido} onChange={handleChange} className="input input-bordered w-full" placeholder="Apellido" />
            <input name="correo" type="email" value={formState.correo} onChange={handleChange} className="input input-bordered w-full" placeholder="Correo electrónico" />
            <input name="usuario" value={formState.usuario} onChange={handleChange} className="input input-bordered w-full" placeholder="Usuario" />
            <input name="contrasena" type={showPassword ? "text" : "password"} value={formState.contrasena} onChange={handleChange} className="input input-bordered w-full" placeholder="Contraseña" />
            <input name="confirmarContrasena" type={showConfirmPassword ? "text" : "password"} value={formState.confirmarContrasena} onChange={handleChange} className="input input-bordered w-full" placeholder="Confirmar contraseña" />
            <select name="facultadId" value={formState.facultadId} onChange={handleChange} className="select select-bordered w-full">
              <option value="">Seleccione una facultad</option>
              {facultades.map(f => <option key={f.id} value={f.id}>{f.nombre}</option>)}
            </select>
            <select name="programaId" value={formState.programaId} onChange={handleChange} className="select select-bordered w-full">
              <option value="">Seleccione un programa</option>
              {filteredProgramas.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
            </select>
          </div>
          <button type="submit" className="btn bg-color-primary text-white w-full">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
