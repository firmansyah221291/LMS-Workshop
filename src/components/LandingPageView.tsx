import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Download,
  ExternalLink,
  GraduationCap,
  Layers,
  Lock,
  Play,
  QrCode,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  WifiOff,
  Zap,
} from 'lucide-react';
import classroomScene from '../assets/images/classroom_learning_scene_1791055377733.jpg';
import developerPhoto from '../assets/images/achmad_firmansyah_portrait_1791055408919.jpg';
import mascotOwl from '../assets/images/mascot_teacher_owl_1791045007491.jpg';
import { LMS_MODULES } from '../data/lmsContent';

interface LandingPageViewProps {
  onStartLearning: () => void;
  onOpenDeveloper: () => void;
  isInstallable: boolean;
  onInstall: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  onStartLearning,
  onOpenDeveloper,
  isInstallable,
  onInstall,
}) => {
  const [activePreviewTab, setActivePreviewTab] = useState<number>(1);

  return (
    <div className="space-y-12 pb-8">
      {/* 1. TOP MOVING TICKER / MARQUEE */}
      <div className="overflow-hidden bg-[#0B1B8C] border-2 border-[#C6F63D] rounded-2xl py-2.5 text-white font-mono-num text-xs font-bold shadow-lg">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          <span className="flex items-center gap-2 text-[#C6F63D]">
            <Sparkles className="w-4 h-4 text-[#F95716]" />
            BIMTEK DAERAH DIGITALISASI PEMBELAJARAN SD TAHUN 2026
          </span>
          <span className="text-white/60">•</span>
          <span className="text-[#FBF7EC]">
            3 MODUL LENGKAP & 30 MATERI INTERAKTIF TERSTRUKTUR
          </span>
          <span className="text-white/60">•</span>
          <span className="text-[#C6F63D]">
            EVALUASI KUIS PER MODUL DENGAN AMBANG KELULUSAN 80%
          </span>
          <span className="text-white/60">•</span>
          <span className="text-[#F95716]">
            SERTIFIKAT DIGITAL RESMI 32 JP DILENGKAPI QR CODE VERIFIKASI
          </span>
          <span className="text-white/60">•</span>
          <span className="text-[#95E18D]">
            PWA STANDALONE OFFLINE FIRST — AKSES TANPA INSTALASI TOKO APLIKASI
          </span>
          <span className="text-white/60">•</span>
          <span className="text-[#C6F63D]">
            SINKRONISASI CLOUD OTOMATIS KE GOOGLE APPS SCRIPT SPREADSHEET
          </span>
        </div>
      </div>

      {/* 2. HERO SECTION DENGAN ANIMASI BERGERAK & GAMBAR SUASANA KELAS */}
      <div className="bg-[#FBF7EC] border-3 border-[#0B1B8C] rounded-[40px] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Floating animated decorative pills */}
        <div className="hidden lg:block absolute top-6 right-8 animate-float-slow z-20 pointer-events-none">
          <div className="bg-[#C6F63D] border-2 border-[#0B1B8C] rounded-2xl px-4 py-2 text-[#0B1B8C] font-extrabold text-xs shadow-xl flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#F95716]" />
            <span>Refleksi Guru Terpadu</span>
          </div>
        </div>

        <div className="hidden lg:block absolute bottom-8 left-8 animate-float-reverse z-20 pointer-events-none">
          <div className="bg-[#F95716] border-2 border-[#0B1B8C] rounded-2xl px-4 py-2 text-white font-extrabold text-xs shadow-xl flex items-center gap-2">
            <Award className="w-4 h-4 text-[#C6F63D]" />
            <span>Sertifikat Resmi 32 JP</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Text & CTA */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2.5 bg-[#5B6CFA] border-2 border-[#0B1B8C] rounded-2xl px-4 py-2 text-white shadow-md">
              <GraduationCap className="w-5 h-5 text-[#C6F63D]" />
              <span className="font-mono-num text-xs font-bold tracking-wider uppercase">
                Platform LMS Bimtek Guru SD 2026
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0B1B8C] leading-[1.1]">
              Transformasi <span className="text-[#F95716]">Digital</span> Pembelajaran SD
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              Pelajari materi interaktif berkualitas, selesaikan refleksi guru di tiap materi, taklukkan kuis evaluasi 80%, dan raih <strong>Sertifikat Digital 32 JP Resmi</strong> berbasis Progressive Web App (PWA).
            </p>

            {/* Tombol Aksi Utama */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onStartLearning}
                className="px-8 py-4 rounded-2xl bg-[#C6F63D] border-3 border-[#0B1B8C] text-[#0B1B8C] font-extrabold text-base hover:brightness-105 active:scale-[0.98] transition cursor-pointer flex items-center gap-2 shadow-xl animate-pulse-glow"
              >
                <BookOpen className="w-5 h-5" />
                <span>Masuk Ruang Belajar Sekarang</span>
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenDeveloper}
                className="px-6 py-4 rounded-2xl bg-white border-2 border-[#0B1B8C] text-[#0B1B8C] font-extrabold text-sm hover:bg-[#FAF3E0] transition cursor-pointer flex items-center gap-2 shadow-md"
              >
                <span>Info Pengembang Aplikasi</span>
                <ExternalLink className="w-4 h-4 text-[#F95716]" />
              </button>

              {isInstallable && (
                <button
                  onClick={onInstall}
                  className="px-5 py-3.5 rounded-2xl bg-[#0B1B8C] text-[#C6F63D] border-2 border-[#C6F63D] font-bold text-xs hover:bg-[#1e40af] transition cursor-pointer flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Pasang Aplikasi ke HP/Laptop</span>
                </button>
              )}
            </div>

            {/* Statistik Mini */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t-2 border-[#0B1B8C]/15">
              <div className="text-center lg:text-left">
                <div className="font-display text-2xl sm:text-3xl font-bold text-[#0B1B8C] font-mono-num">
                  3 Modul
                </div>
                <div className="text-[11px] font-bold text-slate-500">Kurikulum Bimtek</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-display text-2xl sm:text-3xl font-bold text-[#F95716] font-mono-num">
                  30 Materi
                </div>
                <div className="text-[11px] font-bold text-slate-500">Refleksi Terkunci</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-display text-2xl sm:text-3xl font-bold text-[#059669] font-mono-num">
                  32 JP
                </div>
                <div className="text-[11px] font-bold text-slate-500">Sertifikat QR Valid</div>
              </div>
            </div>
          </div>

          {/* Right: GAMBAR SUASANA BELAJAR DI KELAS SD */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full relative group">
              {/* Outer decorative card shadow */}
              <div className="rounded-[36px] overflow-hidden border-4 border-[#0B1B8C] bg-white shadow-2xl relative">
                <img
                  src={classroomScene}
                  alt="Suasana Belajar Digital di Kelas Sekolah Dasar"
                  referrerPolicy="no-referrer"
                  className="w-full h-72 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0B1B8C]/95 via-[#0B1B8C]/70 to-transparent p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#C6F63D] flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" />
                        <span>SUASANA BELAJAR KELAS DIGITAL</span>
                      </div>
                      <div className="font-display text-base sm:text-lg font-bold">
                        Papan Interaktif & Eksplorasi Mandiri Murid SD
                      </div>
                    </div>
                    <span className="font-mono-num text-xs font-extrabold bg-[#F95716] px-3 py-1 rounded-xl border border-white">
                      Aktif & Bahagia
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Mini Owl Card */}
              <div className="absolute -bottom-5 -right-3 hidden sm:flex items-center gap-3 bg-[#FAF3E0] border-3 border-[#0B1B8C] rounded-2xl p-2.5 shadow-xl">
                <img
                  src={mascotOwl}
                  alt="Maskot EduPro"
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-xl object-cover border border-[#0B1B8C]"
                />
                <div className="text-left pr-2">
                  <div className="text-[11px] font-bold text-[#F95716]">Maskot Guru SD</div>
                  <div className="text-xs font-extrabold text-[#0B1B8C]">EduPro PWA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. EKSPLORASI INTERAKTIF 3 MODUL BIMTEK */}
      <div className="bg-[#6C7CFF] border-3 border-[#0B1B8C] rounded-[36px] p-6 sm:p-10 shadow-2xl text-white space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-[#C6F63D] tracking-wider uppercase flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>KURIKULUM RESMI BIMTEK 2026</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold mt-1">
              Jelajahi 3 Modul Kompetensi Guru
            </h2>
            <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-xl">
              Setiap modul memuat 10 materi terstruktur dengan tip praktis, poin kunci, dan kuis evaluasi HOTS studi kasus.
            </p>
          </div>

          {/* Module Selector Tabs */}
          <div className="flex items-center gap-2 bg-[#0B1B8C]/40 p-1.5 rounded-2xl border border-white/20 self-start md:self-auto">
            {LMS_MODULES.map((m) => (
              <button
                key={m.id}
                onClick={() => setActivePreviewTab(m.id)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                  activePreviewTab === m.id
                    ? 'bg-[#C6F63D] text-[#0B1B8C] shadow-md'
                    : 'text-white hover:text-[#C6F63D]'
                }`}
              >
                Modul {m.id}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Module Detail Banner */}
        {(() => {
          const mod = LMS_MODULES.find((m) => m.id === activePreviewTab) || LMS_MODULES[0];
          return (
            <div className="bg-[#FBF7EC] text-[#0B1B8C] border-3 border-[#0B1B8C] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b-2 border-[#0B1B8C]/15 pb-5">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#F95716] text-white font-mono-num text-xs font-extrabold mb-1">
                    {mod.code} · 10 MATERI & EVALUASI KUIS
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1B8C]">
                    {mod.title}
                  </h3>
                  <p className="text-sm font-semibold text-slate-700 mt-1">{mod.subtitle}</p>
                </div>

                <button
                  onClick={onStartLearning}
                  className="px-6 py-3 rounded-2xl bg-[#0B1B8C] text-[#C6F63D] font-extrabold text-sm border-2 border-[#0B1B8C] hover:bg-[#1e40af] transition cursor-pointer flex items-center gap-2 shrink-0 self-start lg:self-auto shadow-md"
                >
                  <span>Mulai Belajar {mod.code}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* 10 Lessons Preview Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {mod.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="bg-white border-2 border-[#0B1B8C] rounded-2xl p-3.5 hover:bg-[#C6F63D]/20 transition flex flex-col justify-between space-y-2"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                        <span className="font-mono-num">#{lesson.lessonNumber}</span>
                        <span className="text-[#F95716]">{lesson.duration}</span>
                      </div>
                      <div className="font-bold text-xs sm:text-sm text-[#0B1B8C] mt-1 line-clamp-2">
                        {lesson.title}
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-600 line-clamp-2">
                      {lesson.summary}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote Pedagogis */}
              <div className="bg-[#FAF3E0] border-2 border-[#0B1B8C] rounded-2xl p-4 text-xs sm:text-sm text-slate-800 font-semibold italic flex items-center gap-3">
                <span className="text-2xl text-[#F95716]">“</span>
                <span>{mod.quote}</span>
              </div>
            </div>
          );
        })()}
      </div>

      {/* 4. FITUR UNGGULAN APLIKASI (BENTO GRID INTERAKTIF) */}
      <div className="space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <div className="text-xs font-extrabold text-[#C6F63D] tracking-wider uppercase">
            KEUNGGULAN SISTEM EDUPRO PWA
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Dirancang Khusus untuk Kebutuhan Guru SD
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-[#FBF7EC] border-3 border-[#0B1B8C] rounded-3xl p-6 shadow-xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#95E18D] border-2 border-[#0B1B8C] flex items-center justify-center text-[#0B1B8C]">
              <Lock className="w-6 h-6 text-[#0B1B8C]" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#0B1B8C]">
              Penguncian Materi & Refleksi
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Materi selanjutnya otomatis terkunci sebelum materi sebelumnya dibaca dan kolom Refleksi Guru terisi secara substantif. Memastikan pemahaman mendalam di setiap tahap.
            </p>
          </div>

          <div className="bg-[#FBF7EC] border-3 border-[#0B1B8C] rounded-3xl p-6 shadow-xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F95716] border-2 border-[#0B1B8C] flex items-center justify-center text-white">
              <ClipboardCheck className="w-6 h-6 text-[#C6F63D]" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#0B1B8C]">
              Evaluasi Kuis per Modul (80%)
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Kuis per modul hanya terbuka setelah 10 materi selesai. Sistem menilai otomatis di peramban dan memberikan kesempatan pengulangan bagi yang belum mencapai batas 80%.
            </p>
          </div>

          <div className="bg-[#FBF7EC] border-3 border-[#0B1B8C] rounded-3xl p-6 shadow-xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#C6F63D] border-2 border-[#0B1B8C] flex items-center justify-center text-[#0B1B8C]">
              <Award className="w-6 h-6 text-[#F95716]" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#0B1B8C]">
              Sertifikat Digital PDF Resmi
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Template sertifikat lanskap klasik emas-biru dengan QR Code verifikasi dinamis yang langsung dapat diunduh ke format PDF A4 beresolusi tinggi.
            </p>
          </div>
        </div>
      </div>

      {/* 5. PROFIL SINGKAT PENGEMBANG & AJAKAN */}
      <div className="bg-[#FAF3E0] border-3 border-[#0B1B8C] rounded-[36px] p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-24 rounded-2xl overflow-hidden border-3 border-[#0B1B8C] bg-red-600 shrink-0 shadow-md">
            <img
              src={localStorage.getItem('edupro_developer_photo_original') || '/Achmad Firmansyah.png'}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src !== developerPhoto) target.src = developerPhoto;
              }}
              alt="Achmad Firmansyah"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div>
            <div className="text-xs font-bold text-[#F95716] uppercase">Pengembang Aplikasi</div>
            <h4 className="font-display text-xl font-bold text-[#0B1B8C]">Achmad Firmansyah</h4>
            <div className="text-xs text-slate-600 font-medium">
              SD Negeri 2 Mojosari · Kec. Asembagus, Kab. Situbondo
            </div>
            <div className="text-[11px] font-mono-num text-slate-500 mt-0.5">
              NIP: 199112222017081001
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenDeveloper}
            className="px-5 py-3 rounded-2xl bg-[#0B1B8C] text-[#C6F63D] font-bold text-xs hover:bg-[#1e40af] transition cursor-pointer"
          >
            Lihat Visi, Misi & Profil Lengkap &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
