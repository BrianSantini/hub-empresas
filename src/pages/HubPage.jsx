import React from "react";
import { ExternalLink } from "lucide-react";

const HUBS = [
  { name: "Hache", url: "https://hache.base44.app" },
  { name: "La Capital Multimedios", url: "https://lacapitalmultimedios.base44.app" },
  { name: "Casanova", url: "https://casanovaabogados.base44.app" },
  { name: "Estiba", url: "https://estiba.base44.app" },
];

const LOGO_URL = "https://mintcdn.com/base44/RcyKqeFsNlShezsB/logo/Base44-Light-Mode-New.png";

export default function HubPage() {
  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden">
      {/* Rotating cosmic background */}
      <div className="absolute inset-[-40%] flex items-center justify-center pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=80"
          alt=""
          className="w-[180%] h-[180%] object-cover"
          style={{
            animation: "hubSpin 240s linear infinite",
          }}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-slate-950/80 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-6 py-12 flex flex-col gap-4">
        {HUBS.map((hub) => (
          <a
            key={hub.name}
            href={hub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-4 px-5 py-4 rounded-2xl
              bg-white/5 border border-white/5 backdrop-blur-md
              transition-all duration-500 ease-out
              hover:scale-[1.02] hover:bg-white/10 hover:border-white/15
              hover:shadow-[0_8px_32px_rgba(255,255,255,0.04)]"
          >
            {/* Logo */}
            <img
              src={LOGO_URL}
              alt={hub.name}
              className="h-8 w-auto object-contain
                grayscale opacity-70
                transition-all duration-500 ease-out
                group-hover:grayscale-0 group-hover:opacity-100"
            />

            {/* Name */}
            <span className="flex-1 text-sm font-medium tracking-wide text-white/70
              transition-colors duration-500 group-hover:text-white">
              {hub.name}
            </span>

            {/* External link icon — visible on hover */}
            <ExternalLink
              className="w-4 h-4 text-white/0 transition-all duration-500
                group-hover:text-white/50"
            />
          </a>
        ))}
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes hubSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
