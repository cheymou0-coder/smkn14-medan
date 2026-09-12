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

  // State untuk CRUD Struktur Organisasi
  const defaultOrgData: OrgMember[] = [
    {
      id: 1,
      nama: "Andriyanti Pasaribu, S.Pd",
      jabatan: "Kepala Sekolah",
      kategori: "Pimpinan",
      foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 2,
      nama: "Darmansyah Pohan, S.Pd., M.Pd",
      jabatan: "Wakil Kepala Sekolah Bid. Kurikulum",
      kategori: "Pimpinan",
      foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 3,
      nama: "Lendrizon, S.Pd.",
      jabatan: "Wakil Kepala Sekolah Bid. Kesiswaan",
      kategori: "Pimpinan",
      foto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 4,
      nama: "Drs. Antoni Siregar",
      jabatan: "Wakil Kepala Sekolah Bid. Sarana Prasarana",
      kategori: "Pimpinan",
      foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 5,
      nama: "Eka Dharmayanti Manurung, S.Pd.",
      jabatan: "Teknik Komputer dan Informatika",
      kategori: "Program Keahlian",
      foto: "https://images.unsplash.com/photo-1580894732475-84992925a07c?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 6,
      nama: "Syukri Abdullah Manik, S.Pd.",
      jabatan: "Teknik Konstruksi dan Properti",
      kategori: "Program Keahlian",
      foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 7,
      nama: "Reni Famalia Sitorus, S.Pd",
      jabatan: "Teknik Komputer dan Jaringan",
      kategori: "Kepala Bengkel",
      foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 8,
      nama: "Mukhlis Idrus, S.Kom",
      jabatan: "Rekayasa Perangkat Lunak",
      kategori: "Kepala Bengkel",
      foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 9,
      nama: "Nurul Rafiqah, M.Si.",
      jabatan: "Kepala Perpustakaan",
      kategori: "Unit/Bidang",
      foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
    },
  ];

  const [orgData, setOrgData] = useState<OrgMember[]>(() => {
    const saved = localStorage.getItem("smkn14_org_data");
    return saved ? JSON.parse(saved) : defaultOrgData;
  });
  const [orgFilter, setOrgFilter] = useState<string>("all");
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

  const openAddOrgModal = () => {
    setEditOrgId(null);
    setFormNama("");
    setFormJabatan("");
    setFormKategori("Pimpinan");
    setFormFotoFile(null);
    setShowOrgModal(true);
  };

  const openEditOrgModal = (item: OrgMember) => {
    setEditOrgId(item.id);
    setFormNama(item.nama);
    setFormJabatan(item.jabatan);
    setFormKategori(item.kategori);
    setFormFotoFile(null);
    setShowOrgModal(true);
  };

  const closeOrgModal = () => {
    setShowOrgModal(false);
    setEditOrgId(null);
  };

  const handleDeleteOrg = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus data pejabat ini?")) {
      const updated = orgData.filter((item) => item.id !== id);
      setOrgData(updated);
      localStorage.setItem("smkn14_org_data", JSON.stringify(updated));
    }
  };

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

      {/* Hidden Teacher Modal */}
      {showHiddenTeacherModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-neutral-900 border border-neutral-600/40 rounded-3xl p-8 max-w-md w-full text-center shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
            <div className="w-12 h-12 rounded-full bg-neutral-800 border border-neutral-600/50 text-neutral-300 flex items-center justify-center mx-auto mb-4 text-xl">
              👨‍🏫
            </div>
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
              Hidden Teacher Quick Login
            </h3>
            <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
              Pilih akses cepat profil guru / wali kelas untuk masuk langsung:
            </p>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handleHiddenTeacherLogin("Wali Kelas X TKJ 1")}
                className="w-full bg-neutral-800 hover:bg-neutral-700 text-white py-3.5 px-4 rounded-xl font-bold text-xs transition-all shadow-lg flex items-center justify-between border border-white/10"
              >
                <span>Wali Kelas X TKJ 1</span>
                <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded text-neutral-300">
                  Guru / Wali Kelas
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleHiddenTeacherLogin("Dewan Guru Produktif")}
                className="w-full bg-neutral-800 hover:bg-neutral-700 text-white py-3.5 px-4 rounded-xl font-bold text-xs transition-all shadow-lg flex items-center justify-between border border-white/10"
              >
                <span>Dewan Guru Produktif</span>
                <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded text-neutral-300">
                  Staf Pengajar
                </span>
              </button>
              <button
                type="button"
                onClick={() => setShowHiddenTeacherModal(false)}
                className="w-full bg-white/10 hover:bg-white/15 text-neutral-300 py-3 rounded-xl font-semibold text-xs transition-all mt-2"
              >
                Batal / Tutup
              </button>
            </div>
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
          className="pointer-events-auto justify-self-center hidden md:flex items-center space-x-1 text-xs font-semibold text-neutral-300 bg-neutral-900/80 backdrop-blur-2xl p-1.5 rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative"
        >
          <div
            className="absolute top-1.5 bottom-1.5 rounded-full bg-white shadow-lg transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none"
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
            className={`relative z-10 px-4 py-2 rounded-full transition-colors duration-300 tracking-wider uppercase text-[11px] ${
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
            className={`relative z-10 px-4 py-2 rounded-full transition-colors duration-300 tracking-wider uppercase text-[11px] ${
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
            className={`relative z-10 px-4 py-2 rounded-full transition-colors duration-300 tracking-wider uppercase text-[11px] ${
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
            className={`relative z-10 px-4 py-2 rounded-full transition-colors duration-300 tracking-wider uppercase text-[11px] ${
              activeSection === "organisasi"
                ? "text-black font-bold"
                : "hover:text-white"
            }`}
          >
            Organisasi
          </a>
          <a
            id="nav-lokasi"
            href="#lokasi"
            onClick={(e) => scrollToSection(e, "lokasi")}
            className={`relative z-10 px-4 py-2 rounded-full transition-colors duration-300 tracking-wider uppercase text-[11px] ${
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
            className={`relative z-10 px-4 py-2 rounded-full transition-colors duration-300 tracking-wider uppercase text-[11px] ${
              activeSection === "kontak"
                ? "text-black font-bold"
                : "hover:text-white"
            }`}
          >
            Hubungi
          </a>
        </nav>

        <div className="pointer-events-auto justify-self-end flex items-center space-x-2">
          {activeSection === "organisasi" && (
            <button
              type="button"
              onClick={openAddOrgModal}
              className="bg-white hover:bg-neutral-200 text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg flex items-center space-x-1.5 cursor-pointer"
            >
              <span>+ Tambah Pejabat</span>
            </button>
          )}
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

      {/* SECTION 03: STRUKTUR ORGANISASI (TEMA OLD MONEY / MODERN ELEGANT) */}
      <section
        id="organisasi"
        className="w-full min-h-screen bg-[#fdfbf7] text-[#332218] px-6 md:px-20 py-40 transition-all border-t border-white/10 relative"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8c6d46] mb-2">
              PROFIL SEKOLAH // SECTION 03
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#332218] tracking-tight">
              Struktur Organisasi
            </h2>
            <div className="w-24 h-1 bg-[#8c6d46] mx-auto mt-4 rounded-full"></div>
            <p className="text-sm text-[#4a3525]/70 mt-3">
              Bagan kepemimpinan, manajemen program keahlian, serta unit satuan
              kerja sekolah.
            </p>
          </div>

          {/* Filter Kategori */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              { id: "all", label: "Semua" },
              { id: "Pimpinan", label: "Pimpinan Sekolah" },
              { id: "Program Keahlian", label: "Kepala Program" },
              { id: "Kepala Bengkel", label: "Kepala Bengkel" },
              { id: "Unit/Bidang", label: "Kepala Unit" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setOrgFilter(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition cursor-pointer border ${
                  orgFilter === cat.id
                    ? "bg-[#332218] text-[#fdfbf7] border-[#332218] shadow-md"
                    : "bg-[#f4ebd0]/40 text-[#4a3525] hover:bg-[#8c6d46] hover:text-white border-[#8c6d46]/30"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid Kartu Organisasi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(orgFilter === "all"
              ? orgData
              : orgData.filter((item) => item.kategori === orgFilter)
            ).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm border border-[#f4ebd0] overflow-hidden flex flex-col justify-between hover:shadow-md transition duration-300 group"
              >
                <div className="p-6 flex items-center space-x-4">
                  <img
                    src={item.foto}
                    alt={item.nama}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#8c6d46]/40 shadow-sm flex-shrink-0"
                  />
                  <div className="overflow-hidden">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-[#f4ebd0] text-[#4a3525] rounded mb-1">
                      {item.kategori}
                    </span>
                    <h4
                      className="font-serif font-bold text-base text-[#332218] truncate"
                      title={item.nama}
                    >
                      {item.nama}
                    </h4>
                    <p className="text-xs text-[#5c4033] font-medium mt-0.5 line-clamp-2">
                      {item.jabatan}
                    </p>
                  </div>
                </div>
                <div className="bg-[#fdfbf7] px-6 py-3 border-t border-[#f4ebd0] flex justify-end space-x-2">
                  <button
                    onClick={() => openEditOrgModal(item)}
                    className="text-xs bg-[#f4ebd0] hover:bg-[#8c6d46] hover:text-white text-[#332218] px-3 py-1.5 rounded transition font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteOrg(item.id)}
                    className="text-xs bg-red-50 hover:bg-red-600 hover:text-white text-red-700 px-3 py-1.5 rounded transition font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            ))}
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
