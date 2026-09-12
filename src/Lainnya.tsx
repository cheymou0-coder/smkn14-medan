import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Mengambil styling Tailwind utama

export function Lainnya() {
  return (
    <main className="w-full min-h-screen bg-white text-black flex flex-col items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-3">
          Halaman Lainnya
        </h1>
        <p className="text-neutral-500 text-sm mb-6">
          Halaman kosong dengan latar belakang putih bersih di tab terpisah.
        </p>
        <a
          href="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-md"
        >
          ← Kembali ke Beranda
        </a>
      </div>
    </main>
  );
}

// Render komponen ke root div di Lainnya.html
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Lainnya />
  </React.StrictMode>,
);

export default Lainnya;
