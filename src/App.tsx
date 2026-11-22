import React, { useState, useEffect, useRef, useCallback } from "react";
import { TeacherMarquee } from "./components/TeacherMarquee";
import { JurusanSection } from "./components/JurusanSection";

interface OrgMember {
  id: number;
  nama: string;
  jabatan: string;
  kategori: string;
  foto: string;
}

interface EkskulItem {
  code: string;
  nama: string;
  bidang: string;
  deskripsi: string;
}

interface RouteOrigin {
  id: string;
  label: string;
  originQuery: string;
  corridor: string;
  tag: string;
}

interface MissionItem {
  code: string;
  pillar: "karakter-teknologi" | "kompetensi-wirausaha" | "mutu-global";
  title: string;
  desc: string;
}

const navMenus = [
  { id: "hero-top", label: "Beranda" },
  { id: "latar-belakang", label: "Sejarah" },
  { id: "sambutan", label: "Sambutan" },
  { id: "organisasi", label: "Organisasi" },
  { id: "jurusan", label: "Jurusan" },
  { id: "visi-misi", label: "Visi & Misi" },
  { id: "peta", label: "Peta" },
  { id: "kontak", label: "Hubungi" },
];

const ekskulData: EkskulItem[] = [
  {
    code: "01",
    nama: "OSIS SMKN 14 Medan",
    bidang: "Organisasi Siswa",
    deskripsi:
      "Koordinasi kegiatan kesiswaan, kepemimpinan, dan program kerja sekolah.",
  },
  {
    code: "02",
    nama: "Pramuka",
    bidang: "Kepramukaan",
    deskripsi:
      "Pembinaan kemandirian, kedisiplinan, kepemimpinan, dan kegiatan lapangan.",
  },
  {
    code: "03",
    nama: "Paskibra",
    bidang: "Baris-Berbaris & Upacara",
    deskripsi:
      "Latihan ketertiban, ketahanan fisik, dan petugas upacara sekolah.",
  },
  {
    code: "04",
    nama: "Futsal & Basket",
    bidang: "Olahraga",
    deskripsi:
      "Pembinaan fisik, latihan teknik tim, dan partisipasi ajang olahraga pelajar.",
  },
  {
    code: "05",
    nama: "Seni & Kreativitas",
    bidang: "Seni Budaya",
    deskripsi:
      "Pengembangan bakat seni pertunjukan, musik, dan ekspresi kreatif siswa.",
  },
  {
    code: "06",
    nama: "Rohis & Kegiatan Sosial",
    bidang: "Kerohanian & Sosial",
    deskripsi:
      "Pembinaan akhlak, kegiatan keagamaan, dan aksi sosial di lingkungan sekolah.",
  },
];

const schoolStats = [
  {
    code: "01 // SPASIAL",
    value: "100.000 M²",
    label: "Luas Lahan Kampus",
    sublabel: "Kawasan pendidikan terpadu",
    targetId: "latar-belakang",
  },
  {
    code: "02 // VOKASI",
    value: "11",
    label: "Konsentrasi Keahlian",
    sublabel: "Program & bengkel praktik",
    targetId: "jurusan",
  },
  {
    code: "03 // MUTU",
    value: "Akreditasi A",
    label: "Standar Mutu Nasional",
    sublabel: "Kualitas layanan pendidikan",
    targetId: "visi-misi",
  },
  {
    code: "04 // SEJARAH",
    value: "2011",
    label: "Tahun Berdiri",
    sublabel: "Perintisan SMK Binaan Provinsi",
    targetId: "latar-belakang",
  },
];

const routeOrigins: RouteOrigin[] = [
  {
    id: "lapangan-merdeka",
    label: "Lapangan Merdeka",
    originQuery: "Lapangan Merdeka Medan",
    corridor: "Jl. Putri Hijau → Jl. KL. Yos Sudarso → Jl. Karya Dalam",
    tag: "3.8 km • 11 Min",
  },
  {
    id: "stasiun-medan",
    label: "Stasiun Medan",
    originQuery: "Stasiun Besar Kereta Api Medan",
    corridor: "Jl. Stasiun → Jl. Putri Hijau → Jl. KL. Yos Sudarso",
    tag: "Via Yos Sudarso",
  },
  {
    id: "medan-helvetia",
    label: "Medan Helvetia",
    originQuery: "Medan Helvetia, Kota Medan",
    corridor: "Jl. Kapten Sumarsono → Jl. Karya → Jl. Karya Dalam",
    tag: "Via Jl. Karya",
  },
  {
    id: "terminal-amplas",
    label: "Terminal Amplas",
    originQuery: "Terminal Terpadu Amplas Medan",
    corridor: "Jl. Sisingamangaraja → Jl. KL. Yos Sudarso → Jl. Karya Dalam",
    tag: "Via Yos Sudarso",
  },
];

const visiStatement =
  "Terwujudnya Lembaga Pendidikan Kejuruan yang menghasilkan peserta didik yang berkarakter nasional, berkemampuan global dan menjadi sekolah rujukan.";

