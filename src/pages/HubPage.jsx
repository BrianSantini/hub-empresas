import React from "react";
import { ExternalLink } from "lucide-react";

export default function HubPage() {
  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden">
      
      <div className="absolute inset-[-40%] flex items-center justify-center pointer-events-none">
        <img
          src="https://img.freepik.com/foto-gratis/formas-geometricas-abstractas-fondo-o-textura_1194-301824.jpg?t=st=1770383339~exp=1770386939~hmac=72ec729cb394392f360f30e55afc278e8f46e86d1cbdfd23e369d5e8025dd138&w=1480"
          alt=""
          className="w-[180%] h-[180%] object-cover opacity-50"
          style={{animation: "hubSpin 240s linear infinite"}}
        />
      </div>

      <div className="absolute inset-0 bg-slate-950 bg-opacity-70 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-3xl px-6 py-12">
        <div className="grid grid-cols-2 gap-4">
          
          <a 
            href="https://hache.base44.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative rounded-2xl bg-black border border-white border-opacity-10 flex items-center justify-center p-6 transition-all duration-500 hover:border-opacity-60 hover:border-white"
            style={{aspectRatio: "1/1"}}
          >
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6983a2ceb064115bb66490cb/6ffcc1cfb_ChatGPTImage5feb202610_47_20.png" 
              alt="Hache" 
              className="object-contain"
              style={{width: "70%", height: "70%"}}
            />
          </a>

          <a 
            href="https://lacapitalmultimedios.base44.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative rounded-2xl bg-black border border-white border-opacity-10 flex items-center justify-center p-6 transition-all duration-500 hover:border-opacity-60 hover:border-white"
            style={{aspectRatio: "1/1"}}
          >
            <img 
              src="https://base44.app/api/apps/6980a1b99f15bcad4675bfb0/files/public/6980a1b99f15bcad4675bfb0/4b8b96964_ChatGPTImage2feb202610_13_44.png" 
              alt="La Capital Multimedios" 
              className="object-contain"
              style={{width: "80%", height: "80%"}}
            />
          </a>

          <a 
            href="https://casanovaabogados.base44.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative rounded-2xl bg-black border border-white border-opacity-10 flex items-center justify-center p-6 transition-all duration-500 hover:border-opacity-60 hover:border-white"
            style={{aspectRatio: "1/1"}}
          >
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69834ed290afab1ffdc6e966/dc9f43d33_casanova.png" 
              alt="Casanova" 
              className="object-contain"
              style={{width: "100%", height: "100%"}}
            />
          </a>

          <a 
            href="https://estiba.base44.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative rounded-2xl bg-black border border-white border-opacity-10 flex items-center justify-center p-6 transition-all duration-500 hover:border-opacity-60 hover:border-white"
            style={{aspectRatio: "1/1"}}
          >
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_6980928ed81e2aed5e54a361/1c7d0c11c_ChatGPTImage4feb202610_37_32.png" 
              alt="Estiba" 
              className="object-contain"
              style={{width: "80%", height: "80%"}}
            />
          </a>

        </div>
      </div>

      <style>
        {`@keyframes hubSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}
      </style>
    </div>
  );
}