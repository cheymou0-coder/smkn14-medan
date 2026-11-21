interface Teacher {
  id: number;
  nama: string;
  mapel: string;
  foto: string;
}

const teacherData: Teacher[] = [
  { id: 1, nama: "Guru 1", mapel: "Tenaga Pendidik", foto: "/guru1.jpg" },
  { id: 2, nama: "Guru 2", mapel: "Tenaga Pendidik", foto: "/guru2.jpg" },
  { id: 3, nama: "Guru 3", mapel: "Tenaga Pendidik", foto: "/guru 3.jpeg" },
  { id: 4, nama: "Guru 4", mapel: "Tenaga Pendidik", foto: "/guru 4.jpg" },
  { id: 5, nama: "Guru 5", mapel: "Tenaga Pendidik", foto: "/guru 5.jpg" },
  { id: 6, nama: "Guru 6", mapel: "Tenaga Pendidik", foto: "/guru 6.jpg" },
  { id: 7, nama: "Guru 7", mapel: "Tenaga Pendidik", foto: "/guru 7.jpg" },
  { id: 8, nama: "Guru 8", mapel: "Tenaga Pendidik", foto: "/guru 8.jpg" },
  { id: 9, nama: "Guru 9", mapel: "Tenaga Pendidik", foto: "/guru 9.jpg" },
  { id: 10, nama: "Guru 10", mapel: "Tenaga Pendidik", foto: "/guru 10.jpg" },
];

export function TeacherMarquee() {
  const marqueeList = [...teacherData, ...teacherData];

  return (
    <section className="mt-16 pt-12 border-t border-white/10 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 px-6 md:px-20 max-w-7xl mx-auto gap-2">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
            DIREKTORI PENGAJAR // SMKN 14 MEDAN
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
            Guru & Tenaga Pendidik
          </h3>
        </div>
        <p className="text-xs text-neutral-400">
          Arahkan kursor pada kartu untuk menjeda pergerakan
        </p>
      </div>

      <div
        className="relative w-full overflow-hidden py-4"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex flex-row flex-nowrap w-max animate-marquee-guru">
          {marqueeList.map((guru, idx) => (
            <div key={`${guru.id}-${idx}`} className="pr-4 shrink-0">
              <div className="group w-56 sm:w-64 rounded-2xl bg-neutral-900/95 border border-white/10 hover:border-white/30 overflow-hidden transition-colors duration-300">
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-neutral-950">
                  <img
                    src={guru.foto}
                    alt={guru.nama}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3.5 right-3.5">
                    <p className="text-sm font-bold text-white truncate">
                      {guru.nama}
                    </p>
                    <p className="text-xs text-neutral-300 truncate mt-0.5">
                      {guru.mapel}
                    </p>
                  </div>
                </div>
                <div className="px-3.5 py-2.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                  <span>ID #{String(guru.id).padStart(2, "0")}</span>
                  <span>SMKN 14 MEDAN</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
