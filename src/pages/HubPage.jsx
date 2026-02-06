import React from "react";
import { ExternalLink } from "lucide-react";

export default function HubPage() {
  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden">
      
      <div className="absolute inset-[-40%] flex items-center justify-center pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=80"
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
            className="group relative rounded-2xl bg-white bg-opacity-5 border border-white border-opacity-10 backdrop-blur-md flex flex-col items-center justify-center p-6 transition-all duration-500 hover:bg-opacity-20 hover:border-opacity-40 hover:shadow-2xl hover:shadow-white/30 hover:scale-105"
            style={{aspectRatio: "1/1"}}
          >
            <div className="absolute inset-0 rounded-2xl bg-white opacity-0 transition-opacity duration-500 group-hover:opacity-10"></div>
            <div className="flex-1 flex items-center justify-center w-full relative z-10">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6983a2ceb064115bb66490cb/6ffcc1cfb_ChatGPTImage5feb202610_47_20.png" 
                alt="Hache" 
                className="object-contain"
                style={{maxWidth: "70%", maxHeight: "70%"}}
              />
            </div>
            <span className="text-sm font-medium tracking-wide text-white text-opacity-70 text-center mt-2 relative z-10 transition-all duration-500 group-hover:text-opacity-100">Hache</span>
            <ExternalLink className="absolute top-3 right-3 w-4 h-4 text-white text-opacity-0 transition-all duration-500 group-hover:text-opacity-70 z-10" />
          </a>

          <a 
            href="https://lacapitalmultimedios.base44.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative rounded-2xl bg-white bg-opacity-5 border border-white border-opacity-10 backdrop-blur-md flex flex-col items-center justify-center p-6 transition-all duration-500 hover:bg-opacity-20 hover:border-opacity-40 hover:shadow-2xl hover:shadow-white/30 hover:scale-105"
            style={{aspectRatio: "1/1"}}
          >
            <div className="absolute inset-0 rounded-2xl bg-white opacity-0 transition-opacity duration-500 group-hover:opacity-10"></div>
            <div className="flex-1 flex items-center justify-center w-full relative z-10">
              <img 
                src="https://base44.app/api/apps/6980a1b99f15bcad4675bfb0/files/public/6980a1b99f15bcad4675bfb0/4b8b96964_ChatGPTImage2feb202610_13_44.png" 
                alt="La Capital Multimedios" 
                className="object-contain"
                style={{maxWidth: "70%", maxHeight: "70%"}}
              />
            </div>
            <span className="text-sm font-medium tracking-wide text-white text-opacity-70 text-center mt-2 relative z-10 transition-all duration-500 group-hover:text-opacity-100">La Capital Multimedios</span>
            <ExternalLink className="absolute top-3 right-3 w-4 h-4 text-white text-opacity-0 transition-all duration-500 group-hover:text-opacity-70 z-10" />
          </a>

          <a 
            href="https://casanovaabogados.base44.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative rounded-2xl bg-white bg-opacity-5 border border-white border-opacity-10 backdrop-blur-md flex flex-col items-center justify-center p-6 transition-all duration-500 hover:bg-opacity-20 hover:border-opacity-40 hover:shadow-2xl hover:shadow-white/30 hover:scale-105"
            style={{aspectRatio: "1/1"}}
          >
            <div className="absolute inset-0 rounded-2xl bg-white opacity-0 transition-opacity duration-500 group-hover:opacity-10"></div>
            <div className="flex-1 flex items-center justify-center w-full relative z-10">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69834ed290afab1ffdc6e966/dc9f43d33_casanova.png" 
                alt="Casanova" 
                className="object-contain"
                style={{maxWidth: "70%", maxHeight: "70%"}}
              />
            </div>
            <span className="text-sm font-medium tracking-wide text-white text-opacity-70 text-center mt-2 relative z-10 transition-all duration-500 group-hover:text-opacity-100">Casanova</span>
            <ExternalLink className="absolute top-3 right-3 w-4 h-4 text-white text-opacity-0 transition-all duration-500 group-hover:text-opacity-70 z-10" />
          </a>

          <a 
            href="https://estiba.base44.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative rounded-2xl bg-white bg-opacity-5 border border-white border-opacity-10 backdrop-blur-md flex flex-col items-center justify-center p-6 transition-all duration-500 hover:bg-opacity-20 hover:border-opacity-40 hover:shadow-2xl hover:shadow-white/30 hover:scale-105"
            style={{aspectRatio: "1/1"}}
          >
            <div className="absolute inset-0 rounded-2xl bg-white opacity-0 transition-opacity duration-500 group-hover:opacity-10"></div>
            <div className="flex-1 flex items-center justify-center w-full relative z-10">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_6980928ed81e2aed5e54a361/1c7d0c11c_ChatGPTImage4feb202610_37_32.png" 
                alt="Estiba" 
                className="object-contain"
                style={{maxWidth: "70%", maxHeight: "70%"}}
              />
            </div>
            <span className="text-sm font-medium tracking-wide text-white text-opacity-70 text-center mt-2 relative z-10 transition-all duration-500 group-hover:text-opacity-100">Estiba</span>
            <ExternalLink className="absolute top-3 right-3 w-4 h-4 text-white text-opacity-0 transition-all duration-500 group-hover:text-opacity-70 z-10" />
          </a>

        </div>
      </div>

      <style>
        {`@keyframes hubSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}
      </style>
    </div>
  );
}