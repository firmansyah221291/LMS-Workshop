import React, { useEffect, useState } from 'react';
import {
  Award,
  BookOpen,
  Building2,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Heart,
  IdCard,
  Mail,
  MapPin,
  MessageSquare,
  Quote,
  ShieldCheck,
  Sparkles,
  Target,
  UserCheck,
} from 'lucide-react';
import developerPhotoDefault from '../assets/images/achmad_firmansyah_portrait_1791055408919.jpg';

interface DeveloperInfoViewProps {
  onNavigateLearn: () => void;
}

export const DeveloperInfoView: React.FC<DeveloperInfoViewProps> = ({ onNavigateLearn }) => {
  // Ambil foto yang sekarang aktif (custom photo yang tersimpan di localStorage atau foto resmi publik)
  const [photoUrl, setPhotoUrl] = useState<string>(() => {
    try {
      const saved =
        localStorage.getItem('edupro_developer_photo_original') ||
        localStorage.getItem('edupro_developer_photo') ||
        localStorage.getItem('edupro_developer_custom_photo');
      if (saved) return saved;
    } catch {}
    return '/Achmad Firmansyah.png';
  });

  // Auto-sync ke server disk jika ada foto di localStorage yang belum tersimpan di berkas
  useEffect(() => {
    try {
      const saved =
        localStorage.getItem('edupro_developer_photo_original') ||
        localStorage.getItem('edupro_developer_photo') ||
        localStorage.getItem('edupro_developer_custom_photo');
      if (saved && saved.startsWith('data:image/')) {
        fetch('/api/save-developer-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: saved }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              console.log('Developer photo synced to disk:', data.message);
            }
          })
          .catch(() => {});
      }
    } catch {}
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Developer Card */}
      <div className="bg-[#FBF7EC] border-3 border-[#0B1B8C] rounded-[36px] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Decorative background badges */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#C6F63D]/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#F95716]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Foto Pengembang Asli */}
          <div className="lg:col-span-4 flex flex-col items-center">
            {/* The exact selector-targeted container */}
            <div className="relative">
              <div className="w-56 sm:w-64 aspect-[3/4] rounded-3xl overflow-hidden border-4 border-[#0B1B8C] shadow-2xl bg-red-600 relative">
                <img
                  src={photoUrl}
                  onError={(e) => {
                    // Fallback if public path is not yet cached
                    const target = e.target as HTMLImageElement;
                    if (target.src !== developerPhotoDefault) {
                      target.src = developerPhotoDefault;
                    }
                  }}
                  alt="Achmad Firmansyah - Pengembang EduPro PWA"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Verified Badge */}
              <div className="absolute -bottom-3 -right-3 bg-[#0B1B8C] text-[#C6F63D] border-2 border-[#C6F63D] rounded-2xl px-3.5 py-1.5 flex items-center gap-1.5 shadow-lg text-xs font-bold font-mono-num">
                <ShieldCheck className="w-4 h-4 text-[#C6F63D]" />
                <span>PENGEMBANG UTAMA</span>
              </div>
            </div>

            <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1B8C]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Identitas & Foto Pengembang Terverifikasi</span>
            </div>
          </div>

          {/* Biodata & Identitas Resmi */}
          <div className="lg:col-span-8 space-y-5 text-center lg:text-left">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#F95716] text-white text-xs font-extrabold tracking-wider uppercase mb-2">
                <span>Profil & Portofolio Pengembang LMS</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0B1B8C] leading-tight">
                Achmad Firmansyah
              </h2>
              <p className="text-sm sm:text-base font-semibold text-slate-700 mt-1">
                Pendidik Sekolah Dasar, Praktisi Digitalisasi Pembelajaran, & Pengembang Aplikasi EduPro PWA
              </p>
            </div>

            {/* Grid Informasi Identitas Pegawai & Sekolah */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="bg-white border-2 border-[#0B1B8C] rounded-2xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#5B6CFA] text-white flex items-center justify-center shrink-0 border border-[#0B1B8C]">
                  <IdCard className="w-5 h-5 text-[#C6F63D]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">Nomor Induk Pegawai (NIP)</div>
                  <div className="font-mono-num font-bold text-sm sm:text-base text-[#0B1B8C] tracking-tight">
                    199112222017081001
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Pegawai Negeri Sipil Kemendikbudristek</div>
                </div>
              </div>

              <div className="bg-white border-2 border-[#0B1B8C] rounded-2xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F95716] text-white flex items-center justify-center shrink-0 border border-[#0B1B8C]">
                  <Building2 className="w-5 h-5 text-[#C6F63D]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">Unit Kerja / Instansi</div>
                  <div className="font-bold text-sm sm:text-base text-[#0B1B8C] leading-snug">
                    SD Negeri 2 Mojosari
                  </div>
                  <div className="text-[10px] text-slate-600 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#F95716] shrink-0" />
                    <span>Kec. Asembagus, Kab. Situbondo</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-[#0B1B8C] rounded-2xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#5B6CFA] text-white flex items-center justify-center shrink-0 border border-[#0B1B8C]">
                  <Mail className="w-5 h-5 text-[#C6F63D]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">Akun Belajar.id Resmi</div>
                  <div className="font-mono-num font-bold text-xs sm:text-sm text-[#0B1B8C] break-all">
                    achmadfirmansyah221@guru.sd.belajar.id
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Google Workspace for Education</div>
                </div>
              </div>

              <div className="bg-white border-2 border-[#0B1B8C] rounded-2xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0B1B8C] text-white flex items-center justify-center shrink-0 border border-[#0B1B8C]">
                  <Award className="w-5 h-5 text-[#C6F63D]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">Peran & Keahlian</div>
                  <div className="font-bold text-xs sm:text-sm text-[#0B1B8C]">
                    Narasumber & Pengembang LMS
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Bimtek Digitalisasi Pembelajaran 2026</div>
                </div>
              </div>
            </div>

            {/* Kutipan Moto Pengembang */}
            <div className="bg-[#C6F63D]/40 border-2 border-[#0B1B8C] rounded-2xl p-4 flex items-start gap-3">
              <Quote className="w-6 h-6 text-[#F95716] shrink-0 rotate-180" />
              <div>
                <div className="text-[11px] font-extrabold uppercase text-[#0B1B8C] tracking-wide">
                  Moto Pengembang Bimtek:
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 italic mt-0.5 leading-relaxed">
                  "Teknologi bukan pengganti guru hebat, tetapi teknologi di tangan guru hebat akan menciptakan transformasi dan masa depan generasi bangsa."
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Visi, Misi, dan Moto Aplikasi (AI Generated) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Visi Aplikasi */}
        <div className="bg-white border-3 border-[#0B1B8C] rounded-3xl p-6 sm:p-7 shadow-xl space-y-3 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#5B6CFA]/15 rounded-full -mr-8 -mt-8 pointer-events-none" />
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#5B6CFA] text-white flex items-center justify-center border-2 border-[#0B1B8C] shadow-sm mb-4">
              <Target className="w-6 h-6 text-[#C6F63D]" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#5B6CFA]/10 text-[#0B1B8C] text-[11px] font-extrabold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#F95716]" />
              <span>Visi Aplikasi EduPro</span>
            </div>
            <h3 className="font-display text-xl font-bold text-[#0B1B8C] leading-snug">
              Mewujudkan Pembelajaran Dasar yang Adaptif, Interaktif, dan Berpusat pada Murid
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-3">
              Menjadi wadah digitalisasi terdepan bagi seluruh pendidik jenjang Sekolah Dasar dalam menguasai teknologi pembelajaran interaktif, membangun ekosistem kelas yang kreatif, dan mewujudkan merdeka belajar berlandaskan Profil Pelajar Pancasila.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-[#95E18D]" />
            <span>Terintegrasi Kurikulum Nasional</span>
          </div>
        </div>

        {/* Misi Aplikasi */}
        <div className="bg-white border-3 border-[#0B1B8C] rounded-3xl p-6 sm:p-7 shadow-xl space-y-3 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#F95716]/15 rounded-full -mr-8 -mt-8 pointer-events-none" />
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#F95716] text-white flex items-center justify-center border-2 border-[#0B1B8C] shadow-sm mb-4">
              <GraduationCap className="w-6 h-6 text-[#C6F63D]" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F95716]/10 text-[#F95716] text-[11px] font-extrabold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#0B1B8C]" />
              <span>Misi Aplikasi EduPro</span>
            </div>
            <h3 className="font-display text-xl font-bold text-[#0B1B8C] leading-snug">
              Tridarma Penguatan Kapasitas Guru Digital
            </h3>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-2 mt-3 list-none">
              <li className="flex items-start gap-2">
                <div className="w-4 h-4 rounded-full bg-[#C6F63D] text-[#0B1B8C] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px] border border-[#0B1B8C]">
                  1
                </div>
                <span><strong>Akses Materi Terstruktur:</strong> Menyediakan 30 modul pembelajaran interaktif berbobot HOTS.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-4 h-4 rounded-full bg-[#C6F63D] text-[#0B1B8C] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px] border border-[#0B1B8C]">
                  2
                </div>
                <span><strong>Refleksi & Evaluasi Mandiri:</strong> Melatih penalaran kritis guru melalui refleksi aksi nyata per materi.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-4 h-4 rounded-full bg-[#C6F63D] text-[#0B1B8C] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px] border border-[#0B1B8C]">
                  3
                </div>
                <span><strong>Sertifikasi Kredibel:</strong> Otomasi penilaian kuis dengan ambang batas kelulusan 80% dan sertifikat instan ber-QR Code.</span>
              </li>
            </ul>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-[#95E18D]" />
            <span>Standar Bimtek 32 Jam Pelajaran (JP)</span>
          </div>
        </div>

        {/* Moto Bimtek Digitalisasi */}
        <div className="bg-white border-3 border-[#0B1B8C] rounded-3xl p-6 sm:p-7 shadow-xl space-y-3 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#C6F63D]/25 rounded-full -mr-8 -mt-8 pointer-events-none" />
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#0B1B8C] text-white flex items-center justify-center border-2 border-[#0B1B8C] shadow-sm mb-4">
              <Heart className="w-6 h-6 text-[#C6F63D]" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#C6F63D]/30 text-[#0B1B8C] text-[11px] font-extrabold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#F95716]" />
              <span>Moto LMS Workshop</span>
            </div>
            <h3 className="font-display text-xl font-bold text-[#0B1B8C] leading-snug">
              "Tergerak Berinovasi, Bergerak Berkolaborasi, Menggerakkan Mutu Generasi"
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-3">
              Semangat digitalisasi bukan tentang kecanggihan gawai, melainkan tentang ketulusan hati guru dalam menghadirkan pengalaman belajar yang bermakna bagi setiap anak didik di penjuru nusantara.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-[#95E18D]" />
            <span>Semangat Komunitas Belajar Guru SD</span>
          </div>
        </div>
      </div>

      {/* Bagian Portofolio & Pilar Kompetensi Pengembang */}
      <div className="bg-[#FAF3E0] border-3 border-[#0B1B8C] rounded-[36px] p-6 sm:p-10 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#0B1B8C]/15 pb-5">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-wider text-[#F95716]">
              Portofolio & Pilar Inovasi Pengembang
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1B8C]">
              5 Pilar Digitalisasi Pembelajaran SD yang Diusung
            </h3>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#0B1B8C] text-[#C6F63D] text-xs font-bold font-mono-num self-start md:self-auto border border-[#0B1B8C]">
            <ShieldCheck className="w-4 h-4 text-[#C6F63D]" />
            <span>Fasilitator Bimtek Tersertifikasi</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border-2 border-[#0B1B8C] rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#5B6CFA] text-white flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h4 className="font-display text-base font-bold text-[#0B1B8C]">
                Optimalisasi Perangkat Papan Interaktif (IFP)
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-10.5">
              Mengintegrasikan layar sentuh besar dan Chromebook untuk pembelajaran kolaboratif multisensori siswa kelas awal maupun kelas tinggi di SD.
            </p>
          </div>

          <div className="bg-white border-2 border-[#0B1B8C] rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#F95716] text-white flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h4 className="font-display text-base font-bold text-[#0B1B8C]">
                Pemanfaatan AI Generatif untuk Guru SD
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-10.5">
              Memandu guru menyusun Modul Ajar berdiferensiasi, instrumen asesmen diagnostik, rubrik penilaian, dan bahan tayang presentasi interaktif menggunakan prompt engineering terstruktur.
            </p>
          </div>

          <div className="bg-white border-2 border-[#0B1B8C] rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#0B1B8C] text-white flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h4 className="font-display text-base font-bold text-[#0B1B8C]">
                Gamifikasi & Evaluasi Formatif Digital
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-10.5">
              Implementasi Quizizz Paper Mode, Wordwall interaktif, dan Google Workspace yang ramah gawai untuk meningkatkan antusiasme belajar siswa di kelas.
            </p>
          </div>

          <div className="bg-white border-2 border-[#0B1B8C] rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#C6F63D] text-[#0B1B8C] flex items-center justify-center font-bold text-xs border border-[#0B1B8C]">
                4
              </div>
              <h4 className="font-display text-base font-bold text-[#0B1B8C]">
                Arsitektur Aplikasi Progressive Web App (PWA)
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-10.5">
              Merancang sistem LMS ringan yang dapat diinstal langsung di smartphone guru tanpa Play Store, hemat kuota internet, dan mendukung pembelajaran luring berkat service worker.
            </p>
          </div>
        </div>

        {/* Rekomendasi Alur Pembelajaran bagi Peserta */}
        <div className="pt-4 border-t-2 border-[#0B1B8C]/15">
          <h4 className="text-xs font-extrabold uppercase text-[#0B1B8C] tracking-wider mb-3">
            Pesan Pengembang untuk Peserta Workshop:
          </h4>
          <div className="space-y-2.5">
            <div className="bg-white border-2 border-[#0B1B8C] rounded-2xl p-3.5 flex items-start gap-3">
              <div className="w-7 h-7 rounded-xl bg-[#0B1B8C] text-[#C6F63D] font-mono-num font-bold text-xs flex items-center justify-center shrink-0 border border-[#0B1B8C]">
                1
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="text-[#0B1B8C]">Belajar Bertahap & Tuntas:</strong> Pelajari setiap modul secara runut mulai dari Modul 1 (Bahan Ajar Interaktif), Modul 2 (Pengembangan Media), hingga Modul 3 (Asesmen Digital).
              </div>
            </div>

            <div className="bg-white border-2 border-[#0B1B8C] rounded-2xl p-3.5 flex items-start gap-3">
              <div className="w-7 h-7 rounded-xl bg-[#0B1B8C] text-[#C6F63D] font-mono-num font-bold text-xs flex items-center justify-center shrink-0 border border-[#0B1B8C]">
                2
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="text-[#0B1B8C]">Tulis Refleksi Aksi Nyata Guru:</strong> Setiap materi menuntut refleksi tertulis dari pengalaman nyata Bapak/Ibu guru di sekolah masing-masing untuk membuka materi selanjutnya.
              </div>
            </div>

            <div className="bg-white border-2 border-[#0B1B8C] rounded-2xl p-3.5 flex items-start gap-3">
              <div className="w-7 h-7 rounded-xl bg-[#0B1B8C] text-[#C6F63D] font-mono-num font-bold text-xs flex items-center justify-center shrink-0 border border-[#0B1B8C]">
                3
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="text-[#0B1B8C]">Selesaikan Kuis Kelulusan:</strong> Uji pemahaman Anda dengan mengerjakan 5 soal kuis per modul. Ambang batas kelulusan kuis adalah 80%.
              </div>
            </div>

            <div className="bg-white border-2 border-[#0B1B8C] rounded-2xl p-3.5 flex items-start gap-3">
              <div className="w-7 h-7 rounded-xl bg-[#0B1B8C] text-[#C6F63D] font-mono-num font-bold text-xs flex items-center justify-center shrink-0 border border-[#0B1B8C]">
                4
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="text-[#0B1B8C]">Asesmen Berbasis Pertumbuhan (Backward Design):</strong> Mengubah paradigma penilaian dari sekadar 'Nilai Berapa?' menjadi bukti nyata 'Bisa Apa?' melalui Understanding by Design (UbD).
              </div>
            </div>

            <div className="bg-white border-2 border-[#0B1B8C] rounded-2xl p-3.5 flex items-start gap-3">
              <div className="w-7 h-7 rounded-xl bg-[#0B1B8C] text-[#C6F63D] font-mono-num font-bold text-xs flex items-center justify-center shrink-0 border border-[#0B1B8C]">
                5
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="text-[#0B1B8C]">Pengakuan & Apresiasi Terakreditasi:</strong> Menyediakan evaluasi standar kelulusan 80% dengan generator sertifikat resmi 32 JP yang terverifikasi QR Code dan terhubung ke spreadsheet Google Apps Script.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Catatan Komitmen Pengembang */}
      <div className="bg-white border-3 border-[#0B1B8C] rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="text-xs font-bold text-[#F95716] uppercase tracking-wide">
            Komitmen Pengabdian Pendidikan
          </div>
          <h4 className="font-display text-xl sm:text-2xl font-bold text-[#0B1B8C]">
            Mari Berkolaborasi Demi Kemajuan Pendidikan Dasar Indonesia
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Aplikasi ini dikembangkan dengan dedikasi penuh untuk mendampingi rekan sejawat guru dan tenaga kependidikan dalam mengimplementasikan teknologi pembelajaran yang humanis, menyenangkan, dan efektif.
          </p>
        </div>

        <button
          onClick={onNavigateLearn}
          className="px-6 py-3.5 rounded-2xl bg-[#C6F63D] border-2 border-[#0B1B8C] text-[#0B1B8C] font-extrabold text-sm hover:brightness-105 transition cursor-pointer whitespace-nowrap shadow-md shrink-0"
        >
          Mulai Belajar Sekarang &rarr;
        </button>
      </div>
    </div>
  );
};
