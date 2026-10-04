import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { CheckCircle2, Download, Loader2, Lock, ShieldCheck, Sparkles } from 'lucide-react';
import { UserProfile, syncToGoogleSheet } from '../services/gasApi';
import logoTutWuri from '../assets/images/tut_wuri_handayani_logo_1791129005206.jpg';

interface CertificateViewProps {
  user: UserProfile;
  completedLessonsCount: number;
  totalLessons: number;
  moduleScores: Record<number, number>; // { 1: 100, 2: 80, 3: 100 }
  averageScore: number;
  allModulesPassed: boolean;
  onNavigateQuiz: (moduleId?: number) => void;
  onNavigateLearn: () => void;
  onSyncNotify: (msg: string) => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  user,
  completedLessonsCount,
  totalLessons,
  moduleScores,
  averageScore,
  allModulesPassed,
  onNavigateQuiz,
  onNavigateLearn,
  onSyncNotify,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [customDate, setCustomDate] = useState(() => {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date());
  });

  const predicate =
    averageScore >= 90
      ? 'SANGAT MEMUASKAN (ISTIMEWA)'
      : averageScore >= 80
      ? 'MEMUASKAN (KOMPETEN)'
      : 'BELUM LULUS';

  const certId = 'WORKSHOP-DIGITALISASI/ASEMBAGUS/X/2026';
  const qrVerificationData = encodeURIComponent(
    `https://rumah.pendidikan.go.id/verify?cert=${certId}&name=${user.name}&score=${averageScore}&instansi=${user.instansi}`
  );
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&margin=4&color=0B1B8C&bgcolor=FBF7EC&data=${qrVerificationData}`;

  const getDynamicNameSizeClass = (name: string) => {
    const len = name.trim().length;
    if (len > 36) return 'text-xl md:text-2xl';
    if (len > 26) return 'text-2xl md:text-3xl';
    return 'text-3xl md:text-4xl';
  };

  const handleDownloadPDF = async () => {
    if (!certificateRef.current || isDownloading) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2.2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#FFFDF7',
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.96);
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

      const safeName = user.name.replace(/[^a-zA-Z0-9]/g, '_');
      pdf.save(`Sertifikat_Workshop_Digitalisasi_Asembagus_${safeName}.pdf`);

      const syncRes = await syncToGoogleSheet('claimCertificate', {
        email: user.email,
        name: user.name,
        instansi: user.instansi,
        moduleScores,
        averageScore,
        passed: true,
        predicate,
        certificateNumber: certId,
      });
      onSyncNotify(syncRes.message);
    } catch (err) {
      console.error('Gagal mengunduh sertifikat PDF:', err);
      onSyncNotify('Gagal merender PDF, silakan coba kembali.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (!allModulesPassed) {
    return (
      <div className="bg-[#FBF7EC] rounded-3xl p-6 md:p-8 border-2 border-[#0B1B8C] shadow-lg">
        <div className="max-w-xl mx-auto text-center py-6">
          <div className="w-16 h-16 rounded-2xl bg-[#F95716] text-white flex items-center justify-center mx-auto mb-4 border-2 border-[#0B1B8C]">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0B1B8C]">
            Sertifikat Digital Belum Terbuka
          </h2>
          <p className="mt-2 text-sm md:text-base text-slate-700 leading-relaxed">
            Untuk mengklaim dan mengunduh Sertifikat Resmi Workshop Aksi Praktis yang Kreatif dan Inovatif Berbasis Digitalisasi (32 JP), Anda perlu menyelesaikan seluruh materi serta <strong>lulus Kuis di setiap modul (Modul 1, Modul 2, dan Modul 3) dengan nilai minimal 80%</strong>.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <div className="bg-white rounded-2xl p-3.5 border-2 border-[#0B1B8C]/15">
              <div className="text-[11px] font-bold text-slate-500">KUIS MODUL 1</div>
              <div className="text-lg font-bold font-mono-num mt-1">
                {moduleScores[1] !== undefined ? (
                  <span className={moduleScores[1] >= 80 ? 'text-[#059669]' : 'text-[#F95716]'}>
                    {moduleScores[1]}% {moduleScores[1] >= 80 ? '✓' : '(Belum Lulus)'}
                  </span>
                ) : (
                  <span className="text-slate-400">Belum Ujian</span>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-3.5 border-2 border-[#0B1B8C]/15">
              <div className="text-[11px] font-bold text-slate-500">KUIS MODUL 2</div>
              <div className="text-lg font-bold font-mono-num mt-1">
                {moduleScores[2] !== undefined ? (
                  <span className={moduleScores[2] >= 80 ? 'text-[#059669]' : 'text-[#F95716]'}>
                    {moduleScores[2]}% {moduleScores[2] >= 80 ? '✓' : '(Belum Lulus)'}
                  </span>
                ) : (
                  <span className="text-slate-400">Belum Ujian</span>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-3.5 border-2 border-[#0B1B8C]/15">
              <div className="text-[11px] font-bold text-slate-500">KUIS MODUL 3</div>
              <div className="text-lg font-bold font-mono-num mt-1">
                {moduleScores[3] !== undefined ? (
                  <span className={moduleScores[3] >= 80 ? 'text-[#059669]' : 'text-[#F95716]'}>
                    {moduleScores[3]}% {moduleScores[3] >= 80 ? '✓' : '(Belum Lulus)'}
                  </span>
                ) : (
                  <span className="text-slate-400">Belum Ujian</span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onNavigateLearn}
              className="px-5 py-3 rounded-2xl bg-white border-2 border-[#0B1B8C] text-[#0B1B8C] font-bold text-sm hover:bg-slate-50 transition cursor-pointer"
            >
              Baca Materi Modul
            </button>
            <button
              onClick={() => onNavigateQuiz(1)}
              className="px-6 py-3 rounded-2xl bg-[#C6F63D] border-2 border-[#0B1B8C] text-[#0B1B8C] font-bold text-sm hover:brightness-95 transition cursor-pointer"
            >
              Kerjakan Kuis Modul Sekarang
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Control Banner */}
      <div className="bg-[#FBF7EC] rounded-3xl p-5 md:p-6 border-2 border-[#0B1B8C] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#059669]">
            <CheckCircle2 className="w-4 h-4" />
            <span>LULUS SELURUH KUIS MODUL · RATA-RATA {averageScore}% · {predicate}</span>
          </div>
          <h2 className="font-display text-xl md:text-2xl font-bold text-[#0B1B8C] mt-1">
            Generator Sertifikat Workshop Digital (32 JP)
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-0.5">
            Workshop Aksi Praktis yang Kreatif dan Inovatif Berbasis Digitalisasi — KKKS Kec. Asembagus. Siap diunduh ke PDF Lanskap A4.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-white border-2 border-[#0B1B8C]/20 rounded-xl px-3 py-2">
            <label htmlFor="certDateInput" className="text-xs font-semibold text-slate-600 whitespace-nowrap">
              Tanggal:
            </label>
            <input
              id="certDateInput"
              type="text"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              className="text-xs font-bold text-[#0B1B8C] bg-transparent focus:outline-none w-36"
            />
          </div>

          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#C6F63D] border-2 border-[#0B1B8C] text-[#0B1B8C] font-extrabold text-sm shadow-sm hover:brightness-95 active:scale-[0.99] transition cursor-pointer disabled:opacity-60 whitespace-nowrap"
          >
            {isDownloading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Merender PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Unduh Sertifikat PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Landscape Formal Certificate Canvas Wrapper */}
      <div className="overflow-x-auto pb-4">
        <div
          ref={certificateRef}
          id="certificateCanvas"
          className="mx-auto min-w-[880px] max-w-[1040px] aspect-[1.414/1] bg-[#FFFDF7] text-[#0B1B8C] p-5 relative shadow-2xl select-none"
        >
          {/* Classic Outer Royal Blue & Gold Double Border */}
          <div className="w-full h-full border-[6px] border-[#1e40af] p-2.5 relative flex flex-col justify-between bg-gradient-to-br from-[#FFFDF7] via-[#FBF7EC] to-[#FFF9E6]">
            {/* Inner Gold Ornamental Frame */}
            <div className="w-full h-full border-[2px] border-[#D97706] p-6 md:p-8 flex flex-col justify-between relative">
              {/* Corner Gold Accents */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-[#D97706]" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-[#D97706]" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-[#D97706]" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-[#D97706]" />

              {/* Top Header: Emblem & Institution (KOP SERTIFIKAT) */}
              <div className="flex items-center justify-between border-b-2 border-[#D97706]/30 pb-4">
                <div className="flex items-center gap-3.5">
                  {/* 1. LOGO SERTIFIKAT RESMI DARI FILE UPLOAD TUT WURI HANDAYANI */}
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white border-2 border-[#D97706] p-1 flex items-center justify-center shadow-md shrink-0">
                    <img
                      src={logoTutWuri}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== '/cropped-Logo-Tut-Wuri-Handayani-PNG-Warna-1.webp') {
                          target.src = '/cropped-Logo-Tut-Wuri-Handayani-PNG-Warna-1.webp';
                        }
                      }}
                      alt="Logo Tut Wuri Handayani"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div>
                    {/* KOP BARIS 1 */}
                    <div className="text-xs font-bold tracking-wider text-[#B45309] uppercase">
                      PANITIA WORKSHOP KELOMPOK KERJA KEPALA SEKOLAH KECAMATAN ASEMBAGUS
                    </div>
                    {/* KOP BARIS 2 */}
                    <div className="font-display text-base md:text-lg font-bold text-[#1e40af] uppercase mt-0.5">
                      WORKSHOP AKSI PRAKTIS YANG KREATIF DAN INOVATIF BERBASIS DIGITALISASI
                    </div>
                  </div>
                </div>

                {/* NOMOR REGISTRASI */}
                <div className="text-right shrink-0">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">NOMOR REGISTRASI</div>
                  <div className="font-mono-num text-xs font-bold text-[#1e40af] bg-[#1e40af]/5 px-2.5 py-1 rounded border border-[#1e40af]/20 mt-0.5">
                    {certId}
                  </div>
                </div>
              </div>

              {/* Center Certificate Body */}
              <div className="text-center my-auto py-2">
                {/* JUDUL SERTIFIKAT */}
                <div className="font-display text-3xl md:text-4xl font-bold tracking-wide text-[#1e40af] uppercase">
                  SERTIFIKAT WORKSHOP
                </div>
                {/* DIBERIKAN KEPADA */}
                <div className="text-xs font-semibold tracking-widest text-[#B45309] mt-1.5 uppercase">
                  DIBERIKAN KEPADA:
                </div>

                {/* Dynamic Participant Name */}
                <div
                  className={`font-display font-bold text-[#0B1B8C] mt-2 px-6 py-1.5 border-b-2 border-[#D97706] inline-block max-w-[90%] break-words ${getDynamicNameSizeClass(
                    user.name
                  )}`}
                >
                  {user.name}
                </div>

                <div className="mt-2 text-sm font-semibold text-slate-700">
                  NIP/NUPTK: <span className="font-mono-num text-[#0B1B8C]">{user.nip || '-'}</span>
                  <span className="mx-2">·</span>
                  Instansi: <span className="font-bold text-[#1e40af]">{user.instansi}</span>
                </div>

                {/* PARAGRAF DESKRIPSI KEGIATAN */}
                <p className="mt-3.5 max-w-2xl mx-auto text-xs md:text-sm text-slate-700 leading-relaxed text-center">
                  Telah mengikuti kegiatan WORKSHOP AKSI PRAKTIS YANG KREATIF DAN INOVATIF BERBASIS DIGITALISASI di Kecamatan Asembagus secara Aktif dan menyelesaikan Modul Pelatihan serta Lulus Kuis Evaluasi per Modul dengan beban belajar setara{' '}
                  <strong className="text-[#1e40af]">32 Jam Pelajaran (JP)</strong> dengan predikat:
                </p>

                <div className="mt-3 inline-flex items-center gap-2 px-5 py-1.5 rounded-md bg-[#1e40af] text-[#FBF7EC] border border-[#D97706] text-xs font-bold tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#C6F63D]" />
                  <span>
                    PREDIKAT: {predicate} — RATA-RATA NILAI: {averageScore}%
                  </span>
                </div>
              </div>

              {/* Footer: Verification QR Code, Gold Seal, & Digital Signature */}
              <div className="grid grid-cols-3 items-end pt-3 border-t border-[#D97706]/30">
                {/* Left: QR Code Verification */}
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 bg-white p-1.5 border-2 border-[#1e40af] rounded-lg shrink-0">
                    <img
                      src={qrCodeUrl}
                      alt="QR Code Verifikasi Sertifikat"
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-[11px] text-slate-600 leading-tight">
                    <div className="font-bold text-[#1e40af] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
                      <span>Terverifikasi Digital</span>
                    </div>
                    <p className="mt-0.5">
                      Pindai QR Code untuk memeriksa keaslian data kelulusan peserta.
                    </p>
                  </div>
                </div>

                {/* Center: Gold Foil Emblem */}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#F59E0B] to-[#B45309] border-4 border-[#FEF3C7] shadow-md flex flex-col items-center justify-center text-white text-center">
                    <span className="text-[7px] font-bold tracking-tighter">KKKS ASEMBAGUS</span>
                    <span className="text-xs font-extrabold font-mono-num">32 JP</span>
                    <span className="text-[7px] tracking-widest">2026</span>
                  </div>
                </div>

                {/* Right: Pengesahan Panitia (Tanda tangan grafis telah dihilangkan) */}
                <div className="text-right">
                  <div className="text-xs text-slate-700">Diterbitkan pada {customDate}</div>
                  <div className="text-xs font-bold text-[#1e40af] mt-0.5">
                    Ketua Panitia Workshop KKKS Kec. Asembagus
                  </div>

                  {/* Ruang bersih tanda tangan / stempel resmi fisik (tanda tangan grafis ditiadakan) */}
                  <div className="h-14" />

                  <div className="text-xs font-bold text-[#0B1B8C] underline decoration-[#D97706]">
                    DIANITA SINTASARI, M.Pd
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
