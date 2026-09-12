import React, { useEffect, useRef, useState, useCallback } from "react";
import { InteractiveHero } from "./components/InteractiveHero";
import { recordLoginLog } from "./loginLogger";

// Definisikan tipe data untuk anggota organisasi
interface OrgMember {
  id: number;
  nama: string;
  jabatan: string;
  kategori: string;
  foto: string;
}

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("smkn14_is_logged_in") === "true";
  });

  const [loginRole, setLoginRole] = useState<string | null>(() => {
    return localStorage.getItem("smkn14_login_role") || null;
  });
  const [inputTeacherName, setInputTeacherName] = useState("");
  const [isVerifiedChecked, setIsVerifiedChecked] = useState(false); // Ganti state verifikasi jadi checkbox
  // State untuk Struktur Organisasi (Data Lengkap, Tanpa Foto, Tanpa Edit/Hapus)
  const defaultOrgData: OrgMember[] = [
    // Pimpinan Sekolah
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

    // Program Keahlian
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

    // Kepala Bengkel / Ketua Kompetensi Keahlian
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

    // Kepala / Ketua Bidang / Unit
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
  const [orgData, setOrgData] = useState<OrgMember[]>(() => {
    const saved = localStorage.getItem("smkn14_org_data");
    return saved ? JSON.parse(saved) : defaultOrgData;
  });
  const [showOrgModal, setShowOrgModal] = useState<boolean>(false);
  const [editOrgId, setEditOrgId] = useState<number | null>(null);
  const [formNama, setFormNama] = useState<string>("");
  const [formJabatan, setFormJabatan] = useState<string>("");
  const [formKategori, setFormKategori] = useState<string>("Pimpinan");
  const [formFotoFile, setFormFotoFile] = useState<File | null>(null);

  const [selectedRoleOption, setSelectedRoleOption] = useState<string | null>(
    null,
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [studentName, setStudentName] = useState("");
  const [studentMajor, setStudentMajor] = useState("");
  const [studentClass, setStudentClass] = useState("");

  const [isMajorDropdownOpen, setIsMajorDropdownOpen] = useState(false);
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showHiddenTeacherModal, setShowHiddenTeacherModal] = useState(false);

  const [activeSection, setActiveSection] = useState<string>("hero-top");
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const navRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const majorDropdownRef = useRef<HTMLDivElement>(null);
  const classDropdownRef = useRef<HTMLDivElement>(null);

  const updateIndicator = useCallback((sectionId: string) => {
    const activeItem = navItemsRef.current[sectionId];
    if (activeItem && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();

      setIndicatorStyle({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
        opacity: 1,
      });
    }
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    setActiveSection(id);
    updateIndicator(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoleOption)
      return alert("Silakan pilih peran terlebih dahulu!");

    let roleName = "";
    let logDetail = "";

    if (selectedRoleOption === "siswa") {
      if (!studentName.trim())
        return alert("Mohon masukkan nama lengkap Anda!");
      if (!studentMajor) return alert("Mohon pilih jurusan Anda!");
      if (!studentClass) return alert("Mohon pilih tingkat kelas Anda!");

      roleName = "Siswa";
      logDetail = `Siswa (${studentName}) dari jurusan ${studentMajor} Kelas ${studentClass} telah log in.`;
    } else if (selectedRoleOption === "ortu") {
      roleName = "Orang Tua Siswa";
      logDetail = "Orang Tua Siswa telah log in memantau akademik.";
    } else if (selectedRoleOption === "tamu") {
      roleName = "Tamu / Visitor";
      logDetail = "Tamu / Visitor telah log in meninjau web sekolah.";
    }

    setIsLoggedIn(true);
    setLoginRole(roleName);
    localStorage.setItem("smkn14_is_logged_in", "true");
    localStorage.setItem("smkn14_login_role", roleName);
    recordLoginLog(roleName, logDetail);
  };

  const handleAdminLogin = (adminFullName: string) => {
    const roleName = `Administrator (${adminFullName})`;
    const logDetail = `Administrator Super User (${adminFullName}) telah masuk ke sistem via hidden trigger.`;

    setIsLoggedIn(true);
    setLoginRole(roleName);
    localStorage.setItem("smkn14_is_logged_in", "true");
    localStorage.setItem("smkn14_login_role", roleName);
    setShowAdminModal(false);
    recordLoginLog(roleName, logDetail);
  };

  const handleHiddenTeacherLogin = (teacherFullName: string) => {
    const roleName = `Guru (${teacherFullName})`;
    const logDetail = `Guru (${teacherFullName}) telah masuk melalui hidden shortcut sudut login.`;

    setIsLoggedIn(true);
    setLoginRole(roleName);
    localStorage.setItem("smkn14_is_logged_in", "true");
    localStorage.setItem("smkn14_login_role", roleName);
    setShowHiddenTeacherModal(false);
    recordLoginLog(roleName, logDetail);
  };

  const handleLogout = () => setShowLogoutModal(true);

  const confirmLogout = () => {
    localStorage.removeItem("smkn14_is_logged_in");
    localStorage.removeItem("smkn14_login_role");
    setIsLoggedIn(false);
    setLoginRole(null);
    setSelectedRoleOption(null);
    setStudentName("");
    setStudentMajor("");
    setStudentClass("");
    setShowLogoutModal(false);
  };

  // Fungsi CRUD Organisasi
  const handleSaveOrg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNama || !formJabatan)
      return alert("Nama dan Jabatan wajib diisi!");

    const saveDataWithImage = (imageUrl: string) => {
      if (editOrgId !== null) {
        const updated = orgData.map((item) => {
          if (item.id === editOrgId) {
            return {
              ...item,
              nama: formNama,
              jabatan: formJabatan,
              kategori: formKategori,
              foto: imageUrl || item.foto,
            };
          }
          return item;
        });
        setOrgData(updated);
        localStorage.setItem("smkn14_org_data", JSON.stringify(updated));
      } else {
        const newId =
          orgData.length > 0 ? Math.max(...orgData.map((d) => d.id)) + 1 : 1;
        const newItem: OrgMember = {
          id: newId,
          nama: formNama,
          jabatan: formJabatan,
          kategori: formKategori,
          foto:
            imageUrl ||
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400",
        };
        const updated = [...orgData, newItem];
        setOrgData(updated);
        localStorage.setItem("smkn14_org_data", JSON.stringify(updated));
      }
      closeOrgModal();
    };

    if (formFotoFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        saveDataWithImage(event.target?.result as string);
      };
      reader.readAsDataURL(formFotoFile);
    } else {
      saveDataWithImage("");
    }
  };

  const closeOrgModal = () => {
    setShowOrgModal(false);
    setEditOrgId(null);
  };

  // --- GANTI DENGAN INTERSECTION OBSERVER YANG JAUH LEBIH AKURAT ---
  useEffect(() => {
    const sections = [
      "hero-top",
      "latar-belakang",
      "sambutan",
      "organisasi",
      "lokasi",
      "kontak",
    ];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        // Jika section tersebut sedang berada di area pandang tengah layar
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveSection(id);
          updateIndicator(id);
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      // Membuat garis imajiner di tengah layar untuk memicu perubahan menu
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

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
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        majorDropdownRef.current &&
        !majorDropdownRef.current.contains(event.target as Node)
      ) {
        setIsMajorDropdownOpen(false);
      }
      if (
        classDropdownRef.current &&
        !classDropdownRef.current.contains(event.target as Node)
      ) {
        setIsClassDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const sections = [
      "hero-top",
      "latar-belakang",
      "sambutan",
      "organisasi",
      "lokasi",
      "kontak",
    ];
    sections.forEach((id) => {
      const el = document.getElementById(
        `nav-${id}`,
      ) as HTMLAnchorElement | null;
      if (el) navItemsRef.current[id] = el;
    });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      updateIndicator(activeSection);
      const handleResize = () => updateIndicator(activeSection);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [isLoggedIn, activeSection, updateIndicator]);

  const roleLabels: { [key: string]: string } = {
    siswa: "Siswa",
    ortu: "Orang Tua",
    tamu: "Tamu",
  };

  const smkn14Majors = [
    "TKJ (Teknik Komputer dan Jaringan)",
    "RPL (Rekayasa Perangkat Lunak)",
    "DPIB (Desain Pemodelan dan Informasi Bangunan)",
    "TKP (Teknik Konstruksi dan Perumahan)",
    "TP (Teknik Pemesinan)",
    "TKR (Teknik Kendaraan Ringan)",
    "TSM (Teknik Sepeda Motor)",
    "TBKR (Teknik Bodi Kendaraan Ringan)",
    "TEI (Teknik Elektronika Industri)",
    "TITL (Teknik Instalasi Tenaga Listrik)",
    "PH (Perhotelan)",
  ];

  const classOptions = ["X", "XI", "XII"];

  return (
    <main className="relative w-full bg-[#0a0a0a] text-white selection:bg-white selection:text-black scroll-smooth font-['Plus_Jakarta_Sans',sans-serif] overflow-x-hidden min-h-screen">
      {!isLoggedIn && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 md:p-6">
          <div className="relative w-full max-w-6xl bg-neutral-900/30 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.9)] overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[660px]">
            <button
              type="button"
              onClick={() => setShowHiddenTeacherModal(true)}
              className="absolute top-3 left-3 w-3 h-3 rounded-full bg-neutral-600 hover:bg-neutral-400 transition-colors z-30 focus:outline-none shadow-sm cursor-pointer"
              title="Shortcut Guru"
            />

            <div className="md:col-span-5 relative min-h-[300px] md:min-h-full overflow-hidden bg-black flex flex-col justify-between p-8 border-b md:border-b-0 md:border-r border-white/10">
              <div className="relative z-10 pt-4"></div>
              <div className="relative z-10 my-auto flex flex-col items-center justify-center py-2 px-2 w-full h-full">
                <div className="w-full h-full max-h-[420px] flex items-center justify-center">
                  <img
                    src="/logo.jpg"
                    alt="Logo SMK Negeri 14 Medan"
                    className="w-full h-full max-h-[400px] object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] scale-125"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
              </div>

              <div
                onClick={() => setShowAdminModal(true)}
                className="relative z-10 cursor-pointer group"
                title="Portal Resmi"
              >
                <span className="text-xs font-semibold tracking-wider text-neutral-400 block mb-2">
                  PORTAL RESMI
                </span>
                <h4 className="text-white text-2xl md:text-3xl font-extrabold tracking-tight group-hover:text-neutral-300 transition-colors">
                  SMK Negeri 14 Medan
                </h4>
              </div>
            </div>

            <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-between bg-neutral-950/30 backdrop-blur-xl">
              <div className="my-auto max-w-lg w-full mx-auto">
                <div className="mb-8 text-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                    Silahkan Log In
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-400 mt-2">
                    Pilih peran dan lengkapi data untuk masuk ke website resmi
                    SMK Negeri 14 Medan.
                  </p>
                </div>

                <div className="relative mb-6 text-left" ref={dropdownRef}>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Pilih Peran Pengguna
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white flex items-center justify-between hover:border-white/30 transition-all focus:outline-none shadow-sm backdrop-blur-md"
                  >
                    <span
                      className={`font-medium text-sm ${!selectedRoleOption ? "text-neutral-500 font-normal" : "text-white font-semibold"}`}
                    >
                      {selectedRoleOption
                        ? roleLabels[selectedRoleOption] || "Pilih Peran"
                        : "Pilih peran..."}
                    </span>
                    <svg
                      className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-900/90 backdrop-blur-2xl border border-white/15 rounded-xl shadow-2xl overflow-hidden z-40 divide-y divide-white/5">
                      {[
                        {
                          id: "siswa",
                          label: "Siswa",
                          desc: "Akses portal akademik & informasi sekolah",
                        },
                        {
                          id: "ortu",
                          label: "Orang Tua",
                          desc: "Pantau perkembangan akademik siswa",
                        },
                        {
                          id: "tamu",
                          label: "Tamu",
                          desc: "Akses peninjau luar sekolah",
                        },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setSelectedRoleOption(item.id);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-5 py-3.5 transition-colors flex flex-col ${selectedRoleOption === item.id ? "bg-white/15 text-white" : "hover:bg-white/5 text-neutral-300"}`}
                        >
                          <span className="text-sm font-bold">
                            {item.label}
                          </span>
                          <span className="text-xs text-neutral-400 font-normal mt-0.5">
                            {item.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <form
                  onSubmit={handleLoginSubmit}
                  className="space-y-5 text-left"
                >
                  {selectedRoleOption === "siswa" && (
                    <div className="space-y-4 p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                      <p className="text-xs font-semibold text-neutral-400 tracking-wider">
                        [ IDENTITAS SISWA ]
                      </p>
                      <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          placeholder="Masukkan Nama Lengkap"
                          required
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-white/40 placeholder:text-neutral-600 font-medium"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="relative" ref={majorDropdownRef}>
                          <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                            Jurusan
                          </label>
                          <button
                            type="button"
                            onClick={() =>
                              setIsMajorDropdownOpen(!isMajorDropdownOpen)
                            }
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-3.5 py-3 text-xs text-white flex items-center justify-between hover:border-white/30 transition-all focus:outline-none"
                          >
                            <span
                              className={`truncate font-medium ${!studentMajor ? "text-neutral-600" : "text-white"}`}
                            >
                              {studentMajor || "Pilih Jurusan"}
                            </span>
                            <svg
                              className="w-4 h-4 text-neutral-400 ml-2 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>

                          {isMajorDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-neutral-900/95 backdrop-blur-2xl border border-white/15 rounded-lg shadow-2xl overflow-y-auto max-h-48 z-50 divide-y divide-white/5">
                              {smkn14Majors.map((major, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => {
                                    setStudentMajor(major);
                                    setIsMajorDropdownOpen(false);
                                  }}
                                  className="w-full text-left px-3.5 py-2.5 text-xs text-neutral-300 hover:bg-white/10 hover:text-white transition-colors font-medium"
                                >
                                  {major}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="relative" ref={classDropdownRef}>
                          <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                            Kelas
                          </label>
                          <button
                            type="button"
                            onClick={() =>
                              setIsClassDropdownOpen(!isClassDropdownOpen)
                            }
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-3.5 py-3 text-xs text-white flex items-center justify-between hover:border-white/30 transition-all focus:outline-none"
                          >
                            <span
                              className={`truncate font-medium ${!studentClass ? "text-neutral-600" : "text-white"}`}
                            >
                              {studentClass
                                ? `Kelas ${studentClass}`
                                : "Pilih Kelas"}
                            </span>
                            <svg
                              className="w-4 h-4 text-neutral-400 ml-2 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>

                          {isClassDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-neutral-900/95 backdrop-blur-2xl border border-white/15 rounded-lg shadow-2xl overflow-y-auto max-h-48 z-50 divide-y divide-white/5">
                              {classOptions.map((cls, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => {
                                    setStudentClass(cls);
                                    setIsClassDropdownOpen(false);
                                  }}
                                  className="w-full text-left px-3.5 py-2.5 text-xs text-neutral-300 hover:bg-white/10 hover:text-white transition-colors font-medium"
                                >
                                  {cls}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedRoleOption === "ortu" && (
                    <p className="text-xs text-neutral-400 font-medium py-1">
                      * Orang tua akan masuk sebagai pemantau informasi akademik
                      sekolah.
                    </p>
                  )}

                  {selectedRoleOption === "tamu" && (
                    <p className="text-xs text-amber-400 font-medium py-1">
                      * Perhatian: Masuk sebagai tamu memiliki batasan akses
                      informasi publik sekolah.
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full mt-4 bg-white text-black py-4 rounded-xl font-bold text-xs md:text-sm uppercase tracking-wider hover:bg-neutral-200 transition-all shadow-md cursor-pointer"
                  >
                    Masuk ke Sistem Web →
                  </button>
                </form>
              </div>

              <div className="mt-10 pt-4 border-t border-white/10 text-[11px] text-neutral-500 font-semibold tracking-wider text-center">
                SECURE GATEWAY // SMK NEGERI 14 MEDAN
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Teacher Modal (Ukuran Lebih Besar & Lega) */}
      {showHiddenTeacherModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-neutral-900 border border-neutral-600/40 rounded-3xl p-10 max-w-lg w-full text-center shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-white">
            {/* Ikon */}
            <div className="w-14 h-14 rounded-full bg-neutral-800 border border-neutral-600/50 text-neutral-300 flex items-center justify-center mx-auto mb-4 text-2xl">
              🔐
            </div>

            <h3 className="text-2xl font-bold mb-2 tracking-tight">
              Verifikasi Akses Pengajar
            </h3>
            <p className="text-xs md:text-sm text-neutral-400 mb-6 leading-relaxed">
              Masukkan nama lengkap Anda dan centang kotak verifikasi di bawah
              untuk masuk.
            </p>

            {/* Form Input Nama & Checkbox */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!isVerifiedChecked) {
                  alert("Harap centang kotak verifikasi terlebih dahulu!");
                  return;
                }
                handleHiddenTeacherLogin(inputTeacherName);
              }}
              className="space-y-5 text-left"
            >
              {/* Input Nama Guru */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                  Nama Guru / Wali Kelas
                </label>
                <input
                  type="text"
                  value={inputTeacherName}
                  onChange={(e) => setInputTeacherName(e.target.value)}
                  placeholder="Contoh: Andriyanti Pasaribu, S.Pd"
                  required
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition"
                />
              </div>

              {/* Kotak Centang Verifikasi (Checkbox) */}
              <div className="flex items-center space-x-3 pt-1">
                <input
                  type="checkbox"
                  id="verifyCheckbox"
                  checked={isVerifiedChecked}
                  onChange={(e) => setIsVerifiedChecked(e.target.checked)}
                  className="w-4 h-4 accent-white bg-neutral-950 border-neutral-800 rounded cursor-pointer"
                />
                <label
                  htmlFor="verifyCheckbox"
                  className="text-xs md:text-sm text-neutral-300 cursor-pointer select-none"
                >
                  Saya menyatakan bahwa saya adalah pengajar yang sah.
                </label>
              </div>

              {/* Tombol Aksi */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowHiddenTeacherModal(false)}
                  className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium py-3.5 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-white hover:bg-neutral-200 text-black font-semibold py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-lg cursor-pointer"
                >
                  Verifikasi Masuk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-neutral-900 border border-emerald-500/30 rounded-3xl p-8 max-w-md w-full text-center shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              ⚡
            </div>
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
              Hidden Administrator Access
            </h3>
            <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
              Pilih identitas administrator utama untuk masuk dengan hak akses
              penuh:
            </p>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handleAdminLogin("Raziq Hanan Fadillah")}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 px-4 rounded-xl font-bold text-xs transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-between"
              >
                <span>Raziq Hanan Fadillah</span>
                <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded text-emerald-200">
                  Super Admin
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleAdminLogin("M. Angga")}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 px-4 rounded-xl font-bold text-xs transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-between"
              >
                <span>M. Angga</span>
                <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded text-emerald-200">
                  Super Admin
                </span>
              </button>
              <button
                type="button"
                onClick={() => setShowAdminModal(false)}
                className="w-full bg-white/10 hover:bg-white/15 text-neutral-300 py-3 rounded-xl font-semibold text-xs transition-all mt-2"
              >
                Batal / Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {loginRole?.includes("Tamu") && (
        <div className="w-full bg-amber-500/10 border-b border-amber-500/30 text-amber-300 px-6 py-2.5 text-center text-xs font-medium sticky top-0 z-[60] backdrop-blur-md">
          ⚠️ Anda Log In sebagai Tamu, aktivitas penelusuran dibatasi.
        </div>
      )}

      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-neutral-800/30 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-zinc-700/20 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div id="hero-top" className="absolute top-0 left-0 w-full h-1" />

      {/* HEADER UTAMA */}
      <header className="fixed top-0 left-0 w-full z-50 grid grid-cols-3 items-center px-6 md:px-12 py-6 pointer-events-none">
        <div className="pointer-events-auto justify-self-start flex items-center space-x-3 bg-neutral-900/90 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/10 shadow-2xl transition-all duration-300 hover:border-white/30 group">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-white uppercase">
            SMK NEGERI 14 MEDAN
          </span>
          {loginRole && (
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-neutral-300 font-medium">
              {loginRole}
            </span>
          )}
        </div>

        <nav
          ref={navRef}
          className="pointer-events-auto justify-self-center hidden md:flex items-center space-x-1.5 text-xs font-semibold text-neutral-300 bg-neutral-900/80 backdrop-blur-2xl p-2 rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative"
        >
          {/* Kotak Putih Animasi Geser */}
          <div
            className="absolute top-2 bottom-2 rounded-full bg-white shadow-lg transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
            }}
          />

          <a
            id="nav-hero-top"
            href="#hero-top"
            onClick={(e) => scrollToSection(e, "hero-top")}
            className={`relative z-10 px-5 py-2.5 rounded-full transition-colors duration-300 tracking-wider uppercase text-xs ${
              activeSection === "hero-top"
                ? "text-black font-bold"
                : "hover:text-white"
            }`}
          >
            Beranda
          </a>

          <a
            id="nav-latar-belakang"
            href="#latar-belakang"
            onClick={(e) => scrollToSection(e, "latar-belakang")}
            className={`relative z-10 px-5 py-2.5 rounded-full transition-colors duration-300 tracking-wider uppercase text-xs ${
              activeSection === "latar-belakang"
                ? "text-black font-bold"
                : "hover:text-white"
            }`}
          >
            Sejarah
          </a>

          <a
            id="nav-sambutan"
            href="#sambutan"
            onClick={(e) => scrollToSection(e, "sambutan")}
            className={`relative z-10 px-5 py-2.5 rounded-full transition-colors duration-300 tracking-wider uppercase text-xs ${
              activeSection === "sambutan"
                ? "text-black font-bold"
                : "hover:text-white"
            }`}
          >
            Sambutan
          </a>

          <a
            id="nav-organisasi"
            href="#organisasi"
            onClick={(e) => scrollToSection(e, "organisasi")}
            className={`relative z-10 px-5 py-2.5 rounded-full transition-colors duration-300 tracking-wider uppercase text-xs ${
              activeSection === "organisasi"
                ? "text-black font-bold"
                : "hover:text-white"
            }`}
          >
            Organisasi
          </a>

          {/* Visi & Misi dipisah menjadi elemen mandiri */}
          <a
            id="nav-visi-misi"
            href="#visi-misi"
            onClick={(e) => scrollToSection(e, "visi-misi")}
            className={`relative z-10 px-5 py-2.5 rounded-full transition-colors duration-300 tracking-wider uppercase text-xs ${
              activeSection === "visi-misi"
                ? "text-black font-bold"
                : "hover:text-white"
            }`}
          >
            Visi & Misi
          </a>

          <a
            id="nav-lokasi"
            href="#lokasi"
            onClick={(e) => scrollToSection(e, "lokasi")}
            className={`relative z-10 px-5 py-2.5 rounded-full transition-colors duration-300 tracking-wider uppercase text-xs ${
              activeSection === "lokasi"
                ? "text-black font-bold"
                : "hover:text-white"
            }`}
          >
            Peta
          </a>

          <a
            id="nav-kontak"
            href="#kontak"
            onClick={(e) => scrollToSection(e, "kontak")}
            className={`relative z-10 px-5 py-2.5 rounded-full transition-colors duration-300 tracking-wider uppercase text-xs ${
              activeSection === "kontak"
                ? "text-black font-bold"
                : "hover:text-white"
            }`}
          >
            Hubungi
          </a>
        </nav>

        <div className="pointer-events-auto justify-self-end flex items-center space-x-2">
          <button
            type="button"
            onClick={handleLogout}
            className="bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/40 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg flex items-center space-x-2 cursor-pointer"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </header>

      {/* KONTEN UTAMA HALAMAN */}
      <InteractiveHero />

      {/* SECTION 01: SEJARAH (DISESUAIKAN DENGAN FOTO & BEBAS DARI CITE) */}
      <section
        id="latar-belakang"
        className="w-full min-h-screen bg-[#0a0a0a] text-white px-6 md:px-20 py-32 flex flex-col justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="mb-12">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-white/10 mb-6 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
                SEJARAH SEKOLAH // SECTION 01
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
                Dirintis sebagai institusi kejuruan berorientasi masa depan, SMK
                Negeri 14 Medan terus merajut standar baru dalam penguasaan
                teknologi modern dan kedisiplinan industri.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Kotak Utama Kiri */}
            <div className="lg:col-span-7 bg-[#111111] rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-neutral-400">
                    [ 01 — INFRASTRUKTUR UTAMA ]
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-neutral-300">
                    Kawasan Kampus
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white leading-snug mb-6">
                  Berdiri di atas kawasan seluas{" "}
                  <span className="underline decoration-white/30 underline-offset-8">
                    100.000 M²
                  </span>{" "}
                  yang dirancang khusus.
                </h3>

                <div className="space-y-4 text-xs md:text-sm text-neutral-400 font-normal leading-relaxed">
                  <p>
                    SMK Negeri 14 Medan berdiri diatas lahan seluas 100.000 M2
                    dan didirikan pada tahun 2011. Diawal pendiriannya SMK N 14
                    Medan bernama SMK Binaan Provinsi dan di tahun 2017 berubah
                    nama menjadi SMK Negeri 14 Medan.
                  </p>
                  <p>
                    SMK Negeri 14 Medan berlokasi di Jl. Karya Dalam No.26,
                    Karang Berombak, Kec. Medan Barat, Kota Medan, Provinsi
                    Sumatera Utara. Lokasi yang strategis membuat SMK Negeri 14
                    Medan mudah untuk diakses oleh seluruh siswa yang bertempat
                    tinggal disekitaran kota Medan.
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-widest text-neutral-500 uppercase">
                  TOTAL AREA SPASIAL
                </span>
                <span className="text-2xl md:text-3xl font-bold text-white">
                  100.000 M²
                </span>
              </div>
            </div>

            {/* Kotak Kanan (2 Card) */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-6">
              {/* Card 02: 2011 */}
              <div className="bg-[#111111] rounded-3xl p-6 md:p-8 border border-white/10 flex items-center justify-between transition-all hover:border-white/20">
                <div>
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-neutral-400 block mb-1">
                    [ 02 — TAHAP PERINTISAN ]
                  </span>
                  <h4 className="text-3xl md:text-4xl font-bold text-white mb-1">
                    2011
                  </h4>
                  <p className="text-xs text-neutral-400">
                    SMK Binaan Provinsi Sumatera Utara
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-neutral-300">
                  EST.
                </div>
              </div>

              {/* Card 03: 2017 */}
              <div className="bg-[#111111] rounded-3xl p-6 md:p-8 border border-white/10 flex items-center justify-between transition-all hover:border-white/20">
                <div>
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-neutral-400 block mb-1">
                    [ 03 — TRANSFORMASI RESMI ]
                  </span>
                  <h4 className="text-3xl md:text-4xl font-bold text-white mb-1">
                    2017
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Pengukuhan Menjadi SMK Negeri 14
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center text-xs font-bold shadow-lg">
                  NEW
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: SAMBUTAN KEPALA SEKOLAH */}
      <section
        id="sambutan"
        className="w-full min-h-screen bg-[#070707] text-white px-6 md:px-20 py-40 flex flex-col justify-center border-t border-white/5 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
            <div>
              <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-neutral-900 border border-white/10 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
                  PROFIL KEPEMIMPINAN // SECTION 02
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                Sambutan Kepala <br />
                <span className="font-normal text-neutral-400">Sekolah</span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-neutral-400 max-w-md font-normal leading-relaxed">
              Pesan dan arahan langsung dari pimpinan institusi dalam mewujudkan
              ekosistem pendidikan vokasi yang unggul dan berkarakter.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-4 bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col group hover:border-white/30 transition-all duration-500">
              <div className="relative w-full h-[420px] bg-black overflow-hidden">
                <img
                  src="/KEPSEK.jpg"
                  alt="Kepala SMK Negeri 14 Medan"
                  className="w-full h-full object-cover object-top filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
              <div className="p-8 flex flex-col justify-between flex-1 bg-neutral-950">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-500 block mb-1">
                    [ PIMPINAN SEKOLAH ]
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Kepala SMK Negeri 14 Medan
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Penggerak Vokasi Unggul & Berkarakter
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-3xl p-8 md:p-12 border border-white/15 shadow-2xl flex flex-col justify-between">
              <div>
                <p className="text-lg font-semibold text-white mb-6">
                  Assalamu'alaikum wr.wb.
                </p>
                <div className="space-y-4 text-sm md:text-base text-neutral-300 font-normal leading-relaxed text-justify">
                  <p>
                    Puji syukur kepada Allah SWT, Tuhan Yang Maha Esa yang telah
                    memberikan rahmat dan anugerah-Nya sehingga website SMK
                    Negeri 14 Medan ini dapat terbit untuk menjawab kebutuhan
                    informasi berbasis teknologi.
                  </p>
                  <p>
                    Besar harapan kami sarana ini dapat memberi manfaat bagi
                    semua pihak yang ada dilingkup pendidikan dan pemerhati
                    pendidikan secara khusus bagi SMK Negeri 14 Medan.
                  </p>
                </div>
              </div>
              <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-sm font-semibold text-white italic">
                  Wassalamu'alaikum wr.wb.
                </span>
                <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-neutral-300">
                  Resmi Terverifikasi
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: STRUKTUR ORGANISASI (OLD MONEY & ELEGANT TIERED DESIGN) */}
      <section
        id="organisasi"
        className="w-full min-h-screen bg-black text-white px-6 md:px-20 py-40 transition-all border-t border-white/10 relative"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Header Judul */}
          <div className="mb-16 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
              PROFIL SEKOLAH // STRUKTUR ORGANISASI
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              Struktur Organisasi & Pimpinan
            </h2>
            <div className="w-24 h-1 bg-neutral-700 mx-auto mt-4 rounded-full"></div>
            <p className="text-sm text-neutral-400 mt-3">
              Oleh : Admin | Tanggal : 03-03-2022
            </p>
          </div>

          {/* KONTEN UTAMA: DIBAGI BERDASARKAN HIERARKI KELAS */}
          <div className="space-y-20">
            {/* TIER 1: PIMPINAN SEKOLAH (Spotlight Utama / Kartu Lebih Besar) */}
            <div>
              <div className="flex items-center space-x-4 mb-8">
                <span className="text-xs font-semibold uppercase tracking-widest text-white bg-neutral-900 border border-neutral-800 px-4 py-1.5 rounded-full">
                  Pimpinan Sekolah
                </span>
                <div className="flex-1 h-px bg-neutral-900"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orgData
                  .filter((item) => item.kategori === "Pimpinan")
                  .map((org, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-b from-neutral-900/90 to-neutral-950 rounded-2xl p-8 border border-neutral-800 hover:border-neutral-600 transition-all duration-300 shadow-2xl relative group overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-white opacity-80"></div>
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-neutral-400 bg-neutral-950 px-3 py-1 rounded-md border border-neutral-800/80">
                        {org.kategori}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-white mt-4 mb-2 group-hover:text-neutral-200 transition">
                        {org.nama}
                      </h3>
                      <p className="text-xs text-neutral-400 font-medium leading-relaxed">
                        {org.jabatan}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* TIER 2: KEPALA PROGRAM & BENGKEL */}
            <div>
              <div className="flex items-center space-x-4 mb-8">
                <span className="text-xs font-semibold uppercase tracking-widest text-neutral-300 bg-neutral-900 border border-neutral-800 px-4 py-1.5 rounded-full">
                  Program Keahlian & Kepala Bengkel
                </span>
                <div className="flex-1 h-px bg-neutral-900"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orgData
                  .filter(
                    (item) =>
                      item.kategori === "Program Keahlian" ||
                      item.kategori === "Kepala Bengkel",
                  )
                  .map((org, index) => (
                    <div
                      key={index}
                      className="bg-neutral-900/60 rounded-xl p-6 border border-neutral-800/80 hover:border-neutral-700 transition-all duration-300 shadow-lg"
                    >
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-neutral-400">
                        {org.kategori}
                      </span>
                      <h4 className="text-base font-serif font-semibold text-white mt-2 mb-1">
                        {org.nama}
                      </h4>
                      <p className="text-xs text-neutral-400">{org.jabatan}</p>
                    </div>
                  ))}
              </div>
            </div>

            {/* TIER 3: UNIT / BIDANG LAINNYA */}
            <div>
              <div className="flex items-center space-x-4 mb-8">
                <span className="text-xs font-semibold uppercase tracking-widest text-neutral-300 bg-neutral-900 border border-neutral-800 px-4 py-1.5 rounded-full">
                  Unit / Bidang Penunjang
                </span>
                <div className="flex-1 h-px bg-neutral-900"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orgData
                  .filter((item) => item.kategori === "Unit")
                  .map((org, index) => (
                    <div
                      key={index}
                      className="bg-neutral-900/40 rounded-xl p-6 border border-neutral-800/60 hover:border-neutral-700 transition-all duration-300 shadow-lg"
                    >
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-neutral-500">
                        {org.kategori}
                      </span>
                      <h4 className="text-base font-serif font-semibold text-white mt-2 mb-1">
                        {org.nama}
                      </h4>
                      <p className="text-xs text-neutral-400">{org.jabatan}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: VISI DAN MISI (DARK THEME & MODERN) */}
      <section
        id="visi-misi"
        className="w-full min-h-screen bg-black text-white px-6 md:px-20 py-40 transition-all border-t border-white/10 relative"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Header Judul */}
          <div className="mb-16 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
              PROFIL SEKOLAH // VISI & MISI
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              Visi & Misi SMK Negeri 14 Medan
            </h2>
            <div className="w-24 h-1 bg-neutral-600 mx-auto mt-4 rounded-full"></div>
            <p className="text-sm text-neutral-400 mt-3">
              Oleh : Admin | Tanggal : 17-11-2022
            </p>
          </div>

          {/* Konten Utama (Grid Visi & Misi) */}
          <div className="space-y-12">
            {/* Kotak Visi */}
            <div className="bg-neutral-900/90 rounded-2xl p-8 md:p-10 border border-neutral-800 shadow-xl relative overflow-hidden group hover:border-neutral-700 transition duration-300">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-white"></div>
              <span className="inline-block px-3 py-1 text-[10px] font-semibold uppercase tracking-widest bg-white text-black rounded-full mb-4">
                A. Visi Sekolah
              </span>
              <h3 className="text-xl md:text-2xl font-serif font-medium text-neutral-100 leading-relaxed italic">
                &ldquo;Terwujudnya Lembaga Pendidikan Kejuruan yang menghasilkan
                peserta didik yang berkarakter nasional, berkemampuan global dan
                menjadi sekolah rujukan.&rdquo;
              </h3>
            </div>

            {/* Kotak Misi */}
            <div className="bg-neutral-900/90 rounded-2xl p-8 md:p-10 border border-neutral-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-neutral-500"></div>
              <span className="inline-block px-3 py-1 text-[10px] font-semibold uppercase tracking-widest bg-neutral-800 text-neutral-300 rounded-full mb-6">
                B. Misi Sekolah
              </span>
              <p className="text-xs md:text-sm text-neutral-400 mb-6">
                Untuk mencapai VISI tersebut, SMK Negeri 14 Medan mengembangkan
                misi sebagai berikut:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Melakukan Pembelajaran dengan memegang teguh nilai-nilai bangsa Indonesia berbasis teknologi, komunikasi dan informasi.",
                  "Menyiapkan peserta didik yang memiliki kecakapan hidup untuk mampu mengatasi masalahnya.",
                  "Menyiapkan peserta didik yang memiliki jiwa wirausaha untuk mampu menciptakan lapangan kerja.",
                  "Memperkuat standart kurikulum dan penilaian hasil belajar peserta didik.",
                  "Meningkatkan pengelolaan sekolah dan jaminan kualitas yang berbasis pada standart mutu.",
                  "Menjadikan lembaga pendidikan sebagai patok duga bagi pengembangan sekolah.",
                  "Mengembangkan lembaga dengan menjalin kemitraan baik dengan institusi nasional maupun internasional.",
                  "Mengembangkan proses pembelajaran dengan bahasa komunikasi global.",
                ].map((misiText, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80 hover:border-neutral-700 transition"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-neutral-800 text-neutral-300 font-bold text-xs flex items-center justify-center border border-neutral-700">
                      0{index + 1}
                    </span>
                    <p className="text-xs md:text-sm text-neutral-300 leading-relaxed pt-1">
                      {misiText}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04: PETA LOKASI */}
      <section
        id="lokasi"
        className="w-full min-h-screen bg-[#050505] text-white px-6 md:px-20 py-40 flex flex-col justify-center relative overflow-hidden border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
            <div>
              <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-neutral-900 border border-white/10 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
                  GEOLOCATION // SECTION 04
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                Koordinat Peta & <br />
                <span className="font-normal text-neutral-400">
                  Wilayah Kampus
                </span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-neutral-400 max-w-md font-normal leading-relaxed">
              Berada di jantung Kota Medan, lokasi strategis yang mudah diakses
              dari berbagai titik pusat aktivitas regional.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
                    [ PUSAT ADMINISTRASI ]
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-[11px] font-semibold border border-emerald-800/50">
                    Terverifikasi GPS
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 leading-snug">
                  Jl. Karya Dalam No.26, Karang Berombak, Kec. Medan Barat,{" "}
                  <br />
                  <span className="text-neutral-400 font-normal text-base">
                    Kota Medan, Sumatera Utara 20117
                  </span>
                </h3>
              </div>
              <div className="pt-10 border-t border-white/10">
                <a
                  href="https://maps.google.com/?q=SMK+Negeri+14+Medan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-3 bg-white text-black px-6 py-4 rounded-2xl text-xs uppercase tracking-wider font-bold hover:bg-neutral-200 transition-all duration-300 shadow-xl"
                >
                  <span>Buka Navigasi Google Maps</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 bg-neutral-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative min-h-[450px]">
              <iframe
                title="Peta Lokasi SMK Negeri 14 Medan"
                src="https://maps.google.com/maps?q=SMK+Negeri+14+Medan,+Jl.+Karya+Dalam+No.26,+Medan&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "460px" }}
                allowFullScreen={true}
                loading="lazy"
                className="w-full h-full filter contrast-125 invert-[0.9] hue-rotate-180 opacity-85"
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
              <div className="space-y-2 text-xs text-neutral-300 font-medium">
                <p>
                  <strong className="text-white font-semibold">
                    Email Resmi:
                  </strong>{" "}
                  smkn14mdn.sumut@gmail.com
                </p>
                <p>
                  <strong className="text-white font-semibold">
                    Jam Operasional:
                  </strong>{" "}
                  Senin — Jumat, 07:30 - 16:00 WIB
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col lg:items-end justify-between">
              <div className="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                <a
                  href="#hero-top"
                  onClick={(e) => scrollToSection(e, "hero-top")}
                  className="hover:text-white transition-colors"
                >
                  Beranda
                </a>
                <a
                  href="#latar-belakang"
                  onClick={(e) => scrollToSection(e, "latar-belakang")}
                  className="hover:text-white transition-colors"
                >
                  Sejarah
                </a>
                <a
                  href="#sambutan"
                  onClick={(e) => scrollToSection(e, "sambutan")}
                  className="hover:text-white transition-colors"
                >
                  Sambutan
                </a>
                <a
                  href="#organisasi"
                  onClick={(e) => scrollToSection(e, "organisasi")}
                  className="hover:text-white transition-colors"
                >
                  Organisasi
                </a>
                <a
                  href="#lokasi"
                  onClick={(e) => scrollToSection(e, "lokasi")}
                  className="hover:text-white transition-colors"
                >
                  <a
                    href="#visi-misi"
                    onClick={(e) => scrollToSection(e, "visi-misi")}
                    className="hover:text-white transition-colors"
                  >
                    Visi & Misi
                  </a>
                  Peta
                </a>
              </div>
              <p className="text-xs text-neutral-600 font-semibold tracking-wider mt-8 lg:mt-0">
                WORLD-CLASS VOCATIONAL INSTITUTION PORTAL — BUILD 2026.
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-normal">
            <p>© 2026 SMK Negeri 14 Medan. All Rights Reserved.</p>
            <p className="font-semibold text-[10px] tracking-widest text-neutral-600">
              DESIGNED FOR EXCELLENCE
            </p>
          </div>
        </div>
      </footer>

      {/* Modal CRUD Tambah/Edit Pejabat Organisasi */}
      {showOrgModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-[#fdfbf7] text-[#332218] border border-[#f4ebd0] rounded-3xl p-8 max-w-md w-full shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
            <div className="flex justify-between items-center mb-6 border-b border-[#f4ebd0] pb-4">
              <h3 className="text-xl font-bold font-serif tracking-tight">
                {editOrgId !== null
                  ? "Edit Data Pejabat"
                  : "Tambah Data Pejabat"}
              </h3>
              <button
                onClick={closeOrgModal}
                className="text-neutral-500 hover:text-black text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSaveOrg} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5c4033] mb-1">
                  Nama Lengkap & Gelar
                </label>
                <input
                  type="text"
                  value={formNama}
                  onChange={(e) => setFormNama(e.target.value)}
                  placeholder="Contoh: Andriyanti Pasaribu, S.Pd"
                  required
                  className="w-full bg-white border border-[#f4ebd0] rounded-xl px-4 py-3 text-sm text-[#332218] focus:outline-none focus:border-[#8c6d46]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5c4033] mb-1">
                  Jabatan / Posisi
                </label>
                <input
                  type="text"
                  value={formJabatan}
                  onChange={(e) => setFormJabatan(e.target.value)}
                  placeholder="Contoh: Kepala Sekolah / Wakasek Kurikulum"
                  required
                  className="w-full bg-white border border-[#f4ebd0] rounded-xl px-4 py-3 text-sm text-[#332218] focus:outline-none focus:border-[#8c6d46]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5c4033] mb-1">
                  Kategori Bagian
                </label>
                <select
                  value={formKategori}
                  onChange={(e) => setFormKategori(e.target.value)}
                  className="w-full bg-white border border-[#f4ebd0] rounded-xl px-4 py-3 text-sm text-[#332218] focus:outline-none focus:border-[#8c6d46]"
                >
                  <option value="Pimpinan">Pimpinan Sekolah</option>
                  <option value="Program Keahlian">Program Keahlian</option>
                  <option value="Kepala Bengkel">Kepala Bengkel</option>
                  <option value="Unit/Bidang">Unit / Bidang</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5c4033] mb-1">
                  Upload Foto Profil (File Lokal)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormFotoFile(e.target.files?.[0] || null)}
                  className="w-full text-xs text-neutral-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#f4ebd0] file:text-[#332218] hover:file:bg-[#8c6d46] hover:file:text-white transition cursor-pointer"
                />
                <p className="text-[10px] text-neutral-500 mt-1">
                  Biarkan kosong jika tidak ingin mengubah foto saat edit.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#f4ebd0]">
                <button
                  type="button"
                  onClick={closeOrgModal}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold text-xs transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-full bg-[#332218] hover:bg-[#4a3525] text-white py-3 rounded-xl font-bold text-xs transition-all shadow-lg cursor-pointer"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Log Out */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-neutral-900 border border-white/15 rounded-3xl p-8 max-w-sm w-full text-center shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto mb-4 text-xl">
              ⚠️
            </div>
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
              Mau Log Out?...
            </h3>
            <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
              Sesi perangkat ini akan diakhiri dan Anda harus memilih peran
              kembali.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="w-full bg-white/10 hover:bg-white/15 text-white py-3 rounded-xl font-semibold text-xs transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold text-xs transition-all shadow-lg shadow-red-500/20 cursor-pointer"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
