import React, { useEffect, useRef, useState } from 'react';
import {
  Award,
  BookOpen,
  Building2,
  Camera,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Heart,
  IdCard,
  Mail,
  MapPin,
  MessageSquare,
  Quote,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Target,
  Upload,
  UserCheck,
} from 'lucide-react';
import developerPhotoDefault from '../assets/images/achmad_firmansyah_portrait_1791055408919.jpg';

interface DeveloperInfoViewProps {
  onNavigateLearn: () => void;
}

export const DeveloperInfoView: React.FC<DeveloperInfoViewProps> = ({ onNavigateLearn }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoUrl, setPhotoUrl] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('edupro_developer_photo_original');
      if (saved) return saved;
    } catch {}
    return '/Achmad Firmansyah.png';
  });

  const [isCustomPhoto, setIsCustomPhoto] = useState<boolean>(() => {
    try {
      return Boolean(localStorage.getItem('edupro_developer_photo_original'));
    } catch {
      return false;
    }
  });

  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Sync with localStorage
  const handleApplyFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Harap pilih file gambar (PNG, JPG, atau JPEG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setPhotoUrl(dataUrl);
        setIsCustomPhoto(true);
        try {
          localStorage.setItem('edupro_developer_photo_original', dataUrl);
        } catch {}

        // Persist to server backend if running
        try {
          await fetch('/api/upload-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dataUrl }),
          });
        } catch {}

        setUploadSuccessMessage('✓ Foto asli pengembang berhasil dipasang (asli tanpa diedit/AI)!');
        setTimeout(() => setUploadSuccessMessage(null), 5000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleApplyFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleApplyFile(file);
    }
  };

  const handleResetPhoto = () => {
    try {
      localStorage.removeItem('edupro_developer_photo_original');
    } catch {}
    setPhotoUrl('/Achmad Firmansyah.png');
    setIsCustomPhoto(false);
    setUploadSuccessMessage('Foto direset ke file bawaan.');
    setTimeout(() => setUploadSuccessMessage(null), 3000);
  };

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
            <div
              className={`relative group ${isDragging ? 'ring-4 ring-[#C6F63D]' : ''}`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
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
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay hover upload button */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-[#0B1B8C]/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer p-3 text-center"
                >
                  <Camera className="w-8 h-8 text-[#C6F63D] mb-1" />
                  <span className="text-xs font-bold">Ganti dengan File Foto Asli</span>
                  <span className="text-[10px] text-white/80">(Achmad Firmansyah.png)</span>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="absolute -bottom-3 -right-3 bg-[#0B1B8C] text-[#C6F63D] border-2 border-[#C6F63D] rounded-2xl px-3.5 py-1.5 flex items-center gap-1.5 shadow-lg text-xs font-bold font-mono-num">
                <ShieldCheck className="w-4 h-4 text-[#C6F63D]" />
                <span>PENGEMBANG UTAMA</span>
              </div>
            </div>

            {/* Hidden native file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Tombol Khusus Pasang Foto Asli Upload */}
            <div className="mt-5 w-full max-w-xs space-y-2 text-center">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#C6F63D] border-2 border-[#0B1B8C] text-[#0B1B8C] text-xs font-extrabold hover:brightness-105 active:scale-[0.98] transition cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <Upload className="w-4 h-4 text-[#F95716]" />
                <span>Pilih / Pasang File Foto Asli</span>
              </button>

              {isCustomPhoto && (
                <button
                  type="button"
                  onClick={handleResetPhoto}
                  className="text-[11px] text-slate-500 hover:text-[#0B1B8C] underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Kembalikan ke Foto Awal</span>
                </button>
              )}

              {uploadSuccessMessage && (
                <div className="bg-[#95E18D] border border-[#0B1B8C] rounded-xl px-3 py-1.5 text-xs font-bold text-[#0B1B8C] animate-fadeIn">
                  {uploadSuccessMessage}
                </div>
              )}

              <div className="text-[11px] font-semibold text-slate-500">
                {isCustomPhoto
                  ? '✓ File foto asli tersimpan & terpasang'
                  : 'Klik tombol di atas untuk memilih foto asli "Achmad Firmansyah.png"'}
              </div>
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
                  <div className="font-mono-num font-bold text-sm text-[#0B1B8C] break-all">
                    199112222017081001
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-[#0B1B8C] rounded-2xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F95716] text-white flex items-center justify-center shrink-0 border border-[#0B1B8C]">
                  <Building2 className="w-5 h-5 text-[#C6F63D]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">Unit Kerja / Satuan Pendidikan</div>
                  <div className="font-bold text-sm text-[#0B1B8C]">
                    SD Negeri 2 Mojosari
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Kecamatan Asembagus, Kabupaten Situbondo
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-[#0B1B8C] rounded-2xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0B1B8C] text-[#C6F63D] flex items-center justify-center shrink-0 border border-[#0B1B8C]">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">Surel Belajar.id Resmi</div>
                  <div className="font-semibold text-xs text-[#0B1B8C] break-all">
                    achmadfirmansyah221@guru.sd.belajar.id
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-[#0B1B8C] rounded-2xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C6F63D] text-[#0B1B8C] flex items-center justify-center shrink-0 border border-[#0B1B8C]">
                  <MapPin className="w-5 h-5 text-[#F95716]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">Wilayah Pengabdian</div>
                  <div className="font-bold text-sm text-[#0B1B8C]">
                    Kabupaten Situbondo, Jawa Timur
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Komunitas Belajar Guru SD Digital
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onNavigateLearn}
                className="px-6 py-3 rounded-2xl bg-[#0B1B8C] text-[#C6F63D] font-extrabold text-sm border-2 border-[#0B1B8C] hover:bg-[#1e40af] transition cursor-pointer flex items-center gap-2 shadow-md"
              >
                <BookOpen className="w-4 h-4" />
                <span>Buka Ruang Belajar (3 Modul)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOTO WORKSHOP DIGITALISASI PEMBELAJARAN */}
      <div className="bg-gradient-to-r from-[#0B1B8C] via-[#1e40af] to-[#5B6CFA] border-3 border-[#0B1B8C] rounded-[32px] p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#C6F63D] text-[#0B1B8C] px-4 py-1.5 rounded-xl text-xs font-extrabold">
            <Quote className="w-4 h-4 text-[#F95716]" />
            <span>MOTO LMS WORKSHOP DIGITALISASI PEMBELAJARAN</span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#C6F63D] leading-tight">
            “Bukan Sekadar Keren Tapi Tepat Sasaran: Bergerak Bersama, Menginspirasi dengan Aksi Nyata, Menjadikan Setiap Murid Berdaya di Era Digital.”
          </h3>

          <p className="text-xs sm:text-sm text-white/90 max-w-2xl mx-auto leading-relaxed pt-1">
            Teknologi di tangan guru yang berdedikasi adalah jembatan emas menuju pengalaman belajar yang bermakna, mendalam, dan membahagiakan murid sekolah dasar.
          </p>
        </div>
      </div>

      {/* VISI & MISI APLIKASI (DIHASILKAN SECARA OTOMATIS OLEH AI) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* VISI */}
        <div className="lg:col-span-5 bg-[#C6F63D] border-3 border-[#0B1B8C] rounded-[32px] p-6 sm:p-8 text-[#0B1B8C] shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#0B1B8C] text-[#C6F63D] px-3.5 py-1.5 rounded-xl text-xs font-extrabold tracking-wider">
              <Target className="w-4 h-4 text-[#F95716]" />
              <span>VISI APLIKASI EDUPRO PWA</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold leading-snug">
              Mewujudkan Ekosistem Pembelajaran Digital SD yang Inklusif, Interaktif, dan Berpusat pada Murid
            </h3>

            <p className="text-sm leading-relaxed text-[#0B1B8C]/90 font-medium">
              Aplikasi EduPro PWA dirancang untuk mendemokratisasi akses pelatihan mandiri berkualitas tinggi bagi seluruh pendidik sekolah dasar di Indonesia—dari perkotaan hingga pelosok daerah—sehingga setiap guru mampu menjadi arsitek pembelajaran digital yang adaptif, reflektif, dan berdampak nyata bagi murid.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t-2 border-[#0B1B8C]/20 flex items-center justify-between text-xs font-extrabold">
            <span>Bimtek SD 2026</span>
            <span>Standar Nasional PMM & Kurikulum Merdeka</span>
          </div>
        </div>

        {/* MISI */}
        <div className="lg:col-span-7 bg-[#FBF7EC] border-3 border-[#0B1B8C] rounded-[32px] p-6 sm:p-8 text-[#0B1B8C] shadow-xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#F95716] text-white px-3.5 py-1.5 rounded-xl text-xs font-extrabold tracking-wider">
            <GraduationCap className="w-4 h-4 text-[#C6F63D]" />
            <span>5 MISI UTAMA PENGEMBANGAN APLIKASI</span>
          </div>

          <h3 className="font-display text-xl sm:text-2xl font-bold">
            Pilar Strategis Peningkatan Mutu Guru SD
          </h3>

          <div className="space-y-3">
            <div className="bg-white border-2 border-[#0B1B8C] rounded-2xl p-3.5 flex items-start gap-3">
              <div className="w-7 h-7 rounded-xl bg-[#5B6CFA] text-white font-mono-num font-bold text-xs flex items-center justify-center shrink-0 border border-[#0B1B8C]">
                1
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="text-[#0B1B8C]">Transformasi Pedagogis Dua Arah:</strong> Mengalihkan kebiasaan presentasi satu arah menuju bahan ajar interaktif yang menuntut aksi, respon langsung, dan alur eksplorasi mandiri murid.
              </div>
            </div>

            <div className="bg-white border-2 border-[#0B1B8C] rounded-2xl p-3.5 flex items-start gap-3">
              <div className="w-7 h-7 rounded-xl bg-[#95E18D] text-[#0B1B8C] font-mono-num font-bold text-xs flex items-center justify-center shrink-0 border border-[#0B1B8C]">
                2
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="text-[#0B1B8C]">Aksesibilitas Tanpa Sekat (PWA):</strong> Memastikan seluruh materi dan kuis dapat diakses secara luring maupun daring melalui gawai HP maupun laptop tanpa perlu mengunduh file berat dari toko aplikasi.
              </div>
            </div>

            <div className="bg-white border-2 border-[#0B1B8C] rounded-2xl p-3.5 flex items-start gap-3">
              <div className="w-7 h-7 rounded-xl bg-[#F95716] text-white font-mono-num font-bold text-xs flex items-center justify-center shrink-0 border border-[#0B1B8C]">
                3
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="text-[#0B1B8C]">Optimalisasi Papan Interaktif Digital & Canva AI:</strong> Memberikan panduan praktis siap pakai bagi guru untuk mendayagunakan perangkat layar sentuh kelas dan teknologi kecerdasan buatan.
              </div>
            </div>

            <div className="bg-white border-2 border-[#0B1B8C] rounded-2xl p-3.5 flex items-start gap-3">
              <div className="w-7 h-7 rounded-xl bg-[#C6F63D] text-[#0B1B8C] font-mono-num font-bold text-xs flex items-center justify-center shrink-0 border border-[#0B1B8C]">
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