const missionItems: MissionItem[] = [
  {
    code: "01",
    pillar: "karakter-teknologi",
    title: "Pembelajaran Berbasis Teknologi",
    desc: "Melakukan pembelajaran dengan memegang teguh nilai-nilai bangsa Indonesia berbasis teknologi, komunikasi, dan informasi.",
  },
  {
    code: "02",
    pillar: "kompetensi-wirausaha",
    title: "Kecakapan Hidup (Life Skills)",
    desc: "Menyiapkan peserta didik yang memiliki kecakapan hidup untuk mampu mengatasi berbagai tantangan dan masalah.",
  },
  {
    code: "03",
    pillar: "kompetensi-wirausaha",
    title: "Jiwa Wirausaha (Entrepreneurship)",
    desc: "Menyiapkan peserta didik yang memiliki jiwa wirausaha untuk mampu menciptakan lapangan kerja mandiri.",
  },
  {
    code: "04",
    pillar: "mutu-global",
    title: "Kurikulum & Penilaian Standar",
    desc: "Memperkuat standar kurikulum dan penilaian hasil belajar peserta didik secara berkala.",
  },
  {
    code: "05",
    pillar: "mutu-global",
    title: "Mutu Pengelolaan Sekolah",
    desc: "Meningkatkan pengelolaan sekolah dan jaminan kualitas yang berbasis pada standar mutu tinggi.",
  },
  {
    code: "06",
    pillar: "mutu-global",
    title: "Sekolah Patok Duga (Rujukan)",
    desc: "Menjadikan lembaga pendidikan sebagai patok duga bagi pengembangan sekolah kejuruan lainnya.",
  },
  {
    code: "07",
    pillar: "mutu-global",
    title: "Kemitraan Global & Nasional",
    desc: "Mengembangkan lembaga dengan menjalin kemitraan baik dengan institusi nasional maupun internasional.",
  },
  {
    code: "08",
    pillar: "karakter-teknologi",
    title: "Komunikasi Bahasa Global",
    desc: "Mengembangkan proses pembelajaran dengan penguasaan bahasa komunikasi global.",
  },
];

const threePillars = [
  {
    id: "karakter-teknologi" as const,
    code: "PILAR 01",
    title: "Karakter & Teknologi",
    summary: "Nilai kebangsaan, pemanfaatan TIK, dan penguasaan bahasa global.",
  },
  {
    id: "kompetensi-wirausaha" as const,
    code: "PILAR 02",
    title: "Kompetensi & Kewirausahaan",
    summary:
      "Kecakapan hidup adaptif serta kemandirian menciptakan peluang usaha.",
  },
  {
    id: "mutu-global" as const,
    code: "PILAR 03",
    title: "Mutu & Kemitraan Global",
    summary:
      "Standar kurikulum, tata kelola mutu, rujukan vokasi, dan jejaring mitra.",
  },
];

const schoolContacts = {
  websiteUrl: "https://smkn14-medan.vercel.app/",
  officialWebsiteUrl: "https://www.smkn14medan.sch.id/",
  address:
    "Jl. Karya Dalam No.26, Karang Berombak, Kec. Medan Barat, Kota Medan, Sumatera Utara 20117",
  whatsappNumber: "",
  whatsappMessage:
    "Assalamu'alaikum Admin SMK Negeri 14 Medan, saya ingin menanyakan informasi seputar sekolah.",
  officialEmail: "",
  emailSubject: "Pertanyaan Informasi - SMK Negeri 14 Medan",
  instagramUrl: "https://www.instagram.com/explore/tags/smkn14medan/",
  youtubeUrl:
    "https://www.youtube.com/results?search_query=SMK+Negeri+14+Medan",
};

