import React from "react";
import { ExternalLink } from "lucide-react";

export default function HubPage() {
  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-slate-950 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-3xl px-6 py-12">
        <div className="grid grid-cols-2 gap-4">
          
          <a 
            href="https://hache.base44.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative rounded-2xl bg-white bg-opacity-5 border border-white border-opacity-5 backdrop-blur-md flex flex-col items-center justify-center p-6"
            style={{aspectRatio: "1/1"}}
          >
            <div className="flex-1 flex items-center justify-center w-full">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6983a2ceb064115bb66490cb/6ffcc1cfb_ChatGPTImage5feb202610_47_20.png" 
                alt="Hache" 
                className="object-contain grayscale opacity-70"
                style={{maxWidth: "70%", maxHeight: "70%"}}
              />
            </div>
            <span className="text-sm font-medium tracking-wide text-white text-opacity-70 text-center mt-2">Hache</span>
            <ExternalLink className="absolute top-3 right-3 w-4 h-4 text-white text-opacity-0" />
          </a>

          <a 
            href="https://lacapitalmultimedios.base44.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative rounded-2xl bg-white bg-opacity-5 border border-white border-opacity-5 backdrop-blur-md flex flex-col items-center justify-center p-6"
            style={{aspectRatio: "1/1"}}
          >
            <div className="flex-1 flex items-center justify-center w-full">
              <span className="text-5xl font-bold text-white text-opacity-30">L</span>
            </div>
            <span className="text-sm font-medium tracking-wide text-white text-opacity-70 text-center mt-2">La Capital Multimedios</span>
            <ExternalLink className="absolute top-3 right-3 w-4 h-4 text-white text-opacity-0" />
          </a>

          <a 
            href="https://casanovaabogados.base44.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative rounded-2xl bg-white bg-opacity-5 border border-white border-opacity-5 backdrop-blur-md flex flex-col items-center justify-center p-6"
            style={{aspectRatio: "1/1"}}
          >
            <div className="flex-1 flex items-center justify-center w-full">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69834ed290afab1ffdc6e966/dc9f43d33_casanova.png" 
                alt="Casanova" 
                className="object-contain grayscale opacity-70"
                style={{maxWidth: "70%", maxHeight: "70%"}}
              />
            </div>
            <span className="text-sm font-medium tracking-wide text-white text-opacity-70 text-center mt-2">Casanova</span>
            <ExternalLink className="absolute top-3 right-3 w-4 h-4 text-white text-opacity-0" />
          </a>

          <a 
            href="https://estiba.base44.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative rounded-2xl bg-white bg-opacity-5 border border-white border-opacity-5 backdrop-blur-md flex flex-col items-center justify-center p-6"
            style={{aspectRatio: "1/1"}}
          >
            <div className="flex-1 flex items-center justify-center w-full">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_6980928ed81e2aed5e54a361/1c7d0c11c_ChatGPTImage4feb202610_37_32.png" 
                alt="Estiba" 
                className="object-contain grayscale opacity-70"
                style={{maxWidth: "70%", maxHeight: "70%"}}
              />
            </div>
            <span className="text-sm font-medium tracking-wide text-white text-opacity-70 text-center mt-2">Estiba</span>
            <ExternalLink className="absolute top-3 right-3 w-4 h-4 text-white text-opacity-0" />
          </a>

        </div>
      </div>
    </div>
  );
}