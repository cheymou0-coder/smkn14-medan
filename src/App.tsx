import React, { useState, useEffect, useRef, useCallback } from "react";

interface OrgMember {
  id: number;
  nama: string;
  jabatan: string;
  kategori: string;
  foto: string;
}

export function App() {
  const orgData: OrgMember[] = [
    {
      id: 1,
      nama: "Andriyanti Pasaribu, S.Pd",
      jabatan: "Kepala Sekolah",
      kategori: "Pimpinan",
      foto: "",
    },
    {
      id: 2,
      nama: "Darmansyah Pohan, S.Pd., M.Pd",
      jabatan: "Wakil Kepala Sekolah Bid. Kurikulum",
      kategori: "Pimpinan",
      foto: "",
    },
    {
      id: 3,
      nama: "Lendrizon, S.Pd.",
      jabatan: "Wakil Kepala Sekolah Bid. Kesiswaan",
      kategori: "Pimpinan",
      foto: "",
    },
    {
      id: 4,
      nama: "Drs. Antoni Siregar",
      jabatan: "Wakil Kepala Sekolah Bid. Sarana Prasarana",
      kategori: "Pimpinan",
      foto: "",
    },
    {
      id: 5,
      nama: "Ahmad Anwar Siregar, S.Pd.",
      jabatan:
        "Wakil Kepala Sekolah Bid. Hub. Masyarakat dan Dunia Usaha / Industri",
      kategori: "Pimpinan",
      foto: "",
    },
    {
      id: 6,
      nama: "Syukri Abdullah Manik, S.Pd.",
      jabatan: "Teknik Konstruksi dan Properti",
      kategori: "Program Keahlian",
      foto: "",
    },
    {
      id: 7,
      nama: "Ependi Ginting, S.Pd",
      jabatan: "Teknik Otomotif",
      kategori: "Program Keahlian",
      foto: "",
    },
    {
      id: 8,
      nama: "Lily Dewi, S.Pd.",
      jabatan: "Teknik Kelistrikan",
      kategori: "Program Keahlian",
      foto: "",
    },
    {
      id: 9,
      nama: "Panahatan Sihombing",
      jabatan: "Teknik Pemesinan",
      kategori: "Program Keahlian",
      foto: "",
    },
    {
      id: 10,
      nama: "Eka Dharmayanti Manurung, S.Pd.",
      jabatan: "Teknik Komputer dan Informatika",
      kategori: "Program Keahlian",
      foto: "",
    },
    {
      id: 11,
      nama: "Drs. Zulkifli",
      jabatan: "Teknik Elektronika",
      kategori: "Program Keahlian",
      foto: "",
    },
    {
      id: 12,
      nama: "Ahmad Faisal, S.Pd",
      jabatan: "Pariwisata",
      kategori: "Program Keahlian",
      foto: "",
    },
    {
      id: 13,
      nama: "Darwin Sitepu",
      jabatan: "Desain Pemodelan dan Informasi Bangunan",
      kategori: "Kepala Bengkel",
      foto: "",
    },
    {
      id: 14,
      nama: "Reja Syahputra, S.Pd",
      jabatan: "Bisnis Konstruksi dan Properti",
      kategori: "Kepala Bengkel",
      foto: "",
    },
    {
      id: 15,
      nama: "Fermi Haris Bahagia Tarigan, S.Pd",
      jabatan: "Teknik Kendaraan Ringan",
      kategori: "Kepala Bengkel",
      foto: "",
    },
    {
      id: 16,
      nama: "Ahmad Ridwan, S.Pd.",
      jabatan: "Teknik Bisnis Sepeda Motor",
      kategori: "Kepala Bengkel",
      foto: "",
    },
    {
      id: 17,
      nama: "Drs. Tolen",
      jabatan: "Teknik Bodi Otomotif",
      kategori: "Kepala Bengkel",
      foto: "",
    },
    {
      id: 18,
      nama: "Juwita Vebrina Zebua, S.Pd.",
      jabatan: "Teknik Instalasi Tenaga Listrik",
      kategori: "Kepala Bengkel",
      foto: "",
    },
    {
      id: 19,
      nama: "Irma Debora Simatupang, S.Pd",
      jabatan: "Teknik Pemesinan",
      kategori: "Kepala Bengkel",
      foto: "",
    },
    {
      id: 20,
      nama: "Reni Famalia Sitorus, S.Pd",
      jabatan: "Teknik Komputer dan Jaringan",
      kategori: "Kepala Bengkel",
      foto: "",
    },
    {
      id: 21,
      nama: "Mukhlis Idrus, S.Kom",
      jabatan: "Rekayasa Perangkat Lunak",
      kategori: "Kepala Bengkel",
      foto: "",
    },
    {
      id: 22,
      nama: "Aron Heriyanto Naiborhu, S.Pd.",
      jabatan: "Teknik Elektronika Industri",
      kategori: "Kepala Bengkel",
      foto: "",
    },
    {
      id: 23,
      nama: "Sumiati, SE",
      jabatan: "Perhotelan",
      kategori: "Kepala Bengkel",
      foto: "",
    },
    {
      id: 24,
      nama: "Nurul Rafiqah, M.Si.",
      jabatan: "Kepala Perpustakaan",
      kategori: "Unit/Bidang",
      foto: "",
    },
    {
      id: 25,
      nama: "HARNAS, M.Pd",
      jabatan: "Kepala Lab. IPA",
      kategori: "Unit/Bidang",
      foto: "",
    },
    {
      id: 26,
      nama: "Ahmad Faisal, S.Pd.",
      jabatan: "Ketua BKK / PPKS",
      kategori: "Unit/Bidang",
      foto: "",
    },
  ];

  const [showFullOrgModal, setShowFullOrgModal] = useState<boolean>(false);
  const [activeOrgTab, setActiveOrgTab] = useState<string>("Semua");

  const [expandedHistoryId, setExpandedHistoryId] = useState<number | null>(
    null,
  );
  const [isSambutanExpanded, setIsSambutanExpanded] = useState<boolean>(false);
  const [activeVisiMisiTab, setActiveVisiMisiTab] = useState<"visi" | "misi">(
    "visi",
  );

  const [selectedRoute] = useState({
    name: "Medan",
    distance: "3.8 km",
    time: "11 Min",
  });
  const [activeSection, setActiveSection] = useState<string>("hero-top");
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const navRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  const [searchQuery, setSearchQuery] = useState("");

  const updateIndicator = useCallback((sectionId: string) => {
    const activeItem = navItemsRef.current[sectionId];
    if (activeItem && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      setIndicatorStyle({
        left: itemRect.left - navRect.left,
        width: itemRect.width > 0 ? itemRect.width : 70,
        opacity: 1,
      });
    }
  }, []);

  useEffect(() => {
    const sections = [
      "hero-top",
      "latar-belakang",
      "sambutan",
      "organisasi",
      "visi-misi",
      "peta",
      "kontak",
    ];
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          updateIndicator(entry.target.id);
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-30% 0px -30% 0px",
      threshold: 0,
    });

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [updateIndicator]);

  useEffect(() => {
    const sections = [
      "hero-top",
      "latar-belakang",
      "sambutan",
      "organisasi",
      "visi-misi",
      "peta",
      "kontak",
    ];
    sections.forEach((id) => {
      const el = document.getElementById(
        `nav-${id}`,
      ) as HTMLAnchorElement | null;
      if (el) navItemsRef.current[id] = el;
    });
    updateIndicator(activeSection);

    const handleResize = () => updateIndicator(activeSection);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeSection, updateIndicator]);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement> | null,
    id: string,
  ) => {
    if (e) e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.toLowerCase().trim();
    if (!q) return;

    if (q.includes("beranda")) scrollToSection(null, "hero-top");
    else if (q.includes("sejarah")) scrollToSection(null, "latar-belakang");
    else if (q.includes("sambutan")) scrollToSection(null, "sambutan");
    else if (q.includes("organisasi")) scrollToSection(null, "organisasi");
    else if (q.includes("visi") || q.includes("misi"))
      scrollToSection(null, "visi-misi");
    else if (q.includes("peta")) scrollToSection(null, "peta");
    else if (q.includes("hubungi") || q.includes("kontak"))
      scrollToSection(null, "kontak");
    else alert("maaf, yang anda cari sekarang sedang tidak ada.");
  };

  return (
    <main className="relative w-full bg-[#0a0a0a] text-white selection:bg-white selection:text-black scroll-smooth font-['Plus_Jakarta_Sans',sans-serif] min-h-screen overflow-x-clip">
      <div className="absolute top-0 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-neutral-800/30 rounded-full blur-[100px] md:blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-0 w-[200px] md:w-[500px] h-[200px] md:h-[500px] bg-zinc-700/20 rounded-full blur-[100px] md:blur-[140px] pointer-events-none -z-10" />

      {/* HEADER & NAVBAR UTAMA */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-12 py-5 md:py-6 pointer-events-none">
        <div className="pointer-events-auto hidden lg:flex items-center space-x-2 bg-neutral-900/90 backdrop-blur-xl px-5 py-3 rounded-full border border-white/10 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">
            SMKN 14 MEDAN
          </span>
        </div>

        <nav
          ref={navRef}
          className="pointer-events-auto mx-auto hidden md:flex items-center space-x-2 text-sm font-semibold text-neutral-300 bg-neutral-900/95 backdrop-blur-2xl p-2 rounded-full border border-white/15 shadow-2xl relative overflow-hidden"
        >
          <div className="w-8 h-8 flex items-center justify-center ml-2 mr-2 flex-shrink-0">
            <img
              src="/logo.jpg"
              alt="Logo SMKN 14"
              className="w-7 h-7 object-contain rounded-full"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>

          <div
            className="absolute top-2 bottom-2 rounded-full bg-white shadow-md transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width > 0 ? indicatorStyle.width : 70}px`,
              opacity: indicatorStyle.opacity,
            }}
          />
          {[
            { id: "hero-top", label: "Beranda" },
            { id: "latar-belakang", label: "Sejarah" },
            { id: "sambutan", label: "Sambutan" },
            { id: "organisasi", label: "Organisasi" },
            { id: "visi-misi", label: "Visi & Misi" },
            { id: "peta", label: "Peta" },
            { id: "kontak", label: "Hubungi" },
          ].map((menu) => (
            <a
              key={menu.id}
              id={`nav-${menu.id}`}
              href={`#${menu.id}`}
              onClick={(e) => scrollToSection(e, menu.id)}
              className={`relative z-10 px-5 py-2.5 rounded-full transition-colors duration-300 tracking-wider uppercase text-xs ${
                activeSection === menu.id
                  ? "text-black font-bold"
                  : "text-neutral-300 hover:text-white"
              }`}
            >
              {menu.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block w-[180px] pointer-events-none"></div>
      </header>

      {/* HERO SECTION */}
      <section
        id="hero-top"
        className="relative w-full min-h-screen overflow-hidden text-black pt-16 md:pt-0 bg-[#0d0d0d] flex items-center justify-center"
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/gedung.jpg"
            alt="Gedung SMKN 14 Medan Blur BG"
            className="w-full h-full object-cover filter blur-md scale-105 opacity-30"
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/gedung.jpg"
            alt="Gedung SMKN 14 Medan"
            className="max-w-none w-full h-full object-cover opacity-85"
          />
        </div>

        <div className="relative z-10 w-full min-h-screen flex flex-col px-4 md:px-8 lg:px-12 py-6 pt-12 md:pt-6 justify-center">
          <main className="flex-1 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 mt-4 md:mt-0">
            <div className="w-full lg:w-[55%] text-left lg:pl-16 xl:pl-24 mt-24 lg:mt-0">
              <div className="bg-white/40 backdrop-blur-md border border-white/50 p-8 lg:p-12 rounded-[32px] shadow-2xl">
                <h1 className="text-[42px] md:text-[60px] lg:text-[68px] font-[900] leading-[0.95] tracking-tight text-black drop-shadow-sm">
                  SMK NEGERI 14
                  <br />
                  <span className="font-[800] uppercase">MEDAN</span>
                </h1>

                <div className="flex flex-wrap gap-2 mt-6">
                  <span className="bg-white/90 backdrop-blur-sm border border-white/60 px-4 py-1.5 rounded-full text-[11px] text-black font-bold tracking-wide shadow-sm hover:bg-black hover:text-white transition-colors cursor-default">
                    BERWAWASAN TINGGI
                  </span>
                  <span className="bg-white/90 backdrop-blur-sm border border-white/60 px-4 py-1.5 rounded-full text-[11px] text-black font-bold tracking-wide shadow-sm hover:bg-black hover:text-white transition-colors cursor-default">
                    BERKOMPETENSI
                  </span>
                  <span className="bg-white/90 backdrop-blur-sm border border-white/60 px-4 py-1.5 rounded-full text-[11px] text-black font-bold tracking-wide shadow-sm hover:bg-black hover:text-white transition-colors cursor-default">
                    SIAP BEKERJA
                  </span>
                </div>

                <form
                  onSubmit={handleSearch}
                  className="bg-white/90 backdrop-blur-md border border-white/80 mt-8 rounded-full flex items-center px-4 py-3 w-full max-w-[520px] shadow-lg"
                >
                  <button type="submit" className="cursor-pointer">
                    <svg
                      className="w-5 h-5 text-zinc-500 hover:text-black transition"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari Menu: Sejarah, Sambutan, Organisasi..."
                    className="bg-transparent outline-none flex-1 ml-3 text-[13px] text-black placeholder:text-zinc-500 font-medium"
                  />
                </form>
              </div>
            </div>

            <div className="w-full max-w-[280px] lg:mr-16 mb-10 lg:mb-0">
              <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-[24px] p-6 text-center shadow-2xl">
                <p className="text-[10px] font-bold tracking-wide mb-4 text-black">
                  SCAN UNTUK MELIHAT WEBSITES OFFICIAL SEKOLAH
                </p>
                <div className="bg-white rounded-xl p-3 mx-auto w-fit shadow-inner border border-gray-100">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.smkn14medan.sch.id/"
                    alt="QR"
                    className="w-[132px] h-[132px]"
                  />
                </div>
                <p className="text-[11px] text-zinc-700 mt-4 leading-relaxed font-medium px-2">
                  Websites yang anda buka sekarang adalah Websites yang di
                  bangun Oleh Ananda Kami Raziq Hanan Fadillah, Salah Satu Siswa
                  SMK NEGERI 14 MEDAN
                </p>
              </div>
            </div>
          </main>
        </div>
      </section>

      {/* SECTION 01: SEJARAH - TOMBOL DI TENGAH DENGAN SEGITIGA MODERN (▶ / ◀) */}
      <section
        id="latar-belakang"
        className="w-full min-h-screen bg-[#0a0a0a] text-white py-24 md:py-36 relative overflow-hidden flex flex-col justify-center"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full px-6 md:px-20 mb-12 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-white/10 mb-6 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
              ARSIP SEJARAH // KRONOLOGI VOKASI
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Evolusi & Akar <br />
              <span className="font-normal text-neutral-400">
                Pendidikan Vokasi
              </span>
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 max-w-md font-normal leading-relaxed">
              Klik tombol <strong className="text-white">"Baca Detail"</strong>{" "}
              untuk membuka kotak secara mulus melebar ke arah kanan.
            </p>
          </div>
        </div>

        <div
          className="w-full overflow-x-auto pb-16 pt-4 px-6 md:px-20 flex gap-10 md:gap-14 snap-x snap-mandatory scrollbar-none relative z-10 focus:outline-none"
          tabIndex={0}
        >
          <div
            className={`flex-shrink-0 bg-[#121212] rounded-[32px] p-8 md:p-12 border border-white/10 shadow-2xl flex flex-col justify-between snap-start transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedHistoryId === 1 ? "w-[90vw] md:w-[820px] bg-neutral-900 border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]" : "w-[85vw] md:w-[460px]"}`}
          >
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase block mb-4">
                [ 01 — LATAR BELAKANG ]
              </span>

              <div
                className={`grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedHistoryId === 1 ? "grid-cols-1 md:grid-cols-2 gap-8 items-center" : "grid-cols-1"}`}
              >
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Awal Berdiri & Komitmen Vokasi
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-400 leading-relaxed mb-6">
                    SMK Negeri 14 Medan berdiri di atas lahan seluas 100.000 M²
                    dan didirikan pada tahun 2011 sebagai wujud nyata
                    pengembangan pendidikan kejuruan bermutu tinggi.
                  </p>

                  {/* Tombol diposisikan di tengah secara vertikal */}
                  <button
                    onClick={() =>
                      setExpandedHistoryId(expandedHistoryId === 1 ? null : 1)
                    }
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white hover:text-black text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer inline-flex items-center space-x-2"
                  >
                    <span>
                      {expandedHistoryId === 1 ? "Tutup Detail" : "Baca Detail"}
                    </span>
                    <span className="text-xs">
                      {expandedHistoryId === 1 ? "◀" : "▶"}
                    </span>
                  </button>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedHistoryId === 1 ? "opacity-100 max-h-[500px] md:border-l md:border-white/10 md:pl-8" : "opacity-0 max-h-0 md:max-h-[500px]"}`}
                >
                  <div className="space-y-4 text-xs md:text-sm text-neutral-300 font-normal leading-relaxed">
                    <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                      <p className="font-semibold text-white mb-1">
                        Fokus Pengembangan Strategis:
                      </p>
                      <p className="text-neutral-400">
                        Membangun fondasi pendidikan kejuruan yang tangguh,
                        berdisiplin tinggi, serta siap bersaing menghadapi
                        transformasi teknologi industri global.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-end">
              <span className="text-xs font-mono text-neutral-500 font-bold">
                01 / 04
              </span>
            </div>
          </div>

          <div
            className={`flex-shrink-0 bg-[#121212] rounded-[32px] p-8 md:p-12 border border-white/10 shadow-2xl flex flex-col justify-between snap-start relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedHistoryId === 2 ? "w-[90vw] md:w-[820px] bg-neutral-900 border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]" : "w-[85vw] md:w-[460px]"}`}
          >
            <div className="absolute -bottom-10 -right-10 text-[180px] font-bold text-white/[0.02] pointer-events-none">
              2011
            </div>
            <div className="relative z-10">
              <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase block mb-4">
                [ 02 — TAHAP PERINTISAN ]
              </span>

              <div
                className={`grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedHistoryId === 2 ? "grid-cols-1 md:grid-cols-2 gap-8 items-center" : "grid-cols-1"}`}
              >
                <div>
                  <h3 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-2">
                    2011
                  </h3>
                  <p className="text-sm font-semibold text-emerald-400 mb-4">
                    SMK Binaan Provinsi Sumatera Utara
                  </p>
                  <p className="text-xs md:text-sm text-neutral-400 leading-relaxed mb-6">
                    Di awal pendiriannya bernama SMK Binaan Provinsi, menjadi
                    titik awal peletakan batu pertama dan pengembangan
                    infrastruktur di wilayah Medan Barat.
                  </p>

                  <button
                    onClick={() =>
                      setExpandedHistoryId(expandedHistoryId === 2 ? null : 2)
                    }
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white hover:text-black text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer inline-flex items-center space-x-2"
                  >
                    <span>
                      {expandedHistoryId === 2 ? "Tutup Detail" : "Baca Detail"}
                    </span>
                    <span className="text-xs">
                      {expandedHistoryId === 2 ? "◀" : "▶"}
                    </span>
                  </button>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedHistoryId === 2 ? "opacity-100 max-h-[500px] md:border-l md:border-white/10 md:pl-8" : "opacity-0 max-h-0 md:max-h-[500px]"}`}
                >
                  <div className="space-y-4 text-xs md:text-sm text-neutral-300 font-normal leading-relaxed">
                    <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                      <p className="font-semibold text-white mb-1">
                        Koordinat Wilayah:
                      </p>
                      <p className="text-neutral-400">
                        Jl. Karya Dalam No.26, Karang Berombak, Kecamatan Medan
                        Barat, Kota Medan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-end relative z-10">
              <span className="text-xs font-mono text-neutral-500 font-bold">
                02 / 04
              </span>
            </div>
          </div>

          <div
            className={`flex-shrink-0 bg-white text-black rounded-[32px] p-8 md:p-12 border border-white shadow-2xl flex flex-col justify-between snap-start relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedHistoryId === 3 ? "w-[90vw] md:w-[820px] bg-neutral-100 border-black/30 shadow-2xl" : "w-[85vw] md:w-[460px]"}`}
          >
            <div className="absolute -bottom-10 -right-10 text-[180px] font-bold text-black/[0.03] pointer-events-none">
              2017
            </div>
            <div className="relative z-10">
              <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase block mb-4">
                [ 03 — TRANSFORMASI RESMI ]
              </span>

              <div
                className={`grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedHistoryId === 3 ? "grid-cols-1 md:grid-cols-2 gap-8 items-center" : "grid-cols-1"}`}
              >
                <div>
                  <h3 className="text-5xl md:text-6xl font-bold tracking-tight mb-2">
                    2017
                  </h3>
                  <p className="text-sm font-bold text-black mb-4">
                    Pengukuhan Menjadi SMK Negeri 14
                  </p>
                  <p className="text-xs md:text-sm text-neutral-600 leading-relaxed mb-6">
                    Secara resmi bertransformasi dan dikukuhkan menjadi SMK
                    Negeri 14 Medan, memperkuat standar kurikulum nasional serta
                    fasilitas praktik industri.
                  </p>

                  <button
                    onClick={() =>
                      setExpandedHistoryId(expandedHistoryId === 3 ? null : 3)
                    }
                    className="px-5 py-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer inline-flex items-center space-x-2"
                  >
                    <span>
                      {expandedHistoryId === 3 ? "Tutup Detail" : "Baca Detail"}
                    </span>
                    <span className="text-xs">
                      {expandedHistoryId === 3 ? "◀" : "▶"}
                    </span>
                  </button>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedHistoryId === 3 ? "opacity-100 max-h-[500px] md:border-l md:border-neutral-300 md:pl-8" : "opacity-0 max-h-0 md:max-h-[500px]"}`}
                >
                  <div className="space-y-4 text-xs md:text-sm text-neutral-700 font-normal leading-relaxed">
                    <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm">
                      <p className="font-bold text-black mb-1">Standar Mutu:</p>
                      <p className="text-neutral-600">
                        Meraih predikat Akreditasi A, menegaskan kualitas
                        layanan pendidikan dan kompetensi lulusan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200 flex items-center justify-end relative z-10">
              <span className="text-xs font-mono text-neutral-500 font-bold">
                03 / 04
              </span>
            </div>
          </div>

          <div
            className={`flex-shrink-0 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-[32px] p-8 md:p-12 border border-white/10 shadow-2xl flex flex-col justify-between snap-start transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedHistoryId === 4 ? "w-[90vw] md:w-[820px] bg-neutral-900 border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]" : "w-[85vw] md:w-[460px]"}`}
          >
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase block mb-4">
                [ 04 — SPASIAL KAMPUS ]
              </span>

              <div
                className={`grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedHistoryId === 4 ? "grid-cols-1 md:grid-cols-2 gap-8 items-center" : "grid-cols-1"}`}
              >
                <div>
                  <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
                    100.000 M²
                  </h3>
                  <p className="text-sm font-semibold text-neutral-300 mb-4">
                    Area Kawasan Pendidikan Terpadu
                  </p>
                  <p className="text-xs md:text-sm text-neutral-400 leading-relaxed mb-6">
                    Kawasan luas yang menampung berbagai fasilitas penunjang,
                    laboratorium komputer, bengkel teknik, hingga pusat kegiatan
                    siswa.
                  </p>

                  <button
                    onClick={() =>
                      setExpandedHistoryId(expandedHistoryId === 4 ? null : 4)
                    }
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white hover:text-black text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer inline-flex items-center space-x-2"
                  >
                    <span>
                      {expandedHistoryId === 4 ? "Tutup Detail" : "Baca Detail"}
                    </span>
                    <span className="text-xs">
                      {expandedHistoryId === 4 ? "◀" : "▶"}
                    </span>
                  </button>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedHistoryId === 4 ? "opacity-100 max-h-[500px] md:border-l md:border-white/10 md:pl-8" : "opacity-0 max-h-0 md:max-h-[500px]"}`}
                >
                  <div className="space-y-4 text-xs md:text-sm text-neutral-300 font-normal leading-relaxed">
                    <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                      <p className="font-semibold text-white mb-1">
                        Fasilitas Praktik Utama:
                      </p>
                      <p className="text-neutral-400">
                        Menyediakan ruang praktik siswa lengkap untuk menunjang
                        kompetensi keahlian komputer, jaringan, dan teknik
                        otomotif.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-end">
              <span className="text-xs font-mono text-neutral-500 font-bold">
                04 / 04
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: SAMBUTAN KEPALA SEKOLAH */}
      <section
        id="sambutan"
        className="w-full min-h-screen bg-[#070707] text-white px-6 md:px-20 py-20 md:py-40 flex flex-col justify-center border-t border-white/5 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 md:mb-20 gap-8">
            <div>
              <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-neutral-900 border border-white/10 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
                  HALAMAN SAMBUTAN KEPALA SEKOLAH
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                Sambutan Kepala <br />
                <span className="font-normal text-neutral-400">Sekolah</span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-neutral-400 max-w-md font-normal leading-relaxed">
              Pimpinan institusi dalam memimpin dan mengembangkan ekosistem
              pendidikan vokasi yang unggul dan berkarakter.
            </p>
          </div>

          <div
            className={`bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-[32px] p-8 md:p-12 border border-white/15 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isSambutanExpanded ? "max-w-6xl mx-auto border-white/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)]" : "max-w-4xl mx-auto"}`}
          >
            <div
              className={`grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isSambutanExpanded ? "grid-cols-1 lg:grid-cols-12 gap-10 items-center" : "grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"}`}
            >
              <div
                className={`${isSambutanExpanded ? "lg:col-span-4" : "lg:col-span-5"} flex flex-col`}
              >
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-black aspect-[3/4] relative group">
                  <img
                    src="/KEPSEK.jpg"
                    alt="Kepala SMK Negeri 14 Medan"
                    className="w-full h-full object-cover object-top filter grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
              </div>

              <div
                className={`${isSambutanExpanded ? "lg:col-span-4" : "lg:col-span-7"} flex flex-col justify-between`}
              >
                <div className="space-y-4">
                  <div className="inline-block px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono uppercase tracking-wider text-emerald-400 mb-1">
                    PROFIL & BIODATA PIMPINAN
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      Andriyanti Pasaribu, S.Pd
                    </h3>
                    <p className="text-xs font-semibold text-neutral-400 mt-0.5">
                      Kepala SMK Negeri 14 Medan
                    </p>
                  </div>
                  <div className="space-y-2.5 text-xs md:text-sm text-neutral-300 pt-2">
                    <div className="bg-black/40 p-3.5 rounded-xl border border-white/5 flex justify-between items-center">
                      <span className="text-neutral-400 font-medium">
                        Bidang Keahlian
                      </span>
                      <span className="text-white font-semibold">
                        Manajemen & Pendidikan Vokasi
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setIsSambutanExpanded(!isSambutanExpanded)}
                    className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white hover:text-black text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer w-full text-center"
                  >
                    {isSambutanExpanded
                      ? "Tutup Sambutan ▲"
                      : "Baca Sambutan Lengkap →"}
                  </button>
                </div>
              </div>

              {isSambutanExpanded && (
                <div className="lg:col-span-4 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/15 pt-6 lg:pt-0 lg:pl-8 animate-fade-in">
                  <div>
                    <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-2">
                      [ KATA SAMBUTAN ]
                    </span>
                    <p className="text-base font-semibold text-white mb-3">
                      Assalamu'alaikum wr.wb.
                    </p>
                    <div className="space-y-3 text-xs md:text-sm text-neutral-300 font-normal leading-relaxed text-justify">
                      <p>
                        Puji syukur kepada Allah SWT atas rahmat-Nya sehingga
                        website SMK Negeri 14 Medan ini dapat terbit untuk
                        menjawab kebutuhan informasi berbasis teknologi.
                      </p>
                      <p>
                        Mari bersama-sama kita wujudkan lulusan vokasi yang
                        kompeten, berkarakter luhur, dan siap menghadapi
                        tantangan dunia kerja modern.
                      </p>
                    </div>
                    <p className="text-xs font-semibold text-white italic pt-4">
                      Wassalamu'alaikum wr.wb.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: STRUKTUR ORGANISASI */}
      <section
        id="organisasi"
        className="w-full min-h-screen bg-black text-white px-6 md:px-20 py-20 md:py-40 transition-all border-t border-white/10 relative scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
                PROFIL SEKOLAH // STRUKTUR ORGANISASI
              </p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
                Struktur Pimpinan Utama
              </h2>
              <div className="w-24 h-1 bg-neutral-700 mt-4 rounded-full"></div>
            </div>

            <button
              onClick={() => setShowFullOrgModal(true)}
              className="px-6 py-4 rounded-2xl bg-white hover:bg-neutral-200 text-black text-xs font-extrabold uppercase tracking-widest transition-all duration-300 shadow-xl cursor-pointer flex items-center space-x-3 group"
            >
              <span>Lihat Struktur Organisasi Lengkap</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orgData
              .filter((item) => item.kategori === "Pimpinan")
              .map((org, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-b from-neutral-900/90 to-neutral-950 rounded-2xl p-6 md:p-8 border border-neutral-800 shadow-xl relative group overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-emerald-400 bg-neutral-950 px-3 py-1 rounded-md border border-neutral-800/80">
                        {org.jabatan.includes("Kepala Sekolah") &&
                        !org.jabatan.includes("Wakil")
                          ? "Kepala Sekolah"
                          : "Wakil Kepala Sekolah"}
                      </span>
                      <span className="text-xs font-mono text-neutral-600">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-serif font-bold text-white mb-2">
                      {org.nama}
                    </h3>
                    <p className="text-xs text-neutral-400 font-medium leading-relaxed">
                      {org.jabatan}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                    <span>SMKN 14 MEDAN</span>
                    <span className="text-emerald-400">PIMPINAN</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* SECTION: VISI DAN MISI */}
      <section
        id="visi-misi"
        className="w-full min-h-screen bg-[#050505] text-white px-6 md:px-20 py-20 md:py-40 transition-all border-t border-white/5 relative scroll-mt-24"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
            <div>
              <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-neutral-900 border border-white/10 mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 font-bold">
                  FOUNDATION // VISI & MISI
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
                Visi & Misi SMK Negeri <br />
                <span className="text-neutral-500 font-normal">14 Medan</span>
              </h2>
            </div>

            <div className="bg-neutral-900 p-1.5 rounded-2xl border border-white/10 flex items-center space-x-2 shadow-xl">
              <button
                onClick={() => setActiveVisiMisiTab("visi")}
                className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeVisiMisiTab === "visi" ? "bg-white text-black shadow-lg scale-105" : "text-neutral-400 hover:text-white"}`}
              >
                Visi Sekolah
              </button>
              <button
                onClick={() => setActiveVisiMisiTab("misi")}
                className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeVisiMisiTab === "misi" ? "bg-white text-black shadow-lg scale-105" : "text-neutral-400 hover:text-white"}`}
              >
                Misi Pendidikan (8 Poin)
              </button>
            </div>
          </div>

          {activeVisiMisiTab === "visi" && (
            <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-black rounded-[36px] p-10 md:p-16 border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden animate-fade-in">
              <div className="absolute -top-20 -right-20 text-[240px] font-bold text-white/[0.02] pointer-events-none font-serif">
                VISI
              </div>
              <div className="max-w-4xl relative z-10">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono tracking-widest text-emerald-400 mb-8 uppercase">
                  [ TUJUAN UTAMA STRATEGIS ]
                </span>
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-serif font-medium text-neutral-100 leading-[1.4] italic tracking-tight">
                  &ldquo;Terwujudnya Lembaga Pendidikan Kejuruan yang
                  menghasilkan peserta didik yang berkarakter nasional,
                  berkemampuan global dan menjadi sekolah rujukan.&rdquo;
                </h3>
              </div>
            </div>
          )}

          {activeVisiMisiTab === "misi" && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  {
                    title: "Pembelajaran Berbasis Teknologi",
                    desc: "Melakukan pembelajaran dengan memegang teguh nilai-nilai bangsa Indonesia berbasis teknologi, komunikasi, dan informasi.",
                  },
                  {
                    title: "Kecakapan Hidup (Life Skills)",
                    desc: "Menyiapkan peserta didik yang memiliki kecakapan hidup untuk mampu mengatasi berbagai tantangan dan masalah.",
                  },
                  {
                    title: "Jiwa Wirausaha (Entrepreneurship)",
                    desc: "Menyiapkan peserta didik yang memiliki jiwa wirausaha untuk mampu menciptakan lapangan kerja mandiri.",
                  },
                  {
                    title: "Kurikulum & Penilaian Standar",
                    desc: "Memperkuat standar kurikulum dan penilaian hasil belajar peserta didik secara berkala.",
                  },
                  {
                    title: "Mutu Pengelolaan Sekolah",
                    desc: "Meningkatkan pengelolaan sekolah dan jaminan kualitas yang berbasis pada standar mutu tinggi.",
                  },
                  {
                    title: "Sekolah Patok Duga (Rujukan)",
                    desc: "Menjadikan lembaga pendidikan sebagai patok duga bagi pengembangan sekolah kejuruan lainnya.",
                  },
                  {
                    title: "Kemitraan Global & Nasional",
                    desc: "Mengembangkan lembaga dengan menjalin kemitraan baik dengan institusi nasional maupun internasional.",
                  },
                  {
                    title: "Komunikasi Bahasa Global",
                    desc: "Mengembangkan proses pembelajaran dengan penguasaan bahasa komunikasi global.",
                  },
                ].map((misi, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-b from-neutral-900/90 to-neutral-950 p-6 md:p-8 rounded-[28px] border border-white/10 hover:border-white/30 transition-all duration-500 shadow-xl flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-emerald-400 group-hover:bg-white group-hover:text-black transition-colors">
                          0{index + 1}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-3 group-hover:text-neutral-200 transition-colors leading-snug">
                        {misi.title}
                      </h4>
                      <p className="text-xs text-neutral-400 font-normal leading-relaxed">
                        {misi.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 04: PETA LOKASI */}
      <section
        id="peta"
        className="w-full min-h-screen bg-[#050505] text-white px-6 md:px-20 py-20 md:py-40 flex flex-col justify-center relative overflow-hidden border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
            <div>
              <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-white/15 mb-6 backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] font-mono tracking-[0.25em] text-emerald-400 font-bold">
                  SYSTEM // GPS RADAR HUD v2.6
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
                Koordinat Peta & Navigasi
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 bg-gradient-to-br from-neutral-900/90 to-black rounded-[32px] p-8 md:p-10 border border-white/15 shadow-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  SMK Negeri 14 Medan
                </h3>
                <p className="text-xs md:text-sm text-neutral-400 font-medium leading-relaxed mb-6">
                  Jl. Karya Dalam No.26, Karang Berombak, Kec. Medan Barat, Kota
                  Medan
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-center">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">
                      JARAK
                    </span>
                    <span className="text-xl font-bold text-white font-mono">
                      {selectedRoute.distance}
                    </span>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-center">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">
                      WAKTU
                    </span>
                    <span className="text-xl font-bold text-emerald-400 font-mono">
                      {selectedRoute.time}
                    </span>
                  </div>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=SMK+Negeri+14+Medan`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white text-black px-6 py-4 rounded-2xl text-xs uppercase tracking-wider font-extrabold hover:bg-neutral-200 transition text-center shadow-xl"
              >
                Buka Navigasi Satelit
              </a>
            </div>

            <div className="lg:col-span-7 bg-neutral-900/90 rounded-[32px] overflow-hidden border border-white/15 shadow-2xl min-h-[480px]">
              <iframe
                title="Peta Lokasi SMKN 14 Medan"
                src="https://maps.google.com/maps?q=SMK+Negeri+14+Medan,+Jl.+Karya+Dalam+No.26,+Medan&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "520px" }}
                allowFullScreen={true}
                loading="lazy"
                className="w-full h-full filter contrast-125 invert-[0.92] hue-rotate-180 opacity-90"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="kontak"
        className="w-full bg-[#030303] text-white border-t border-white/10 px-6 md:px-20 py-24 pb-16 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
            <div className="lg:col-span-6">
              <div className="flex items-center space-x-3 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
                <span className="text-sm font-bold tracking-[0.25em] uppercase">
                  SMK NEGERI 14 MEDAN
                </span>
              </div>
              <p className="text-sm text-neutral-400 font-normal max-w-md leading-relaxed mb-6">
                Jl. Karya Dalam No.26, Karang Berombak, Kec. Medan Barat, Kota
                Medan, Sumatera Utara 20117
              </p>
            </div>
            <div className="lg:col-span-6 flex flex-col lg:items-end justify-between">
              <p className="text-xs text-neutral-600 font-semibold tracking-wider text-right">
                Website Ini Adalah Bukti Bahwa Umur Tidak Menentukan Apa Yang
                Dihasilkan, Namun Membuktikan Usaha Apa Yang Diberikan
              </p>
            </div>
          </div>
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <p>© 2026 SMK Negeri 14 Medan. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* MODAL: STRUKTUR ORGANISASI LENGKAP */}
      {showFullOrgModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 md:p-10 animate-fade-in overflow-y-auto">
          <div className="bg-[#0e0e0e] text-white border border-white/15 rounded-[32px] p-6 md:p-10 max-w-6xl w-full shadow-[0_25px_80px_rgba(0,0,0,0.9)] max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-5">
              <div>
                <span className="text-[10px] font-mono tracking-[0.3em] text-emerald-400 uppercase block mb-1">
                  {" "}
                  DIREKTORI LENGKAP SEKOLAH{" "}
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold tracking-tight">
                  Struktur Organisasi & Personel
                </h3>
              </div>
              <button
                onClick={() => setShowFullOrgModal(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-black flex items-center justify-center text-xl font-bold transition cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-8 bg-neutral-900/80 p-2 rounded-2xl border border-white/10">
              {[
                "Semua",
                "Pimpinan",
                "Program Keahlian",
                "Kepala Bengkel",
                "Unit/Bidang",
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveOrgTab(cat)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    activeOrgTab === cat
                      ? "bg-white text-black shadow-lg"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {cat} (
                  {cat === "Semua"
                    ? orgData.length
                    : orgData.filter((d) => d.kategori === cat).length}
                  )
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-y-auto pr-2 pb-4 scrollbar-none">
              {(activeOrgTab === "Semua"
                ? orgData
                : orgData.filter((item) => item.kategori === activeOrgTab)
              ).map((org, index) => (
                <div
                  key={index}
                  className="bg-neutral-950/80 rounded-2xl p-6 border border-white/10 shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-neutral-400 bg-neutral-900 px-3 py-1 rounded-md border border-white/5">
                      {org.kategori}
                    </span>
                    <h4 className="text-base font-serif font-bold text-white mt-3 mb-1">
                      {org.nama}
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {org.jabatan}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-neutral-600">
                    ID #{org.id} // SMKN 14 MEDAN
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 text-center">
              <button
                onClick={() => setShowFullOrgModal(false)}
                className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white hover:text-black text-xs font-bold uppercase tracking-wider transition cursor-pointer"
              >
                Tutup Direktori
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// update

export default App;