function getTuServiceStatus() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const weekdayStr = parts.find((p) => p.type === "weekday")?.value || "Mon";
  const rawHour = Number(parts.find((p) => p.type === "hour")?.value || "0");
  const hour = rawHour === 24 ? 0 : rawHour;
  const minute = Number(parts.find((p) => p.type === "minute")?.value || "0");

  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const day = dayMap[weekdayStr] ?? 1;
  const currentMinutes = hour * 60 + minute;
  const openMinutes = 7 * 60 + 30;
  const closeMinutes = 15 * 60 + 30;

  const isWeekday = day >= 1 && day <= 5;
  const isOpen =
    isWeekday && currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  if (isOpen) {
    return {
      isOpen: true,
      badge: "LAYANAN TU BUKA • TUTUP 15.30 WIB",
      detail: "Senin – Jumat: 07.30 – 15.30 WIB",
    };
  }

  let nextOpenText = "Buka Senin 07.30 WIB";
  if (isWeekday && currentMinutes < openMinutes) {
    nextOpenText = "Buka Hari Ini 07.30 WIB";
  } else if (day >= 1 && day <= 4 && currentMinutes >= closeMinutes) {
    nextOpenText = "Buka Besok 07.30 WIB";
  }

  return {
    isOpen: false,
    badge: `DI LUAR JAM LAYANAN • ${nextOpenText.toUpperCase()}`,
    detail: "Senin – Jumat: 07.30 – 15.30 WIB",
  };
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
  ];

  const [expandedHistoryId, setExpandedHistoryId] = useState<number | null>(
    null,
  );
  const [isSambutanExpanded, setIsSambutanExpanded] = useState<boolean>(false);

  const [activeVisiMisiTab, setActiveVisiMisiTab] = useState<"visi" | "misi">(
    "misi",
  );

  const [copiedItem, setCopiedItem] = useState<"website" | "address" | null>(
    null,
  );
  const copyTimerRef = useRef<number | null>(null);
  const [tuStatus, setTuStatus] = useState(() => getTuServiceStatus());

  const [selectedRouteIndex, setSelectedRouteIndex] = useState<number>(0);
  const activeRoute = routeOrigins[selectedRouteIndex] ?? routeOrigins[0];
  const [mapTheme, setMapTheme] = useState<"dark" | "standard">("dark");

  const [activeSection, setActiveSection] = useState<string>("hero-top");
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const navRef = useRef<HTMLElement>(null);
  const navItemsRef = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const mobileItemsRef = useRef<{ [key: string]: HTMLAnchorElement | null }>(
    {},
  );
  const isManualScrollingRef = useRef<boolean>(false);
  const manualScrollIdleTimerRef = useRef<number | null>(null);
  const manualScrollMaxTimerRef = useRef<number | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTuStatus(getTuServiceStatus());
    }, 30000);
    return () => {
      window.clearInterval(timer);
      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const updateIndicator = useCallback((sectionId: string) => {
    const activeItem = navItemsRef.current[sectionId];
    if (activeItem) {
      const width = activeItem.offsetWidth;
      const left = activeItem.offsetLeft;
      if (width > 0) {
        setIndicatorStyle({
          left,
          width,
          opacity: 1,
        });
      }
    }
  }, []);

  useEffect(() => {
    updateIndicator(activeSection);

    const mobileNav = mobileNavRef.current;
    const mobileItem = mobileItemsRef.current[activeSection];
    if (mobileNav && mobileItem) {
      const targetScrollLeft =
        mobileItem.offsetLeft -
        mobileNav.clientWidth / 2 +
        mobileItem.clientWidth / 2;
      mobileNav.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: "smooth",
      });
    }
  }, [activeSection, updateIndicator]);

  useEffect(() => {
    const handleResize = () => updateIndicator(activeSection);
    window.addEventListener("resize", handleResize);

    let resizeObserver: ResizeObserver | null = null;
    if (navRef.current && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        updateIndicator(activeSection);
      });
      resizeObserver.observe(navRef.current);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        updateIndicator(activeSection);
      });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [activeSection, updateIndicator]);

  useEffect(() => {
    let ticking = false;

    const releaseManualLock = () => {
      isManualScrollingRef.current = false;
      if (manualScrollIdleTimerRef.current) {
        window.clearTimeout(manualScrollIdleTimerRef.current);
        manualScrollIdleTimerRef.current = null;
      }
      if (manualScrollMaxTimerRef.current) {
        window.clearTimeout(manualScrollMaxTimerRef.current);
        manualScrollMaxTimerRef.current = null;
      }
    };

    const detectActiveSection = () => {
      if (isManualScrollingRef.current) {
        if (manualScrollIdleTimerRef.current) {
          window.clearTimeout(manualScrollIdleTimerRef.current);
        }
        manualScrollIdleTimerRef.current = window.setTimeout(
          releaseManualLock,
          150,
        );
        ticking = false;
        return;
      }

      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 40;

      if (isAtBottom) {
        setActiveSection("kontak");
        ticking = false;
        return;
      }

      const triggerLine = Math.min(260, window.innerHeight * 0.35);
      let currentId = navMenus[0].id;

      for (const menu of navMenus) {
        const el = document.getElementById(menu.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerLine) {
            currentId = menu.id;
          }
        }
      }

      setActiveSection(currentId);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(detectActiveSection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    detectActiveSection();

    return () => {
      window.removeEventListener("scroll", onScroll);
      releaseManualLock();
    };
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement> | null,
    id: string,
  ) => {
    if (e) e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      isManualScrollingRef.current = true;
      setActiveSection(id);
      element.scrollIntoView({ behavior: "smooth" });

      if (manualScrollIdleTimerRef.current) {
        window.clearTimeout(manualScrollIdleTimerRef.current);
      }
      if (manualScrollMaxTimerRef.current) {
        window.clearTimeout(manualScrollMaxTimerRef.current);
      }

      manualScrollIdleTimerRef.current = window.setTimeout(() => {
        isManualScrollingRef.current = false;
      }, 450);

      manualScrollMaxTimerRef.current = window.setTimeout(() => {
        isManualScrollingRef.current = false;
      }, 1800);
    }
  };

  const copyToClipboard = async (
    text: string,
    type: "website" | "address",
    fallbackLabel: string,
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(type);
      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = window.setTimeout(() => {
        setCopiedItem(null);
      }, 2500);
    } catch {
      alert(`${fallbackLabel}: ${text}`);
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
    else if (q.includes("jurusan") || q.includes("keahlian"))
      scrollToSection(null, "jurusan");
    else if (q.includes("visi") || q.includes("misi"))
      scrollToSection(null, "visi-misi");
    else if (q.includes("peta")) scrollToSection(null, "peta");
    else if (
      q.includes("hubungi") ||
      q.includes("kontak") ||
      q.includes("wa") ||
      q.includes("whatsapp")
    )
      scrollToSection(null, "kontak");
    else alert("maaf, yang anda cari sekarang sedang tidak ada.");
  };

  const whatsappHref = schoolContacts.whatsappNumber
    ? `https://wa.me/${schoolContacts.whatsappNumber}?text=${encodeURIComponent(schoolContacts.whatsappMessage)}`
    : `https://api.whatsapp.com/send?text=${encodeURIComponent(schoolContacts.whatsappMessage)}`;

  const emailHref = `mailto:${schoolContacts.officialEmail}?subject=${encodeURIComponent(schoolContacts.emailSubject)}`;

  const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(schoolContacts.officialWebsiteUrl)}`;

  const googleMapsDirectionsHref = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(activeRoute.originQuery)}&destination=SMK+Negeri+14+Medan`;

  const renderMobileIcon = (id: string) => {
    switch (id) {
      case "hero-top":
        return (
          <svg
            className="w-3.5 h-3.5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        );
      case "latar-belakang":
        return (
          <svg
            className="w-3.5 h-3.5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "sambutan":
        return (
          <svg
            className="w-3.5 h-3.5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        );
      case "organisasi":
        return (
          <svg
            className="w-3.5 h-3.5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        );
      case "jurusan":
        return (
          <svg
            className="w-3.5 h-3.5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        );
      case "visi-misi":
        return (
          <svg
            className="w-3.5 h-3.5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "peta":
        return (
          <svg
            className="w-3.5 h-3.5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-3.5 h-3.5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        );
    }
  };

  return (
    <main className="relative w-full bg-[#0a0a0a] text-white selection:bg-white selection:text-black scroll-smooth font-['Plus_Jakarta_Sans',sans-serif] min-h-screen overflow-x-clip">
      <div className="absolute top-0 left-1/4 w-[35%] h-[35rem] bg-neutral-800/30 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-0 w-[30%] h-[30rem] bg-zinc-700/20 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* HEADER & NAVBAR DESKTOP */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-10 py-4 md:py-6 pointer-events-none">
        {/* Badge Brand Mobile (md:hidden) */}
        <a
          href="#hero-top"
          onClick={(e) => scrollToSection(e, "hero-top")}
          className="pointer-events-auto flex md:hidden items-center space-x-2.5 bg-neutral-900/90 backdrop-blur-xl px-4 py-2.5 rounded-full border border-white/15 shadow-xl"
        >
          <img
            src="/logo.jpg"
            alt="Logo SMKN 14"
            className="w-5 h-5 object-contain rounded-full"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-bold tracking-[0.18em] text-white uppercase">
            SMKN 14 MEDAN
          </span>
        </a>

        {/* Badge Brand Desktop */}
        <div className="pointer-events-auto hidden xl:flex items-center space-x-2 bg-neutral-900/90 backdrop-blur-xl px-5 py-3 rounded-full border border-white/10 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">
            SMKN 14 MEDAN
          </span>
        </div>

        {/* Navbar Desktop */}
        <nav
          ref={navRef}
          className="pointer-events-auto mx-auto hidden md:flex items-center gap-0.5 lg:gap-1 text-sm font-semibold text-neutral-300 bg-neutral-900/95 backdrop-blur-2xl p-2 rounded-full border border-white/15 shadow-2xl relative overflow-hidden"
        >
          <div className="w-7 h-7 lg:w-8 lg:h-8 flex items-center justify-center ml-1.5 mr-1 flex-shrink-0">
            <img
              src="/logo.jpg"
              alt="Logo SMKN 14"
              className="w-6 h-6 lg:w-7 lg:h-7 object-contain rounded-full"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>

          <div
            className="absolute top-2 bottom-2 left-0 rounded-full bg-white shadow-md transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none"
            style={{
              transform: `translateX(${indicatorStyle.left}px)`,
              width: `${indicatorStyle.width > 0 ? indicatorStyle.width : 70}px`,
              opacity: indicatorStyle.opacity,
            }}
          />
          {navMenus.map((menu) => (
            <a
              key={menu.id}
              ref={(el) => {
                navItemsRef.current[menu.id] = el;
              }}
              href={`#${menu.id}`}
              onClick={(e) => scrollToSection(e, menu.id)}
              className={`relative z-10 px-2.5 lg:px-3.5 py-2 lg:py-2.5 rounded-full transition-colors duration-300 tracking-wider uppercase text-xs whitespace-nowrap shrink-0 ${
                activeSection === menu.id
                  ? "text-black font-bold"
                  : "text-neutral-300 hover:text-white"
              }`}
            >
              {menu.label}
            </a>
          ))}
        </nav>

        <div className="hidden xl:block w-[12%] pointer-events-none"></div>
      </header>

      {/* FLOATING BOTTOM NAVIGATION KHUSUS MOBILE (md:hidden) */}
      <nav
        aria-label="Navigasi Mobile"
        className="fixed bottom-4 inset-x-3 z-50 md:hidden pointer-events-none flex justify-center"
      >
        <div
          ref={mobileNavRef}
          className="pointer-events-auto max-w-full overflow-x-auto scrollbar-none flex items-center gap-1.5 bg-neutral-900/95 backdrop-blur-2xl p-1.5 rounded-full border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.9)]"
        >
          {navMenus.map((menu) => {
            const isActive = activeSection === menu.id;
            return (
              <a
                key={menu.id}
                ref={(el) => {
                  mobileItemsRef.current[menu.id] = el;
                }}
                href={`#${menu.id}`}
                onClick={(e) => scrollToSection(e, menu.id)}
                className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? "bg-white text-black font-extrabold shadow-md"
                    : "text-neutral-300 font-semibold hover:text-white active:bg-white/10"
                }`}
              >
                {renderMobileIcon(menu.id)}
                <span>{menu.label}</span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* HERO SECTION */}
      <section
        id="hero-top"
        className="relative w-[100vw] min-h-screen overflow-hidden text-black pt-16 md:pt-0 bg-[#0d0d0d] flex items-center justify-center"
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
            <div className="w-full lg:w-[55%] text-left lg:pl-16 xl:pl-24 mt-16 lg:mt-0">
              <div className="bg-white/40 backdrop-blur-md border border-white/50 p-8 lg:p-12 rounded-[2rem] shadow-2xl">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-[900] leading-[0.95] tracking-tight text-black drop-shadow-sm">
                  SMK NEGERI 14
                  <br />
                  <span className="font-[800] uppercase">MEDAN</span>
                </h1>

                <div className="flex flex-wrap gap-2 mt-6">
                  <span className="bg-white/90 backdrop-blur-sm border border-white/60 px-4 py-1.5 rounded-full text-xs text-black font-bold tracking-wide shadow-sm hover:bg-black hover:text-white transition-colors cursor-default">
                    BERWAWASAN TINGGI
                  </span>
                  <span className="bg-white/90 backdrop-blur-sm border border-white/60 px-4 py-1.5 rounded-full text-xs text-black font-bold tracking-wide shadow-sm hover:bg-black hover:text-white transition-colors cursor-default">
                    BERKOMPETENSI
                  </span>
                  <span className="bg-white/90 backdrop-blur-sm border border-white/60 px-4 py-1.5 rounded-full text-xs text-black font-bold tracking-wide shadow-sm hover:bg-black hover:text-white transition-colors cursor-default">
                    SIAP BEKERJA
                  </span>
                </div>

                <form
                  onSubmit={handleSearch}
                  className="bg-white/90 backdrop-blur-md border border-white/80 mt-8 rounded-full flex items-center px-4 py-3 w-full lg:w-[88%] shadow-lg"
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
                    placeholder="Cari Menu: Jurusan, Organisasi, Peta..."
                    className="bg-transparent outline-none flex-1 ml-3 text-sm text-black placeholder:text-zinc-500 font-medium"
                  />
                </form>
              </div>
            </div>

            <div className="w-[88%] sm:w-[55%] lg:w-[23%] lg:mr-16 mb-10 lg:mb-0">
              <div className="bg-white/85 backdrop-blur-md border border-white/60 rounded-[1.5rem] p-6 text-center shadow-2xl">
                <p className="text-xs font-bold tracking-wide mb-3 text-black uppercase">
                  SCAN QR UNTUK AKSES PORTAL WEBSITE SEKOLAH
                </p>
                <div className="bg-white rounded-xl p-3 mx-auto w-fit shadow-inner border border-gray-200">
                  <img
                    src={qrCodeApiUrl}
                    alt="QR Code Portal SMKN 14 Medan"
                    className="w-36 h-36"
                  />
                </div>
                <a
                  href={schoolContacts.officialWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 px-3 py-1 rounded-full bg-black text-white text-xs font-mono tracking-wide hover:bg-neutral-800 transition"
                >
                  smkn14medan.sch.id
                </a>
                <p className="text-xs text-zinc-700 mt-3 leading-relaxed font-medium px-1">
                  Websites yang anda buka sekarang adalah Websites yang di
                  bangun Oleh Ananda Kami Raziq Hanan Fadillah, Salah Satu Siswa
                  SMK NEGERI 14 MEDAN
                </p>
              </div>
            </div>
          </main>
        </div>
      </section>

      {/* STRIP STATISTIK KUNCI SEKOLAH */}
      <section
        aria-label="Statistik Kunci SMKN 14 Medan"
        className="w-[100vw] bg-[#070707] border-y border-white/10 px-6 md:px-20 py-10 md:py-14 relative z-20"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {schoolStats.map((stat) => (
              <button
                key={stat.code}
                type="button"
                onClick={() => scrollToSection(null, stat.targetId)}
                className="group text-left bg-gradient-to-b from-neutral-900/90 to-neutral-950 rounded-[1.5rem] p-5 md:p-7 border border-white/10 hover:border-emerald-400/50 transition-all duration-300 shadow-xl flex flex-col justify-between cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono tracking-[0.2em] text-neutral-500 uppercase">
                    {stat.code}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400/70 group-hover:bg-emerald-400 transition-colors" />
                </div>

                <div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm font-bold text-neutral-200 mt-1.5">
                    {stat.label}
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5 leading-snug">
                    {stat.sublabel}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 01: SEJARAH */}
      <section
        id="latar-belakang"
        className="w-[100vw] min-h-screen bg-[#0a0a0a] text-white py-24 md:py-36 relative overflow-hidden flex flex-col justify-center"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full px-6 md:px-20 mb-12 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-white/10 mb-6 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
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
            <p className="text-xs md:text-sm text-neutral-400 w-full lg:w-[38%] font-normal leading-relaxed">
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
            className={`flex-shrink-0 bg-[#121212] rounded-[2rem] p-8 md:p-12 border border-white/10 shadow-2xl flex flex-col justify-between snap-start transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedHistoryId === 1 ? "w-[90%] md:w-[68%] bg-neutral-900 border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]" : "w-[85%] md:w-[38%]"}`}
          >
            <div>
              <span className="text-xs font-mono tracking-[0.3em] text-neutral-500 uppercase block mb-4">
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
                  className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedHistoryId === 1 ? "opacity-100 max-h-[32rem] md:border-l md:border-white/10 md:pl-8" : "opacity-0 max-h-0 md:max-h-[32rem]"}`}
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
            className={`flex-shrink-0 bg-[#121212] rounded-[2rem] p-8 md:p-12 border border-white/10 shadow-2xl flex flex-col justify-between snap-start relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedHistoryId === 2 ? "w-[90%] md:w-[68%] bg-neutral-900 border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]" : "w-[85%] md:w-[38%]"}`}
          >
            <div className="absolute -bottom-10 -right-10 text-9xl font-bold text-white/[0.02] pointer-events-none select-none">
              2011
            </div>
            <div className="relative z-10">
              <span className="text-xs font-mono tracking-[0.3em] text-neutral-500 uppercase block mb-4">
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
                  className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedHistoryId === 2 ? "opacity-100 max-h-[32rem] md:border-l md:border-white/10 md:pl-8" : "opacity-0 max-h-0 md:max-h-[32rem]"}`}
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
            className={`flex-shrink-0 bg-white text-black rounded-[2rem] p-8 md:p-12 border border-white shadow-2xl flex flex-col justify-between snap-start relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedHistoryId === 3 ? "w-[90%] md:w-[68%] bg-neutral-100 border-black/30 shadow-2xl" : "w-[85%] md:w-[38%]"}`}
          >
            <div className="absolute -bottom-10 -right-10 text-9xl font-bold text-black/[0.03] pointer-events-none select-none">
              2017
            </div>
            <div className="relative z-10">
              <span className="text-xs font-mono tracking-[0.3em] text-neutral-500 uppercase block mb-4">
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
                  className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedHistoryId === 3 ? "opacity-100 max-h-[32rem] md:border-l md:border-neutral-300 md:pl-8" : "opacity-0 max-h-0 md:max-h-[32rem]"}`}
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
            className={`flex-shrink-0 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-[2rem] p-8 md:p-12 border border-white/10 shadow-2xl flex flex-col justify-between snap-start transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedHistoryId === 4 ? "w-[90%] md:w-[68%] bg-neutral-900 border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]" : "w-[85%] md:w-[38%]"}`}
          >
            <div>
              <span className="text-xs font-mono tracking-[0.3em] text-neutral-500 uppercase block mb-4">
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
                  className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedHistoryId === 4 ? "opacity-100 max-h-[32rem] md:border-l md:border-white/10 md:pl-8" : "opacity-0 max-h-0 md:max-h-[32rem]"}`}
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
        className="w-[100vw] min-h-screen bg-[#070707] text-white px-6 md:px-20 py-20 md:py-40 flex flex-col justify-center border-t border-white/5 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 md:mb-20 gap-8">
            <div>
              <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-neutral-900 border border-white/10 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
                  HALAMAN SAMBUTAN KEPALA SEKOLAH
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                Sambutan Kepala <br />
                <span className="font-normal text-neutral-400">Sekolah</span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-neutral-400 w-full lg:w-[38%] font-normal leading-relaxed">
              Pimpinan institusi dalam memimpin dan mengembangkan ekosistem
              pendidikan vokasi yang unggul dan berkarakter.
            </p>
          </div>

          <div
            className={`bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-[2rem] p-8 md:p-12 border border-white/15 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] mx-auto ${isSambutanExpanded ? "w-full lg:w-[92%] border-white/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)]" : "w-full lg:w-[72%]"}`}
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
                  <div className="inline-block px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">
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
                    <span className="text-xs font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-2">
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

      {/* SECTION: STRUKTUR ORGANISASI & EKSTRAKURIKULER */}
      <section
        id="organisasi"
        className="w-[100vw] min-h-screen bg-black text-white px-6 md:px-20 py-20 md:py-40 transition-all border-t border-white/10 relative scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto w-full space-y-24">
          <div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
                  PROFIL SEKOLAH // STRUKTUR ORGANISASI
                </p>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
                  Struktur Pimpinan Utama
                </h2>
                <div className="w-[18%] h-1 bg-neutral-700 mt-4 rounded-full"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orgData
                .filter((item) => item.kategori === "Pimpinan")
                .map((org, index) => (
                  <div
                    key={org.id}
                    className="bg-gradient-to-b from-neutral-900/90 to-neutral-950 rounded-2xl p-6 md:p-8 border border-neutral-800 shadow-xl relative group overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold tracking-widest uppercase text-neutral-300 bg-neutral-950 px-3 py-1 rounded-md border border-neutral-800/80">
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

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-500">
                      <span>SMKN 14 MEDAN</span>
                      <span className="text-neutral-300">PIMPINAN</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* SUB-SECTION: EKSTRAKURIKULER & ORGANISASI SISWA */}
          <div id="ekskul" className="pt-16 border-t border-white/10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.22em] text-neutral-500 mb-2">
                  KESISWAAN // PENGEMBANGAN MINAT & BAKAT
                </p>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                  Organisasi & Ekstrakurikuler
                </h3>
              </div>
              <p className="text-xs md:text-sm text-neutral-400 w-full lg:w-[38%] leading-relaxed">
                Wadah pembinaan karakter, kepemimpinan, olahraga, dan
                kreativitas siswa SMK Negeri 14 Medan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10">
              {ekskulData.map((ekskul) => (
                <div
                  key={ekskul.code}
                  className="p-6 md:p-7 border-r border-b border-white/10 bg-[#070707] hover:bg-neutral-950 transition-colors flex flex-col justify-between gap-6"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                      <span>{ekskul.code}</span>
                      <span className="uppercase tracking-wider text-neutral-400">
                        {ekskul.bidang}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white tracking-tight">
                      {ekskul.nama}
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {ekskul.deskripsi}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-neutral-500">
                    <span>SMKN 14 MEDAN</span>
                    <span className="text-neutral-300">EKSKUL</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: GURU & TENAGA PENDIDIK (MARQUEE INTERAKTIF) */}
      <TeacherMarquee />

      {/* SECTION: ETALASE 11 KONSENTRASI KEAHLIAN (JURUSAN) */}
      <JurusanSection />

      {/* SECTION: VISI DAN MISI */}
      <section
        id="visi-misi"
        className="w-[100vw] min-h-screen bg-[#050505] text-white px-6 md:px-20 py-24 md:py-36 border-t border-white/10 relative scroll-mt-24 flex flex-col justify-center"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              Visi & Misi SMK Negeri <br />
              <span className="font-normal text-neutral-400">14 Medan</span>
            </h2>

            <div className="inline-flex border border-white/15 rounded-lg overflow-hidden self-start md:self-auto">
              <button
                type="button"
                onClick={() => setActiveVisiMisiTab("visi")}
                className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                  activeVisiMisiTab === "visi"
                    ? "bg-white text-black font-bold"
                    : "bg-transparent text-neutral-400 hover:text-white font-medium"
                }`}
              >
                Visi
              </button>
              <button
                type="button"
                onClick={() => setActiveVisiMisiTab("misi")}
                className={`px-4 py-2 text-xs uppercase tracking-wider border-l border-white/15 transition-colors cursor-pointer ${
                  activeVisiMisiTab === "misi"
                    ? "bg-white text-black font-bold"
                    : "bg-transparent text-neutral-400 hover:text-white font-medium"
                }`}
              >
                Misi (8 Poin)
              </button>
            </div>
          </div>

          {activeVisiMisiTab === "visi" && (
            <div className="py-14 md:py-20 w-full lg:w-[75%] space-y-6">
              <p className="text-xs uppercase tracking-widest text-neutral-500">
                Visi Sekolah
              </p>
              <blockquote className="border-l-[2px] border-white/40 pl-6 md:pl-8 text-2xl md:text-4xl font-medium text-neutral-100 leading-relaxed">
                {visiStatement}
              </blockquote>
            </div>
          )}

          {activeVisiMisiTab === "misi" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-12">
              {threePillars.map((pillar) => {
                const itemsInPillar = missionItems.filter(
                  (m) => m.pillar === pillar.id,
                );
                return (
                  <div
                    key={pillar.id}
                    className="border-t border-white/20 pt-6 space-y-5"
                  >
                    <div>
                      <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                        {pillar.code}
                      </p>
                      <h3 className="text-xl font-bold text-white mt-1">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                        {pillar.summary}
                      </p>
                    </div>

                    <div className="divide-y divide-white/10 border-t border-white/10">
                      {itemsInPillar.map((item) => (
                        <div key={item.code} className="py-4 space-y-1">
                          <div className="flex items-baseline gap-2.5">
                            <span className="font-mono text-xs text-neutral-500">
                              {item.code}
                            </span>
                            <h4 className="text-sm font-bold text-neutral-100">
                              {item.title}
                            </h4>
                          </div>
                          <p className="text-xs text-neutral-400 leading-relaxed pl-6">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 04: PETA LOKASI */}
      <section
        id="peta"
        className="w-[100vw] min-h-screen bg-[#050505] text-white px-6 md:px-20 py-20 md:py-40 flex flex-col justify-center relative overflow-hidden border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="mb-12">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.08]">
              Lokasi & Akses <br />
              <span className="font-normal text-neutral-400">
                Area SMKN 14 Medan
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 bg-[#080808] rounded-2xl p-7 md:p-8 border border-white/15 flex flex-col justify-between gap-7">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    SMK Negeri 14 Medan
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                    Jl. Karya Dalam No.26, Karang Berombak, Medan Barat
                  </p>
                </div>

                <div className="grid grid-cols-2 border border-white/15 rounded-xl overflow-hidden">
                  {routeOrigins.map((origin, idx) => {
                    const isSelected = selectedRouteIndex === idx;
                    const borderClasses =
                      idx === 0
                        ? "border-b border-r border-white/15"
                        : idx === 1
                          ? "border-b border-white/15"
                          : idx === 2
                            ? "border-r border-white/15"
                            : "";

                    return (
                      <button
                        key={origin.id}
                        type="button"
                        onClick={() => setSelectedRouteIndex(idx)}
                        className={`px-3.5 py-3 text-xs text-left transition-colors duration-200 cursor-pointer ${borderClasses} ${
                          isSelected
                            ? "bg-white text-black font-bold"
                            : "bg-transparent text-neutral-400 hover:text-white hover:bg-white/[0.04] font-medium"
                        }`}
                      >
                        {origin.label}
                      </button>
                    );
                  })}
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                      Dari {activeRoute.label}
                    </span>
                    <span className="text-xs font-mono font-semibold text-emerald-400">
                      {activeRoute.tag}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-neutral-100 leading-snug mt-1.5">
                    {activeRoute.corridor}
                  </p>
                </div>

                <div className="border-t border-white/10 divide-y divide-white/10">
                  <div className="py-3 flex items-baseline justify-between gap-4">
                    <span className="text-xs text-neutral-500 shrink-0">
                      Akses Utama
                    </span>
                    <span className="text-xs text-neutral-200 text-right font-medium">
                      Jl. KL. Yos Sudarso / Jl. Karya
                    </span>
                  </div>
                  <div className="py-3 flex items-baseline justify-between gap-4">
                    <span className="text-xs text-neutral-500 shrink-0">
                      Patokan
                    </span>
                    <span className="text-xs text-neutral-200 text-right font-medium">
                      Karang Berombak, dekat RSU Sufina Aziz
                    </span>
                  </div>
                  <div className="pt-3 flex items-baseline justify-between gap-4">
                    <span className="text-xs text-neutral-500 shrink-0">
                      Transportasi
                    </span>
                    <span className="text-xs text-neutral-200 text-right font-medium">
                      Angkot koridor Karya – Yos Sudarso
                    </span>
                  </div>
                </div>
              </div>

              <a
                href={googleMapsDirectionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white text-black px-5 py-3.5 rounded-xl text-xs uppercase tracking-wider font-extrabold hover:bg-neutral-200 transition text-center"
              >
                Buka Rute di Google Maps ↗
              </a>
            </div>

            <div className="lg:col-span-7 bg-[#080808] rounded-2xl overflow-hidden border border-white/15 flex flex-col min-h-[28rem]">
              <div className="px-5 py-3 border-b border-white/15 flex items-center justify-between gap-4 bg-[#080808]">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                  Tampilan Peta
                </span>
                <div
                  role="group"
                  aria-label="Pilih tampilan peta"
                  className="inline-flex border border-white/15 rounded-lg overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setMapTheme("dark")}
                    className={`px-3.5 py-1.5 text-xs tracking-wide border-r border-white/15 transition-colors duration-200 cursor-pointer ${
                      mapTheme === "dark"
                        ? "bg-white text-black font-bold"
                        : "bg-transparent text-neutral-400 hover:text-white hover:bg-white/[0.04] font-medium"
                    }`}
                  >
                    Mode Gelap
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapTheme("standard")}
                    className={`px-3.5 py-1.5 text-xs tracking-wide transition-colors duration-200 cursor-pointer ${
                      mapTheme === "standard"
                        ? "bg-white text-black font-bold"
                        : "bg-transparent text-neutral-400 hover:text-white hover:bg-white/[0.04] font-medium"
                    }`}
                  >
                    Standar
                  </button>
                </div>
              </div>

              <div className="relative flex-1 min-h-[26rem]">
                <iframe
                  title="Peta Lokasi SMKN 14 Medan"
                  src="https://maps.google.com/maps?q=SMK+Negeri+14+Medan,+Jl.+Karya+Dalam+No.26,+Medan&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  className={`w-full h-full min-h-[26rem] transition-all duration-300 ${
                    mapTheme === "dark"
                      ? "filter contrast-125 invert-[0.92] hue-rotate-180 opacity-90"
                      : "opacity-95"
                  }`}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER & KANAL KONTAK AKTIF */}
      <footer
        id="kontak"
        className="w-[100vw] bg-[#030303] text-white border-t border-white/10 px-6 md:px-20 pt-24 pb-28 md:pb-16 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
            <div className="lg:col-span-5 space-y-6">
              <p className="text-sm text-neutral-300 font-normal w-full lg:w-[90%] leading-relaxed">
                {schoolContacts.address}
              </p>

              <div className="border-y border-white/10 py-4 w-full lg:w-[90%] space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      tuStatus.isOpen
                        ? "bg-emerald-400 animate-pulse"
                        : "bg-neutral-500"
                    }`}
                  />
                  <span
                    className={`text-xs font-mono uppercase tracking-widest font-bold ${
                      tuStatus.isOpen ? "text-emerald-400" : "text-neutral-400"
                    }`}
                  >
                    {tuStatus.badge}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 pl-4.5">
                  {tuStatus.detail}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      schoolContacts.address,
                      "address",
                      "Alamat SMK Negeri 14 Medan",
                    )
                  }
                  className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer inline-flex items-center gap-2 border ${
                    copiedItem === "address"
                      ? "bg-white text-black border-white"
                      : "bg-transparent hover:bg-white text-white hover:text-black border-white/15 hover:border-white"
                  }`}
                >
                  <span>
                    {copiedItem === "address"
                      ? "✓ Alamat Tersalin"
                      : "Salin Alamat"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      schoolContacts.websiteUrl,
                      "website",
                      "Tautan website sekolah",
                    )
                  }
                  className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer inline-flex items-center gap-2 border ${
                    copiedItem === "website"
                      ? "bg-white text-black border-white"
                      : "bg-transparent hover:bg-white text-white hover:text-black border-white/15 hover:border-white"
                  }`}
                >
                  <span>
                    {copiedItem === "website"
                      ? "✓ Link Tersalin"
                      : "Salin Link Website"}
                  </span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6">
                  Hubungi Layanan Informasi Sekolah
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 border border-white/15 rounded-xl overflow-hidden">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-5 border-b border-white/15 sm:border-r bg-transparent hover:bg-white text-white hover:text-black transition-colors duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <svg
                        className="w-5 h-5 text-white group-hover:text-black transition-colors shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.758.458 3.474 1.328 4.988L2 22l5.184-1.359a9.927 9.927 0 0 0 4.847 1.262h.004c5.515 0 9.968-4.453 9.968-9.969A9.934 9.934 0 0 0 19.085 4.9 9.914 9.914 0 0 0 12.031 2zm5.814 14.254c-.244.687-1.418 1.314-1.956 1.396-.498.075-1.128.107-1.82-.113-.42-.133-.959-.312-1.648-.61-2.898-1.251-4.791-4.169-4.936-4.362-.144-.193-1.179-1.568-1.179-2.991 0-1.423.746-2.122 1.011-2.412.265-.29.578-.362.771-.362.193 0 .386.002.554.01.178.009.416-.068.651.496.244.585.829 2.023.901 2.168.073.145.121.314.024.507-.096.193-.145.314-.289.483-.145.169-.304.377-.434.507-.145.144-.296.3-.127.59.169.29.75 1.238 1.611 2.005 1.107.987 2.04 1.293 2.33 1.438.289.145.458.121.627-.073.169-.193.723-.845.916-1.135.193-.29.386-.241.651-.145.265.097 1.688.796 1.977.941.289.145.482.217.554.338.072.121.072.7-.172 1.387z" />
                      </svg>
                      <div>
                        <span className="text-xs font-extrabold uppercase tracking-wider block">
                          WhatsApp
                        </span>
                        <span className="text-xs text-neutral-400 group-hover:text-black/75">
                          Layanan Informasi Sekolah
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-bold">↗</span>
                  </a>

                  <a
                    href={emailHref}
                    className="group flex items-center justify-between p-5 border-b border-white/15 bg-transparent hover:bg-white text-white hover:text-black transition-colors duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <svg
                        className="w-5 h-5 text-white group-hover:text-black transition-colors shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                      </svg>
                      <div>
                        <span className="text-xs font-extrabold uppercase tracking-wider block">
                          Gmail
                        </span>
                        <span className="text-xs text-neutral-400 group-hover:text-black/75">
                          Surat Menyurat Resmi
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-bold">↗</span>
                  </a>

                  <a
                    href={schoolContacts.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-5 border-b sm:border-b-0 border-white/15 sm:border-r bg-transparent hover:bg-white text-white hover:text-black transition-colors duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <svg
                        className="w-5 h-5 text-white group-hover:text-black transition-colors shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      <div>
                        <span className="text-xs font-extrabold uppercase tracking-wider block">
                          Instagram
                        </span>
                        <span className="text-xs text-neutral-400 group-hover:text-black/75">
                          Kegiatan & OSIS
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-bold">↗</span>
                  </a>

                  <a
                    href={schoolContacts.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-5 bg-transparent hover:bg-white text-white hover:text-black transition-colors duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <svg
                        className="w-5 h-5 text-white group-hover:text-black transition-colors shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                      <div>
                        <span className="text-xs font-extrabold uppercase tracking-wider block">
                          YouTube
                        </span>
                        <span className="text-xs text-neutral-400 group-hover:text-black/75">
                          Profil & Liputan
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-bold">↗</span>
                  </a>
                </div>
              </div>

              <p className="text-xs text-neutral-500 font-semibold tracking-wider text-left lg:text-right">
                Website Ini Adalah Bukti Bahwa Umur Tidak Menentukan Apa Yang
                Dihasilkan, Namun Membuktikan Usaha Apa Yang Diberikan
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <p>© 2026 SMK Negeri 14 Medan. All Rights Reserved.</p>
            <p className="font-mono text-xs text-neutral-600">
              Dikembangkan oleh Raziq Hanan Fadillah — XI TKJ-1
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
