import { useState } from "react";

type ClusterKey =
  | "all"
  | "ti-elektro"
  | "otomotif-mesin"
  | "bangunan-pariwisata";

interface JurusanItem {
  code: string;
  name: string;
  cluster: Exclude<ClusterKey, "all">;
  clusterLabel: string;
  kabeng: string;
  summary: string;
  highlights: string[];
}

const clusterFilters: { key: ClusterKey; label: string }[] = [
  { key: "all", label: "Semua (11)" },
  { key: "ti-elektro", label: "TI & Elektro" },
  { key: "otomotif-mesin", label: "Otomotif & Mesin" },
  { key: "bangunan-pariwisata", label: "Bangunan & Pariwisata" },
];

const jurusanList: JurusanItem[] = [
  {
    code: "01",
    name: "Teknik Komputer dan Jaringan",
    cluster: "ti-elektro",
    clusterLabel: "TI & Elektro",
    kabeng: "Reni Famalia Sitorus, S.Pd",
    summary:
      "Fokus pada perancangan, konfigurasi, dan pemeliharaan jaringan komputer, administrasi server, serta infrastruktur konektivitas.",
    highlights: [
      "Administrasi Jaringan & Server",
      "Infrastruktur & Keamanan",
      "Pemeliharaan Perangkat",
    ],
  },
  {
    code: "02",
    name: "Rekayasa Perangkat Lunak",
    cluster: "ti-elektro",
    clusterLabel: "TI & Elektro",
    kabeng: "Mukhlis Idrus, S.Kom",
    summary:
      "Membekali siswa dengan logika pemrograman, pengembangan aplikasi web dan perangkat lunak, basis data, serta pengujian sistem.",
    highlights: [
      "Pengembangan Aplikasi & Web",
      "Basis Data & Arsitektur",
      "Pengujian Perangkat Lunak",
    ],
  },
  {
    code: "03",
    name: "Teknik Elektronika Industri",
    cluster: "ti-elektro",
    clusterLabel: "TI & Elektro",
    kabeng: "Aron Heriyanto Naiborhu, S.Pd.",
    summary:
      "Mempelajari sistem kontrol elektronik industri, sensor, mikrokontroler, serta perawatan rangkaian elektronika terapan.",
    highlights: [
      "Sistem Kontrol & Sensor",
      "Rangkaian Elektronika",
      "Perawatan Alat Industri",
    ],
  },
  {
    code: "04",
    name: "Teknik Kendaraan Ringan",
    cluster: "otomotif-mesin",
    clusterLabel: "Otomotif & Mesin",
    kabeng: "Fermi Haris Bahagia Tarigan, S.Pd",
    summary:
      "Mengulas perawatan berkala, diagnosis kerusakan, dan perbaikan sistem mesin, kelistrikan, serta sasis kendaraan roda empat.",
    highlights: [
      "Perawatan & Servis Berkala",
      "Sistem Mesin & Kelistrikan",
      "Diagnosis & Sasis",
    ],
  },
  {
    code: "05",
    name: "Teknik Bisnis Sepeda Motor",
    cluster: "otomotif-mesin",
    clusterLabel: "Otomotif & Mesin",
    kabeng: "Ahmad Ridwan, S.Pd.",
    summary:
      "Menangani perawatan, perbaikan, dan pengelolaan bengkel sepeda motor mulai dari sistem bahan bakar injeksi hingga kelistrikan.",
    highlights: [
      "Engine & Sistem Injeksi",
      "Kelistrikan Sepeda Motor",
      "Manajemen Bengkel",
    ],
  },
  {
    code: "06",
    name: "Teknik Bodi Otomotif",
    cluster: "otomotif-mesin",
    clusterLabel: "Otomotif & Mesin",
    kabeng: "Drs. Tolen",
    summary:
      "Fokus pada perbaikan bodi kendaraan, pengelasan, pembentukan panel, persiapan permukaan, dan pengecatan otomotif.",
    highlights: [
      "Perbaikan & Pembentukan Bodi",
      "Persiapan Permukaan",
      "Teknik Pengecatan",
    ],
  },
  {
    code: "07",
    name: "Teknik Pemesinan",
    cluster: "otomotif-mesin",
    clusterLabel: "Otomotif & Mesin",
    kabeng: "Irma Debora Simatupang, S.Pd",
    summary:
      "Melatih presisi pengerjaan logam menggunakan mesin bubut, frais, gerinda, dan pemrograman dasar CNC sesuai gambar teknik.",
    highlights: [
      "Mesin Bubut & Frais",
      "Pemrograman CNC",
      "Pembacaan Gambar Teknik",
    ],
  },
  {
    code: "08",
    name: "Desain Pemodelan dan Informasi Bangunan",
    cluster: "bangunan-pariwisata",
    clusterLabel: "Bangunan & Pariwisata",
    kabeng: "Darwin Sitepu",
    summary:
      "Mengembangkan kemampuan gambar arsitektur dan struktur, pemodelan digital bangunan, serta estimasi rencana anggaran biaya.",
    highlights: [
      "Gambar Teknik & CAD",
      "Pemodelan Informasi Bangunan",
      "Estimasi Konstruksi",
    ],
  },
  {
    code: "09",
    name: "Bisnis Konstruksi dan Properti",
    cluster: "bangunan-pariwisata",
    clusterLabel: "Bangunan & Pariwisata",
    kabeng: "Reja Syahputra, S.Pd",
    summary:
      "Mencakup pelaksanaan pekerjaan konstruksi bangunan gedung, pengawasan mutu lapangan, serta pengelolaan proyek properti.",
    highlights: [
      "Pelaksanaan Konstruksi",
      "Pengawasan Lapangan",
      "Pengelolaan Proyek",
    ],
  },
  {
    code: "10",
    name: "Teknik Instalasi Tenaga Listrik",
    cluster: "ti-elektro",
    clusterLabel: "TI & Elektro",
    kabeng: "Juwita Vebrina Zebua, S.Pd.",
    summary:
      "Mempelajari pemasangan, pengujian, dan perawatan instalasi listrik penerangan, tenaga, serta sistem kendali motor listrik.",
    highlights: [
      "Instalasi Listrik Bangunan",
      "Sistem Kendali Daya",
      "Keselamatan Ketenagalistrikan",
    ],
  },
  {
    code: "11",
    name: "Perhotelan",
    cluster: "bangunan-pariwisata",
    clusterLabel: "Bangunan & Pariwisata",
    kabeng: "Sumiati, SE",
    summary:
      "Membentuk kompetensi layanan hospitality profesional meliputi tata graha, layanan tamu, tata hidang, dan etika pelayanan.",
    highlights: [
      "Housekeeping & Tata Graha",
      "Front Office & Layanan Tamu",
      "Standar Hospitality",
    ],
  },
];

