import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";

// Definición de las aplicaciones disponibles (debe coincidir con AdminAccess)
const AVAILABLE_APPS = [
  {
    id: "hache",
    name: "Hache",
    url: "https://hache.base44.app",
    logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6983a2ceb064115bb66490cb/6ffcc1cfb_ChatGPTImage5feb202610_47_20.png",
    logoSize: "80%"
  },
  {
    id: "lacapital",
    name: "La Capital Multimedios",
    url: "https://lacapitalmultimedios.base44.app",
    logo: "https://base44.app/api/apps/6980a1b99f15bcad4675bfb0/files/public/6980a1b99f15bcad4675bfb0/4b8b96964_ChatGPTImage2feb202610_13_44.png",
    logoSize: "80%"
  },
  {
    id: "casanova",
    name: "Casanova Abogados",
    url: "https://casanovaabogados.base44.app",
    logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69834ed290afab1ffdc6e966/dc9f43d33_casanova.png",
    logoSize: "85%"
  },
      {
    id: "leandro",
    name: "Informe Leandro",
    url: "https://leandro.base44.app",
    logo:"https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698b1ea389075bf898624a83/1c487ea53_image.png"
  },
  {
    id: "estiba",
    name: "Estiba",
    url: "https://estiba.base44.app",
    logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_6980928ed81e2aed5e54a361/1c7d0c11c_ChatGPTImage4feb202610_37_32.png",
    logoSize: "80%"
  }
];

// Componente del botón/card de aplicación
function AppCard({ app, className = "" }) {
  return (
    <a 
      href={app.url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`group relative rounded-2xl bg-black border border-white border-opacity-10 flex items-center justify-center p-6 transition-all duration-500 hover:border-opacity-100 hover:border-white hover:shadow-xl hover:shadow-white/50 ${className}`}
      style={{ aspectRatio: "1/1" }}
    >
      <img 
        src={app.logo} 
        alt={app.name} 
        className="object-contain"
        style={{ width: app.logoSize, height: app.logoSize }}
      />
    </a>
  );
}

// Componente para renderizar el grid según cantidad de apps
function AppsGrid({ apps }) {
  const count = apps.length;

  // 1 app: centrada
  if (count === 1) {
    return (
      <div className="flex justify-center">
        <div className="w-64">
          <AppCard app={apps[0]} />
        </div>
      </div>
    );
  }

  // 2 apps: una arriba izq, una arriba der
  if (count === 2) {
    return (
      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
        <AppCard app={apps[0]} />
        <AppCard app={apps[1]} />
      </div>
    );
  }

  // 3 apps: dos arriba, una abajo izq
  if (count === 3) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <AppCard app={apps[0]} />
          <AppCard app={apps[1]} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <AppCard app={apps[2]} />
          <div></div> {/* Espacio vacío abajo derecha */}
        </div>
      </div>
    );
  }

  // 4 o más apps: grid 2x2 (si hay más de 4, se muestran en filas adicionales)
  return (
    <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
      {apps.map(app => (
        <AppCard key={app.id} app={app} />
      ))}
    </div>
  );
}

export default function HubPage() {
  const { user, isLoadingAuth } = useAuth();
  const [allowedApps, setAllowedApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessChecked, setAccessChecked] = useState(false);

  useEffect(() => {
    checkUserAccess();
  }, [user, isLoadingAuth]);

  const checkUserAccess = async () => {
    // Si aún está cargando auth, esperar
    if (isLoadingAuth) return;

    try {
      setLoading(true);

      // Si no hay usuario logueado, mostrar todas las apps (comportamiento por defecto)
      if (!user || !user.email) {
        setAllowedApps(AVAILABLE_APPS);
        setAccessChecked(true);
        setLoading(false);
        return;
      }

      // Buscar el acceso del usuario por email
      const userEmail = user.email.toLowerCase();
      
      try {
        const accesses = await base44.entities.UserAccess.list();
        const userAccess = accesses?.find(
          access => access.email?.toLowerCase() === userEmail
        );

        if (userAccess && userAccess.apps && userAccess.apps.length > 0) {
          // Filtrar las apps permitidas manteniendo el orden definido en AVAILABLE_APPS
          const filtered = AVAILABLE_APPS.filter(app => 
            userAccess.apps.includes(app.id)
          );
          setAllowedApps(filtered);
        } else {
          // Si el usuario no tiene accesos configurados, no mostrar nada
          // O puedes cambiar esto para mostrar todas si prefieres
          setAllowedApps([]);
        }
      } catch (error) {
        console.error("Error fetching user access:", error);
        // Si hay error al obtener accesos, mostrar todas las apps
        setAllowedApps(AVAILABLE_APPS);
      }

      setAccessChecked(true);
    } finally {
      setLoading(false);
    }
  };

  // Pantalla de carga
  if (loading || isLoadingAuth) {
    return (
      <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
        <div className="absolute inset-[-40%] flex items-center justify-center pointer-events-none">
          <img
            src="https://wallpapercave.com/wp/wp9116464.jpg"
            alt=""
            className="w-[100%] h-[100%] object-cover opacity-60"
            style={{ animation: "hubSpin 180s linear infinite" }}
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none"></div>
        <div className="relative z-10 text-white text-xl">Cargando...</div>
        <style>
          {`@keyframes hubSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}
        </style>
      </div>
    );
  }

  // Si no hay apps permitidas
  if (accessChecked && allowedApps.length === 0) {
    return (
      <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
        <div className="absolute inset-[-40%] flex items-center justify-center pointer-events-none">
          <img
            src="https://wallpapercave.com/wp/wp9116464.jpg"
            alt=""
            className="w-[100%] h-[100%] object-cover opacity-60"
            style={{ animation: "hubSpin 180s linear infinite" }}
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Sin Accesos Configurados</h1>
          <p className="text-gray-400">
            No tienes aplicaciones asignadas. Contacta al administrador.
          </p>
          {user && (
            <p className="text-gray-500 text-sm mt-4">
              Usuario: {user.email}
            </p>
          )}
        </div>
        <style>
          {`@keyframes hubSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}
        </style>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-[-40%] flex items-center justify-center pointer-events-none">
        <img
          src="https://wallpapercave.com/wp/wp9116464.jpg"
          alt=""
          className="w-[100%] h-[100%] object-cover opacity-60"
          style={{ animation: "hubSpin 180s linear infinite" }}
        />
      </div>

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none"></div>

      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-3xl px-6 py-12">
        <AppsGrid apps={allowedApps} />
      </div>

      {/* Animación CSS */}
      <style>
        {`@keyframes hubSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}
      </style>
    </div>
  );
}