import { useState } from "react";

interface FaqItem {
  id: number;
  kategori:
    | "Jadwal & Alur PPDB"
    | "Kelengkapan Berkas"
    | "Layanan BKK & Karier";
  pertanyaan: string;
  jawaban: string;
  poinPenting?: string[];
}

const faqData: FaqItem[] = [
  {
    id: 1,
    kategori: "Jadwal & Alur PPDB",
    pertanyaan:
      "Kapan dan bagaimana alur umum pendaftaran siswa baru (PPDB/SPMB) di SMK Negeri 14 Medan?",
    jawaban:
      "Penerimaan peserta didik baru SMK Negeri 14 Medan mengikuti jadwal resmi Dinas Pendidikan Provinsi Sumatera Utara secara daring (online) melalui portal resmi SPMB/PPDB Sumatera Utara, dilanjutkan dengan verifikasi berkas langsung di sekolah.",
    poinPenting: [
      "Tahap 1 — Pembuatan akun dan pengisian data diri calon peserta didik pada portal resmi Dinas Pendidikan.",
      "Tahap 2 — Pemilihan SMK Negeri 14 Medan beserta konsentrasi keahlian (jurusan) pilihan.",
      "Tahap 3 — Verifikasi berkas fisik dan tes minat/bakat kejuruan sesuai jadwal panitia sekolah.",
      "Tahap 4 — Pengumuman hasil seleksi dan daftar ulang di Ruang Tata Usaha SMKN 14 Medan.",
    ],
  },
  {
    id: 2,
    kategori: "Jadwal & Alur PPDB",
    pertanyaan:
      "Jalur pendaftaran apa saja yang umumnya dibuka untuk jenjang SMK Negeri?",
    jawaban:
      "Seleksi masuk SMK Negeri umumnya terbagi ke dalam beberapa jalur penerimaan sesuai petunjuk teknis Dinas Pendidikan Provinsi Sumatera Utara setiap tahun ajaran.",
    poinPenting: [
      "Jalur Afirmasi (keluarga ekonomi tidak mampu / pemegang KIP, PKH, atau KKS) & Penyandang Disabilitas.",
      "Jalur Perpindahan Tugas Orang Tua / Wali dan Anak Guru.",
      "Jalur Prestasi Akademik (nilai rapor) maupun Prestasi Non-Akademik (kejuaraan/lomba).",
      "Jalur Domisili / Reguler berdasarkan pemeringkatan nilai rapor dan ketentuan jarak.",
    ],
  },
  {
    id: 3,
    kategori: "Kelengkapan Berkas",
    pertanyaan:
      "Dokumen dan berkas apa saja yang wajib disiapkan saat verifikasi ke sekolah?",
    jawaban:
      "Calon peserta didik disarankan menyiapkan dokumen asli beserta fotokopi yang sudah dilegalisir dalam map rapi saat datang melakukan verifikasi ke panitia sekolah:",
    poinPenting: [
      "Ijazah SMP/MTs/Sederajat atau Surat Keterangan Lulus (SKL) asli dan fotokopi.",
      "Fotokopi Rapor SMP/MTs semester 1 sampai dengan semester 5 yang dilegalisir sekolah asal.",
      "Kartu Keluarga (KK) asli dan fotokopi yang diterbitkan minimal 1 tahun sebelum pendaftaran.",
      "Akta Kelahiran asli dan fotokopi serta pas foto terbaru ukuran 3x4.",
      "Surat Keterangan Sehat & Tidak Buta Warna dari fasilitas kesehatan (khusus jurusan teknik tertentu).",
    ],
  },
  {
    id: 4,
    kategori: "Kelengkapan Berkas",
    pertanyaan:
      "Apakah ada syarat khusus buta warna untuk jurusan tertentu di SMKN 14 Medan?",
    jawaban:
      "Ya. Untuk menjaga keselamatan kerja saat praktik di bengkel maupun laboratorium, beberapa konsentrasi keahlian seperti Teknik Instalasi Tenaga Listrik (TITL), Teknik Elektronika Industri (TEI), Teknik Kendaraan Ringan (TKR), dan Teknik Komputer dan Jaringan (TKJ) mensyaratkan calon siswa tidak buta warna.",
  },
  {
    id: 5,
    kategori: "Layanan BKK & Karier",
    pertanyaan:
      "Apa itu Bursa Kerja Khusus (BKK) SMK Negeri 14 Medan dan apa manfaatnya bagi siswa?",
    jawaban:
      "Bursa Kerja Khusus (BKK) adalah unit layanan resmi di bawah koordinasi sekolah yang menjadi jembatan penghubung antara lulusan SMK Negeri 14 Medan dengan dunia usaha dan dunia industri (DUDI) mitra.",
    poinPenting: [
      "Informasi lowongan kerja terverifikasi khusus alumni dan siswa tingkat akhir.",
      "Fasilitasi rekrutmen langsung (campus hiring / psikotes) dari perusahaan mitra di lingkungan sekolah.",
      "Pembekalan kesiapan kerja, penyusunan CV, dan simulasi wawancara kerja.",
    ],
  },
  {
    id: 6,
    kategori: "Layanan BKK & Karier",
    pertanyaan:
      "Bagaimana cara alumni atau perusahaan mitra mengakses layanan BKK sekolah?",
    jawaban:
      "Alumni SMKN 14 Medan maupun perwakilan perusahaan yang ingin menjalin kerja sama rekrutmen tenaga kerja atau Praktik Kerja Lapangan (PKL) dapat langsung berkoordinasi dengan unit BKK / Bidang Hubungan Masyarakat & Industri di kampus SMK Negeri 14 Medan, Jl. Karya Dalam No.26, Medan Barat pada jam kerja sekolah.",
  },
];

