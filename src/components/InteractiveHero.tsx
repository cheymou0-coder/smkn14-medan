import React from "react";

export const InteractiveHero: React.FC = () => {
  return (
    <div className="relative w-screen h-screen bg-white overflow-hidden flex flex-col justify-between">
      {/* Latar Belakang Gambar Fullscreen */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-white">
        <img
          src="/hero-bg.jpg"
          alt="Minimalist Hero"
          className="w-full h-full object-cover mix-blend-multiply opacity-95"
        />
      </div>

      {/* Teks Deskripsi di Pojok Kiri Bawah */}
      <div className="relative z-20 p-8 md:p-12 mt-auto pointer-events-none">
        <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-black/40 mb-2">
          est. digital archive
        </p>
        <h1 className="text-xl md:text-2xl font-normal tracking-tight text-black/90 max-w-sm leading-snug">
          Sekolah Berkualitas Memiliki Web Berkualitas
        </h1>
      </div>
    </div>
  );
};
