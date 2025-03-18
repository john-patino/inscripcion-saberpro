// src/Core/App/public/pages/Home/home.jsx
import { useUser } from "../../../../context/UserContext";

import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleInscribirse = () => {
    navigate('/inscripcion'); // Ruta de inscripción (ajustar según corresponda)
  };

  return (
    <>
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: "url(/BGupc.webp)" }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-white text-5xl font-bold">
              Gestión de Inscripciones a Cursos de Competencias Genericas
            </h1>
            <p className="mb-5 text-white">
              Hazle seguimiento y consulta tus inscripciones
            </p>

            {user?.rol === 'estudiante' && (
              <>
                <p className="mb-4 text-white">
                  👋 Hola <strong>{user.nombre}</strong>, estás registrado como <strong>Estudiante</strong>.
                </p>
                <button
                  onClick={handleInscribirse}
                  className="btn bg-color-primary text-white hover:bg-white hover:text-color-primary transition-all"
                >
                  Inscribirme a una competencia
                </button>
              </>
            )}

            {user?.rol === 'administrador' && (
              <p className="text-white">
                👋 Bienvenido Administrador <strong>{user.nombre}</strong>. Dirígete al dashboard para gestionar procesos.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