export function JurusanSection() {
  const [selectedCluster, setSelectedCluster] = useState<ClusterKey>("all");
  const [selectedCode, setSelectedCode] = useState<string>("01");

  const filteredList =
    selectedCluster === "all"
      ? jurusanList
      : jurusanList.filter((item) => item.cluster === selectedCluster);

  const activeJurusan =
    jurusanList.find((item) => item.code === selectedCode) ??
    filteredList[0] ??
    jurusanList[0];

  return (
    <section
      id="jurusan"
      className="w-full min-h-screen bg-[#070707] text-white px-6 md:px-20 py-24 md:py-36 border-t border-white/10 relative scroll-mt-24 flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-white/10">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            Konsentrasi Keahlian <br />
            <span className="font-normal text-neutral-400">11 Jurusan</span>
          </h2>
          <p className="text-xs md:text-sm text-neutral-400">
            Pilih jurusan untuk melihat ringkasan kompetensi dan kepala bengkel.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-6">
          {clusterFilters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              onClick={() => {
                setSelectedCluster(filter.key);
                const firstMatch =
                  filter.key === "all"
                    ? jurusanList[0]
                    : jurusanList.find((j) => j.cluster === filter.key);
                if (firstMatch) setSelectedCode(firstMatch.code);
              }}
              className={`px-3.5 py-1.5 text-xs rounded-md border transition-colors cursor-pointer ${
                selectedCluster === filter.key
                  ? "bg-white/15 text-white border-white/40 font-semibold"
                  : "bg-transparent text-neutral-500 border-white/10 hover:text-neutral-300"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-10 items-start">
          <div className="lg:col-span-6 divide-y divide-white/10 border-b border-white/10">
            {filteredList.map((item) => {
              const isSelected = item.code === activeJurusan.code;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setSelectedCode(item.code)}
                  className={`w-full py-3.5 px-3 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-white text-black font-bold"
                      : "bg-transparent text-neutral-300 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span
                      className={`font-mono text-xs shrink-0 ${
                        isSelected ? "text-black/70" : "text-neutral-500"
                      }`}
                    >
                      {item.code}
                    </span>
                    <span className="text-sm md:text-base truncate">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs shrink-0">
                    {isSelected ? "●" : "→"}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-6 lg:sticky lg:top-28 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-10 space-y-6">
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                {activeJurusan.code} // {activeJurusan.clusterLabel}
              </p>
              <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                {activeJurusan.name}
              </h3>
            </div>

            <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
              {activeJurusan.summary}
            </p>

            <div className="border-t border-white/10 pt-5 space-y-2">
              <p className="text-xs uppercase tracking-widest text-neutral-500">
                Fokus Utama
              </p>
              <ul className="space-y-1.5 text-xs md:text-sm text-neutral-300">
                {activeJurusan.highlights.map((point) => (
                  <li key={point} className="flex items-center gap-2.5">
                    <span className="text-neutral-500">—</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <span className="text-neutral-500 uppercase tracking-wider">
                Kepala Bengkel
              </span>
              <span className="font-semibold text-white">
                {activeJurusan.kabeng}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JurusanSection;