const faqCategories = [
  "Semua",
  "Jadwal & Alur PPDB",
  "Kelengkapan Berkas",
  "Layanan BKK & Karier",
] as const;

export function PpdbFaqSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  const filteredFaqs =
    selectedCategory === "Semua"
      ? faqData
      : faqData.filter((item) => item.kategori === selectedCategory);

  const toggleAccordion = (id: number) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="ppdb"
      className="w-full min-h-screen bg-[#070707] text-white px-6 md:px-20 py-20 md:py-36 border-t border-white/10 relative scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div>
            <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-neutral-900 border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 font-bold uppercase">
                LAYANAN INFORMASI // PPDB & BKK
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              Pusat Informasi PPDB <br />
              <span className="text-neutral-500 font-normal">
                & Bursa Kerja (BKK)
              </span>
            </h2>
          </div>

          <p className="text-xs md:text-sm text-neutral-400 max-w-md leading-relaxed">
            Panduan lengkap syarat pendaftaran siswa baru dan layanan penyaluran
            kerja lulusan untuk calon peserta didik, orang tua, dan mitra
            industri.
          </p>
        </div>

        {/* 3 Kartu Sorotan Layanan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          <div className="bg-gradient-to-b from-neutral-900/90 to-neutral-950 rounded-[24px] p-6 border border-white/10">
            <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase block mb-2">
              01 // PENDAFTARAN ONLINE
            </span>
            <h3 className="text-lg font-bold text-white mb-1.5">
              Portal SPMB / PPDB Sumut
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Pendaftaran dilakukan terpusat melalui sistem Dinas Pendidikan
              Provinsi Sumatera Utara sesuai jadwal resmi tahun ajaran berjalan.
            </p>
          </div>

          <div className="bg-gradient-to-b from-neutral-900/90 to-neutral-950 rounded-[24px] p-6 border border-white/10">
            <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase block mb-2">
              02 // LAYANAN TATA USAHA
            </span>
            <h3 className="text-lg font-bold text-white mb-1.5">
              Verifikasi Berkas Fisik
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Pelayanan informasi dan verifikasi dokumen dibuka pada hari kerja
              (Senin–Jumat) di Ruang Tata Usaha SMKN 14 Medan.
            </p>
          </div>

          <div className="bg-gradient-to-b from-neutral-900/90 to-neutral-950 rounded-[24px] p-6 border border-white/10">
            <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase block mb-2">
              03 // PENYALURAN LULUSAN
            </span>
            <h3 className="text-lg font-bold text-white mb-1.5">
              Unit BKK SMKN 14 Medan
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Koordinator BKK / PPKS:{" "}
              <strong className="text-neutral-200">Ahmad Faisal, S.Pd.</strong>{" "}
              — memfasilitasi informasi lowongan kerja dan kemitraan industri.
            </p>
          </div>
        </div>

        {/* Filter Kategori FAQ */}
        <div className="flex flex-wrap gap-2 mb-8 bg-neutral-900/80 p-2 rounded-2xl border border-white/10 w-fit">
          {faqCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-white text-black shadow-lg"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Daftar Accordion Tanya Jawab */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-[24px] border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-neutral-900/95 border-white/25 shadow-2xl"
                    : "bg-neutral-950/80 border-white/10 hover:border-white/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-6 md:px-8 py-5 md:py-6 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block">
                      {faq.kategori}
                    </span>
                    <h3 className="text-base md:text-lg font-bold text-white leading-snug">
                      {faq.pertanyaan}
                    </h3>
                  </div>

                  <span
                    className={`w-9 h-9 shrink-0 rounded-full border flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      isOpen
                        ? "bg-white text-black border-white rotate-180"
                        : "bg-white/5 text-neutral-300 border-white/15"
                    }`}
                  >
                    ▾
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2 border-t border-white/10 space-y-4">
                    <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
                      {faq.jawaban}
                    </p>

                    {faq.poinPenting && faq.poinPenting.length > 0 && (
                      <ul className="space-y-2 bg-black/40 p-4 md:p-5 rounded-2xl border border-white/5">
                        {faq.poinPenting.map((poin, index) => (
                          <li
                            key={index}
                            className="text-xs md:text-sm text-neutral-200 flex items-start gap-2.5 leading-relaxed"
                          >
                            <span className="text-emerald-400 font-bold mt-0.5">
                              ✓
                            </span>
                            <span>{poin}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
