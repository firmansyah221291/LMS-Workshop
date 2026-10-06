import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Cloud,
  Code2,
  Download,
  GraduationCap,
  HelpCircle,
  Home,
  IdCard,
  Lightbulb,
  Lock,
  LogOut,
  RefreshCw,
  RotateCcw,
  Sparkles,
  ThumbsUp,
  Unlock,
  UserCheck,
  WifiOff,
  Zap,
} from 'lucide-react';
import classroomScene from './assets/images/classroom_learning_scene_1791055377733.jpg';
import developerPhoto from './assets/images/achmad_firmansyah_portrait_1791055408919.jpg';
import mascotOwl from './assets/images/mascot_teacher_owl_1791045007491.jpg';
import { ALL_LESSONS, LMS_MODULES, ModuleItem, QuizQuestion } from './data/lmsContent';
import { useOnlineStatus, usePWAInstall } from './hooks/usePWAInstall';
import {
  GAS_WEB_APP_URL,
  UserProfile,
  syncToGoogleSheet,
} from './services/gasApi';
import { CertificateView } from './components/CertificateView';
import { CodeBundleModal } from './components/CodeBundleModal';
import { DeveloperInfoView } from './components/DeveloperInfoView';
import { LandingPageView } from './components/LandingPageView';

type ActiveView = 'dashboard' | 'materi' | 'kuis' | 'sertifikat' | 'pengembang' | 'kode';

const STORAGE_KEYS = {
  USER: 'edupro_pwa_user_v2',
  COMPLETED: 'edupro_pwa_completed_v2',
  MODULE_SCORES: 'edupro_pwa_mod_scores_v2',
  REFLECTIONS: 'edupro_pwa_reflections_v3',
};

const DEFAULT_DEVELOPER_PROFILE = {
  name: 'Achmad Firmansyah',
  nip: '199112222017081001',
  instansi: 'SD Negeri 2 Mojosari, Kecamatan Asembagus Kabupaten Situbondo',
  email: 'achmadfirmansyah221@guru.sd.belajar.id',
  role: 'Guru Kelas SD & Pengembang Aplikasi',
};

const DEMO_TEACHERS: Array<Omit<UserProfile, 'id' | 'loginAt'>> = [
  {
    name: 'Achmad Firmansyah, S.Pd.',
    nip: '199112222017081001',
    email: 'achmadfirmansyah221@guru.sd.belajar.id',
    instansi: 'SD Negeri 2 Mojosari, Kec. Asembagus Kab. Situbondo',
    role: 'Pengembang Aplikasi & Guru SD',
  },
];

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Module scores: { 1: 100, 2: 80, 3: 100 }
  const [moduleScores, setModuleScores] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MODULE_SCORES);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [reflections, setReflections] = useState<Record<string, string>>(() => {
    try {
      // Bersihkan cache refleksi otomatis lama dari localStorage
      const oldKeys = ['edupro_pwa_reflections_v1', 'edupro_pwa_reflections_v2', 'edupro_pwa_reflections'];
      for (const ok of oldKeys) {
        try { localStorage.removeItem(ok); } catch {}
      }

      const saved = localStorage.getItem(STORAGE_KEYS.REFLECTIONS);
      if (!saved) return {};
      const parsed = JSON.parse(saved);
      const cleaned: Record<string, string> = {};
      for (const [k, v] of Object.entries(parsed)) {
        if (typeof v === 'string') {
          const lower = v.toLowerCase();
          // Hapus jika ada teks otomatis dummy
          if (lower.includes('sangat aplikatif') || lower.startsWith('refleksi materi')) {
            cleaned[k] = '';
          } else {
            cleaned[k] = v;
          }
        }
      }
      return cleaned;
    } catch {
      return {};
    }
  });

  // Navigation State
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [selectedModuleId, setSelectedModuleId] = useState<number>(1);
  const [selectedLessonId, setSelectedLessonId] = useState<string>('m1-l1');
  const [quizActiveModuleId, setQuizActiveModuleId] = useState<number>(1);

  // Bersihkan cache foto lama agar seluruh user (terdaftar maupun belum) mendapatkan foto resmi terbaru
  useEffect(() => {
    try {
      localStorage.removeItem('edupro_developer_photo_original');
      localStorage.removeItem('edupro_developer_photo');
      localStorage.removeItem('edupro_developer_custom_photo');
    } catch {}
  }, []);

  // Per-Module Quiz Answers: { questionId: selectedIndex }
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmittedForModule, setQuizSubmittedForModule] = useState<number | null>(null);

  // Validation & Notice State
  const [reflectionError, setReflectionError] = useState<string | null>(null);
  const [lockedNotice, setLockedNotice] = useState<string | null>(null);

  // Appreciation Banner
  const [goodJobBanner, setGoodJobBanner] = useState<{
    lessonTitle: string;
    moduleId: number;
    nextLessonId: string | null;
  } | null>(null);

  const [syncMessage, setSyncMessage] = useState<string>('Terhubung ke Google Sheets Database');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Login Form
  const [loginName, setLoginName] = useState('Achmad Firmansyah, S.Pd.');
  const [loginNip, setLoginNip] = useState('199112222017081001');
  const [loginEmail, setLoginEmail] = useState('achmadfirmansyah221@guru.sd.belajar.id');
  const [loginInstansi, setLoginInstansi] = useState('SD Negeri 2 Mojosari, Kecamatan Asembagus Kabupaten Situbondo');
  const [loginPin, setLoginPin] = useState('2026');
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  // PWA & Online status
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const isOnline = useOnlineStatus();
  const [showInstallModal, setShowInstallModal] = useState(false);

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEYS.USER);
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MODULE_SCORES, JSON.stringify(moduleScores));
  }, [moduleScores]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REFLECTIONS, JSON.stringify(reflections));
  }, [reflections]);

  // ----------------------------------------------------------------------------
  // ATURAN PENGATURAN MATERI MODUL & KUIS
  // 1. Peserta wajib membaca materi DAN mengisi Refleksi Guru sebelum materi
  //    selanjutnya dapat dibuka.
  // 2. Kuis tiap modul hanya terbuka jika seluruh materi 1 s.d. 10 selesai tuntas.
  // ----------------------------------------------------------------------------

  const isLessonReflectionFilled = (lessonId: string): boolean => {
    const text = reflections[lessonId];
    if (!text) return false;
    const trimmed = text.trim();
    if (
      trimmed.toLowerCase().includes('sangat aplikatif') ||
      trimmed.toLowerCase().startsWith('refleksi materi')
    ) {
      return false;
    }
    return trimmed.length > 0;
  };

  const isLessonFinished = (lessonId: string): boolean => {
    return isLessonReflectionFilled(lessonId);
  };

  const isLessonUnlocked = (_globalIndex: number): boolean => {
    // Seluruh materi modul terbuka bebas agar peserta dapat belajar secara fleksibel
    return true;
  };

  const getModuleFinishedCount = (moduleId: number): number => {
    const mod = LMS_MODULES.find((m) => m.id === moduleId);
    if (!mod) return 0;
    return mod.lessons.filter((l) => isLessonReflectionFilled(l.id)).length;
  };

  const isModuleQuizUnlocked = (moduleId: number): boolean => {
    const mod = LMS_MODULES.find((m) => m.id === moduleId);
    if (!mod) return false;
    // Kuis modul terbuka jika seluruh materi di modul ini (10 materi) telah dijawab refleksinya
    return mod.lessons.every((l) => isLessonReflectionFilled(l.id));
  };

  const currentModule = useMemo(
    () => LMS_MODULES.find((m) => m.id === selectedModuleId) || LMS_MODULES[0],
    [selectedModuleId]
  );

  const currentLesson = useMemo(
    () => ALL_LESSONS.find((l) => l.id === selectedLessonId) || ALL_LESSONS[0],
    [selectedLessonId]
  );

  const quizModule = useMemo(
    () => LMS_MODULES.find((m) => m.id === quizActiveModuleId) || LMS_MODULES[0],
    [quizActiveModuleId]
  );

  const totalFinishedLessons = useMemo(() => {
    return ALL_LESSONS.filter((l) => isLessonFinished(l.id)).length;
  }, [completedLessons, reflections]);

  const nextUnlockedLesson = useMemo(() => {
    for (const l of ALL_LESSONS) {
      if (!isLessonFinished(l.id)) return l;
    }
    return ALL_LESSONS[ALL_LESSONS.length - 1];
  }, [completedLessons, reflections]);

  const progressPercentage = Math.round((totalFinishedLessons / ALL_LESSONS.length) * 100);

  // Check if all modules have passed score (>= 80%)
  const allModulesPassed = useMemo(() => {
    return LMS_MODULES.every((mod) => (moduleScores[mod.id] ?? 0) >= 80);
  }, [moduleScores]);

  const averageScore = useMemo(() => {
    const scores = LMS_MODULES.map((m) => moduleScores[m.id] ?? 0);
    const sum = scores.reduce((a, b) => a + b, 0);
    return Math.round(sum / (LMS_MODULES.length || 1));
  }, [moduleScores]);

  // Handlers
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginName.trim() || !loginEmail.trim() || !loginInstansi.trim()) return;

    const newUser: UserProfile = {
      id: `BIMTEK-${Date.now().toString(36).toUpperCase()}`,
      name: loginName.trim(),
      nip: loginNip.trim() || '-',
      email: loginEmail.trim(),
      instansi: loginInstansi.trim(),
      role: 'Guru SD / Tenaga Kependidikan',
      loginAt: new Date().toISOString(),
    };

    setUser(newUser);
    setShowLoginModal(false);
    setActiveView('dashboard');
    setIsSyncing(true);
    setSyncMessage('Menyinkronkan profil peserta Bimtek ke Google Sheets...');

    const res = await syncToGoogleSheet('login', {
      id: newUser.id,
      name: newUser.name,
      nip: newUser.nip,
      email: newUser.email,
      instansi: newUser.instansi,
      role: newUser.role,
    });

    setIsSyncing(false);
    setSyncMessage(res.message);
  };

  const handleCompleteLesson = async (lessonId: string) => {
    const lessonObj = ALL_LESSONS.find((l) => l.id === lessonId);
    if (!lessonObj) return;

    // VALIDASI REFLEKSI GURU
    const currentRefl = (reflections[lessonId] || '').trim();
    if (!currentRefl) {
      setReflectionError(
        '⚠️ Refleksi Guru wajib diisi! Mohon tuliskan catatan refleksi pembelajaran Anda pada kolom di bawah terlebih dahulu untuk menuntaskan materi ini dan memenuhi syarat pembuka kuis modul.'
      );
      const reflEl = document.getElementById('teacher-reflection-input');
      if (reflEl) {
        reflEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        reflEl.focus();
      }
      return;
    }

    setReflectionError(null);

    const updated = completedLessons.includes(lessonId)
      ? completedLessons
      : [...completedLessons, lessonId];

    setCompletedLessons(updated);

    const nextLesson = ALL_LESSONS[lessonObj.globalIndex + 1] || null;
    setGoodJobBanner({
      lessonTitle: lessonObj.title,
      moduleId: lessonObj.moduleId,
      nextLessonId: nextLesson ? nextLesson.id : null,
    });

    if (user) {
      setIsSyncing(true);
      const res = await syncToGoogleSheet('saveProgress', {
        email: user.email,
        name: user.name,
        lessonId,
        lessonTitle: lessonObj.title,
        reflection: currentRefl,
        completedCount: updated.length,
        percentage: Math.round((updated.length / ALL_LESSONS.length) * 100),
      });
      setIsSyncing(false);
      setSyncMessage(res.message);
    }
  };

  const handleGoToLesson = (lessonId: string) => {
    const target = ALL_LESSONS.find((l) => l.id === lessonId);
    if (!target) return;
    if (!isLessonUnlocked(target.globalIndex)) {
      setLockedNotice(
        `Materi #${target.lessonNumber} (${target.title}) masih terkunci! Anda wajib menyelesaikan materi sebelumnya dan mengisi Refleksi Guru terlebih dahulu.`
      );
      setTimeout(() => setLockedNotice(null), 5000);
      return;
    }

    setSelectedModuleId(target.moduleId);
    setSelectedLessonId(target.id);
    setReflectionError(null);
    setGoodJobBanner(null);
    setActiveView('materi');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetProgress = () => {
    if (
      window.confirm(
        'Apakah Anda ingin mereset seluruh progres membaca, refleksi guru, dan nilai kuis untuk mengulang proses belajar dari awal?'
      )
    ) {
      setCompletedLessons([]);
      setReflections({});
      setModuleScores({});
      setQuizAnswers({});
      setQuizSubmittedForModule(null);
      setGoodJobBanner(null);
      setReflectionError(null);
      setSelectedModuleId(1);
      setSelectedLessonId('m1-l1');
      setSyncMessage('Progres telah direset. Materi dimulai dari Modul 1 Materi #1.');
    }
  };

  // Submit Per-Module Quiz
  const handleSubmitModuleQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isModuleQuizUnlocked(quizActiveModuleId)) {
      alert(`Kuis Modul ${quizActiveModuleId} belum dapat dikerjakan karena 10 materi belum diselesaikan.`);
      return;
    }

    const questions = quizModule.quiz;
    let correct = 0;
    questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) correct++;
    });

    const calculatedScore = Math.round((correct / questions.length) * 100);
    const updatedScores = {
      ...moduleScores,
      [quizActiveModuleId]: calculatedScore,
    };
    setModuleScores(updatedScores);
    setQuizSubmittedForModule(quizActiveModuleId);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (user) {
      setIsSyncing(true);
      const passed = calculatedScore >= 80;
      const res = await syncToGoogleSheet('submitModuleQuiz', {
        email: user.email,
        name: user.name,
        instansi: user.instansi,
        moduleId: quizActiveModuleId,
        moduleCode: quizModule.code,
        score: calculatedScore,
        passed,
      });
      setIsSyncing(false);
      setSyncMessage(res.message);
    }
  };

  const handleResetModuleQuiz = () => {
    const cleared = { ...quizAnswers };
    quizModule.quiz.forEach((q) => delete cleared[q.id]);
    setQuizAnswers(cleared);
    setQuizSubmittedForModule(null);
  };

  const handleQuickFillPassingQuiz = () => {
    const filled = { ...quizAnswers };
    quizModule.quiz.forEach((q) => {
      filled[q.id] = q.correctIndex;
    });
    setQuizAnswers(filled);
  };

  const handleTriggerInstall = async () => {
    if (isInstallable) await install();
    else setShowInstallModal(true);
  };

  // Komponen Mobile Bottom Navigation Bar (Home / Beranda, Buku / Modul & Kuis, Lampu / Sertifikat)
  const renderMobileBottomBar = () => (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDF7]/95 backdrop-blur-md border-t-2 border-[#0B1B8C] px-3 py-2 shadow-[0_-4px_20px_rgba(11,27,140,0.18)]">
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        {/* 1. Tombol Icon Home (Beranda) */}
        <button
          type="button"
          onClick={() => {
            if (user) {
              setActiveView('dashboard');
            } else {
              setActiveView('dashboard');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition cursor-pointer ${
            (!user && activeView !== 'pengembang') || (user && activeView === 'dashboard')
              ? 'bg-[#C6F63D] text-[#0B1B8C] font-extrabold border-2 border-[#0B1B8C] shadow-sm'
              : 'text-slate-600 hover:text-[#0B1B8C]'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] font-bold">Beranda</span>
        </button>

        {/* 2. Tombol Icon Buku (Modul & Kuis) */}
        <button
          type="button"
          onClick={() => {
            if (!user) {
              setShowLoginModal(true);
            } else {
              setActiveView('materi');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition cursor-pointer ${
            user && (activeView === 'materi' || activeView === 'kuis')
              ? 'bg-[#C6F63D] text-[#0B1B8C] font-extrabold border-2 border-[#0B1B8C] shadow-sm'
              : 'text-slate-600 hover:text-[#0B1B8C]'
          }`}
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] font-bold">Modul & Kuis</span>
        </button>

        {/* 3. Tombol Icon Lampu (Sertifikat) */}
        <button
          type="button"
          onClick={() => {
            if (!user) {
              setShowLoginModal(true);
            } else {
              setActiveView('sertifikat');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition cursor-pointer ${
            user && activeView === 'sertifikat'
              ? 'bg-[#C6F63D] text-[#0B1B8C] font-extrabold border-2 border-[#0B1B8C] shadow-sm'
              : 'text-slate-600 hover:text-[#0B1B8C]'
          }`}
        >
          <Lightbulb className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] font-bold">Sertifikat</span>
        </button>
      </div>
    </nav>
  );

  // ============================================================================
  // LANDING PAGE SCREEN UNTUK PENGUNJUNG SEBELUM MASUK / LOGIN
  // ============================================================================
  if (!user) {
    return (
      <div className="min-h-screen bg-[#5B6CFA] text-[#0B1B8C] px-4 sm:px-8 py-6 pb-24 md:pb-6 flex flex-col justify-between">
        {/* Navigation Bar for Landing Page */}
        <header className="max-w-6xl w-full mx-auto bg-[#C6F63D] border-2 border-[#0B1B8C] rounded-2xl px-5 py-3.5 shadow-md flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="font-display text-2xl font-bold tracking-tight text-[#0B1B8C]">
              EduPro PWA
            </div>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-lg bg-[#0B1B8C] text-[#C6F63D] font-mono-num text-[11px] font-bold">
              BIMTEK SD 2026
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('pengembang')}
              className="px-4 py-2 rounded-xl bg-white border border-[#0B1B8C] text-[#0B1B8C] text-xs font-extrabold hover:bg-slate-50 transition cursor-pointer"
            >
              Info Pengembang
            </button>
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-5 py-2 rounded-xl bg-[#0B1B8C] text-[#C6F63D] font-extrabold text-xs hover:bg-[#1e40af] transition cursor-pointer shadow-sm"
            >
              Masuk Ruang Belajar
            </button>
          </div>
        </header>

        {/* Content based on active view before login */}
        <div className="max-w-6xl w-full mx-auto my-auto">
          {activeView === 'pengembang' ? (
            <div className="space-y-6">
              <button
                onClick={() => setActiveView('dashboard')}
                className="px-4 py-2 rounded-xl bg-white border-2 border-[#0B1B8C] text-[#0B1B8C] font-bold text-xs hover:bg-[#C6F63D] transition cursor-pointer flex items-center gap-1.5"
              >
                <span>&larr; Kembali ke Beranda Landing Page</span>
              </button>
              <DeveloperInfoView onNavigateLearn={() => setShowLoginModal(true)} />
            </div>
          ) : (
            <LandingPageView
              onStartLearning={() => setShowLoginModal(true)}
              onOpenDeveloper={() => setActiveView('pengembang')}
              isInstallable={isInstallable}
              onInstall={handleTriggerInstall}
            />
          )}
        </div>

        {/* Login Modal Overlay */}
        {showLoginModal && (
          <div className="fixed inset-0 z-50 bg-[#0B1B8C]/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#6C7CFF] border-3 border-[#0B1B8C] rounded-[32px] p-6 sm:p-8 shadow-2xl max-w-lg w-full text-white relative">
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 text-white font-bold flex items-center justify-center hover:bg-white/30"
              >
                ✕
              </button>

              <div className="text-center mb-5">
                <div className="inline-flex items-center gap-2 bg-[#C6F63D] text-[#0B1B8C] px-3 py-1 rounded-xl text-xs font-extrabold mb-1">
                  <UserCheck className="w-3.5 h-3.5 text-[#F95716]" />
                  <span>IDENTITAS PESERTA BIMTEK</span>
                </div>
                <div className="font-display text-2xl font-bold text-[#C6F63D]">
                  Masuk Ruang Belajar
                </div>
                <p className="text-xs text-white/90 mt-0.5">
                  Isi nama dan instansi Anda untuk sertifikat digital resmi 32 JP
                </p>
              </div>

              {/* Profil Cepat Pengembang / Guru (Hanya Profil 1) */}
              <div className="mb-4">
                <div className="text-[11px] font-bold text-white/90 mb-2">
                  PILIH CONTOH PROFIL CEPAT (DEMO):
                </div>
                {DEMO_TEACHERS.map((t) => (
                  <button
                    key={t.email}
                    type="button"
                    onClick={() => {
                      setLoginName(t.name);
                      setLoginNip(t.nip);
                      setLoginEmail(t.email);
                      setLoginInstansi(t.instansi);
                    }}
                    className="w-full bg-[#FBF7EC] hover:bg-[#C6F63D] border-2 border-[#0B1B8C] rounded-2xl p-2.5 text-left transition cursor-pointer flex items-center justify-between gap-3 shadow-sm"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-[#0B1B8C] text-[#C6F63D] flex items-center justify-center font-bold text-xs shrink-0">
                        1
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold text-[#F95716] uppercase">Profil 1 · Pengembang Aplikasi</div>
                        <div className="text-xs font-extrabold text-[#0B1B8C] truncate">
                          {t.name}
                        </div>
                        <div className="text-[10px] text-slate-600 truncate">
                          {t.instansi}
                        </div>
                      </div>
                    </div>
                    <div className="text-[11px] font-extrabold text-[#0B1B8C] bg-[#C6F63D] px-2.5 py-1 rounded-lg border border-[#0B1B8C] shrink-0">
                      Gunakan
                    </div>
                  </button>
                ))}
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Nama Lengkap & Gelar
                  </label>
                  <input
                    type="text"
                    required
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#7B8BFF] border-2 border-[#0B1B8C] text-white font-semibold text-sm focus:bg-[#FBF7EC] focus:text-[#0B1B8C] focus:outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-bold text-white mb-1">NIP / NUPTK</label>
                    <input
                      type="text"
                      value={loginNip}
                      onChange={(e) => setLoginNip(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#7B8BFF] border-2 border-[#0B1B8C] text-white font-mono-num text-sm focus:bg-[#FBF7EC] focus:text-[#0B1B8C] focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white mb-1">Email Belajar.id</label>
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#7B8BFF] border-2 border-[#0B1B8C] text-white text-sm focus:bg-[#FBF7EC] focus:text-[#0B1B8C] focus:outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1">Satuan Pendidikan / SD</label>
                  <input
                    type="text"
                    required
                    value={loginInstansi}
                    onChange={(e) => setLoginInstansi(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#7B8BFF] border-2 border-[#0B1B8C] text-white text-sm focus:bg-[#FBF7EC] focus:text-[#0B1B8C] focus:outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#C6F63D] border-2 border-[#0B1B8C] text-[#0B1B8C] font-extrabold text-sm hover:brightness-105 active:scale-[0.99] transition cursor-pointer shadow-lg mt-2 flex items-center justify-center gap-2"
                >
                  <span>Mulai Pelatihan Sekarang</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Footer Landing Page */}
        <footer className="max-w-6xl w-full mx-auto pt-6 text-center text-xs text-white/80 border-t border-white/20 mt-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Bimtek Daerah Digitalisasi Pembelajaran SD Tahun 2026 · PWA Standalone
          </div>
          <button
            onClick={() => setActiveView('pengembang')}
            className="hover:text-[#C6F63D] underline cursor-pointer"
          >
            Pengembang: Achmad Firmansyah (SDN 2 Mojosari)
          </button>
        </footer>

        {/* Mobile Bottom Navigation Bar pada Landing Page */}
        {renderMobileBottomBar()}
      </div>
    );
  }

  // ============================================================================
  // AUTHENTICATED APP SHELL
  // ============================================================================
  return (
    <div className="min-h-screen bg-[#5B6CFA] text-[#0B1B8C] pb-24 md:pb-12">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#C6F63D] border-b-2 border-[#0B1B8C] rounded-b-[28px] shadow-md px-4 sm:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <a
            href="#beranda"
            onClick={(e) => {
              e.preventDefault();
              setActiveView('dashboard');
            }}
            className="font-display text-2xl font-bold tracking-tight text-[#0B1B8C] whitespace-nowrap shrink-0"
          >
            EduPro PWA
          </a>

          <nav className="hidden md:flex items-center gap-5 text-sm font-bold text-[#0B1B8C]">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`py-1 transition cursor-pointer whitespace-nowrap ${
                activeView === 'dashboard'
                  ? 'underline decoration-2 underline-offset-4 text-[#F95716]'
                  : 'opacity-75 hover:opacity-100'
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => setActiveView('materi')}
              className={`py-1 transition cursor-pointer whitespace-nowrap ${
                activeView === 'materi'
                  ? 'underline decoration-2 underline-offset-4 text-[#F95716]'
                  : 'opacity-75 hover:opacity-100'
              }`}
            >
              Ruang Belajar (4 Modul)
            </button>
            <button
              onClick={() => setActiveView('kuis')}
              className={`py-1 transition cursor-pointer whitespace-nowrap ${
                activeView === 'kuis'
                  ? 'underline decoration-2 underline-offset-4 text-[#F95716]'
                  : 'opacity-75 hover:opacity-100'
              }`}
            >
              Kuis per Modul
            </button>
            <button
              onClick={() => setActiveView('sertifikat')}
              className={`py-1 transition cursor-pointer whitespace-nowrap ${
                activeView === 'sertifikat'
                  ? 'underline decoration-2 underline-offset-4 text-[#F95716]'
                  : 'opacity-75 hover:opacity-100'
              }`}
            >
              Sertifikat Digital
            </button>
            <button
              onClick={() => setActiveView('pengembang')}
              className={`py-1 transition cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                activeView === 'pengembang'
                  ? 'underline decoration-2 underline-offset-4 text-[#F95716]'
                  : 'opacity-75 hover:opacity-100'
              }`}
            >
              <IdCard className="w-4 h-4 text-[#F95716]" />
              <span>Info Pengembang</span>
            </button>
            <button
              onClick={() => setActiveView('kode')}
              className={`py-1 transition cursor-pointer whitespace-nowrap ${
                activeView === 'kode'
                  ? 'underline decoration-2 underline-offset-4 text-[#F95716]'
                  : 'opacity-75 hover:opacity-100'
              }`}
            >
              Kode & .gs
            </button>
          </nav>

          <div className="flex items-center gap-2.5">
            {!isInstalled && (
              <button
                onClick={handleTriggerInstall}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B1B8C] text-[#C6F63D] text-xs font-bold hover:bg-[#1e40af] transition cursor-pointer whitespace-nowrap shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install</span>
              </button>
            )}
            <button
              onClick={() => setUser(null)}
              title="Keluar"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FBF7EC] border-2 border-[#0B1B8C] text-[#0B1B8C] text-xs font-bold hover:bg-white transition cursor-pointer whitespace-nowrap shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {!isOnline && (
        <div className="max-w-6xl mx-auto px-4 mt-3">
          <div className="bg-[#F95716] text-white border-2 border-[#0B1B8C] rounded-2xl px-4 py-2.5 text-xs font-bold flex items-center gap-2">
            <WifiOff className="w-4 h-4 shrink-0" />
            <span>Mode Offline PWA Aktif — Seluruh materi dan kuis tersimpan di memori perangkat.</span>
          </div>
        </div>
      )}

      {/* Floating Locked Notice Toast */}
      {lockedNotice && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-lg w-[90%] bg-[#F95716] text-white border-3 border-[#0B1B8C] rounded-2xl p-4 shadow-2xl flex items-center gap-3 animate-bounce">
          <Lock className="w-6 h-6 shrink-0 text-[#C6F63D]" />
          <div className="text-xs sm:text-sm font-bold flex-1">{lockedNotice}</div>
          <button
            onClick={() => setLockedNotice(null)}
            className="text-xs font-extrabold px-2 py-1 bg-white/20 rounded-lg hover:bg-white/30"
          >
            ✕
          </button>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-6 space-y-6">
        {/* Good Job Appreciation Popup Banner */}
        {goodJobBanner && (
          <div className="bg-[#C6F63D] border-3 border-[#0B1B8C] rounded-3xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#F95716] text-white border-2 border-[#0B1B8C] flex items-center justify-center shrink-0">
                <ThumbsUp className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-extrabold tracking-wider text-[#0B1B8C]">
                  APRESIASI KETUNTASAN MATERI & REFLEKSI GURU
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0B1B8C]">
                  Good Job! Luar Biasa, {user.name.split(',')[0]}!
                </h3>
                <p className="text-xs sm:text-sm text-[#0B1B8C]/90 mt-0.5">
                  Anda telah membaca <strong>"{goodJobBanner.lessonTitle}"</strong> dan mengisi Refleksi Guru. Materi berikutnya kini telah terbuka!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 flex-wrap">
              {isModuleQuizUnlocked(goodJobBanner.moduleId) ? (
                <button
                  onClick={() => {
                    setQuizActiveModuleId(goodJobBanner.moduleId);
                    setGoodJobBanner(null);
                    setActiveView('kuis');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#F95716] text-white font-bold text-xs flex items-center gap-1.5 hover:brightness-110 transition cursor-pointer whitespace-nowrap shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-[#C6F63D]" />
                  <span>Kuis Modul {goodJobBanner.moduleId} Terbuka!</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : null}

              {goodJobBanner.nextLessonId ? (
                <button
                  onClick={() => handleGoToLesson(goodJobBanner.nextLessonId!)}
                  className="px-4 py-2.5 rounded-xl bg-[#0B1B8C] text-[#C6F63D] font-bold text-xs flex items-center gap-1.5 hover:bg-[#1e40af] transition cursor-pointer whitespace-nowrap"
                >
                  <span>Materi Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : null}

              <button
                onClick={() => setGoodJobBanner(null)}
                className="px-3 py-2.5 rounded-xl bg-white/70 border border-[#0B1B8C] text-[#0B1B8C] font-bold text-xs cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 1: BERANDA / DASHBOARD (DENGAN GAMBAR SUASANA KELAS)
           =================================================================== */}
        {activeView === 'dashboard' && (
          <div className="space-y-6">
            {/* Moving Marquee Ticker */}
            <div className="overflow-hidden bg-[#0B1B8C] border-2 border-[#C6F63D] rounded-2xl py-2 text-white font-mono-num text-xs font-bold shadow-md">
              <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
                <span className="flex items-center gap-2 text-[#C6F63D]">
                  <Sparkles className="w-4 h-4 text-[#F95716]" />
                  BIMTEK DIGITALISASI PEMBELAJARAN SD 2026
                </span>
                <span className="text-white/60">•</span>
                <span className="text-white">
                  PENGEMBANG: ACHMAD FIRMANSYAH (SDN 2 MOJOSARI SITUBONDO)
                </span>
                <span className="text-white/60">•</span>
                <span className="text-[#C6F63D]">
                  WAJIB ISI REFLEKSI GURU UNTUK MEMBUKA MATERI SELANJUTNYA
                </span>
                <span className="text-white/60">•</span>
                <span className="text-[#F95716]">
                  KUIS TERBUKA SETELAH 10 MATERI PER MODUL TUNTAS DIKERJAKAN
                </span>
              </div>
            </div>

            {/* Hero Profile & Progress Section + GAMBAR SUASANA KELAS */}
            <div className="bg-[#FBF7EC] border-3 border-[#0B1B8C] rounded-[36px] p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0B1B8C] text-[#C6F63D] text-xs font-extrabold tracking-wide">
                    <span>PESERTA BIMTEK AKTIF</span>
                    <span>•</span>
                    <span className="font-mono-num">{user.role}</span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#0B1B8C] leading-tight">
                    Selamat Belajar, {user.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-700 font-medium">
                    {user.instansi} · NIP: <span className="font-mono-num">{user.nip}</span>
                  </p>

                  {/* Rules Information Card */}
                  <div className="bg-[#FAF3E0] border-2 border-[#0B1B8C] rounded-2xl p-3.5 text-xs text-[#0B1B8C] space-y-1">
                    <div className="font-extrabold flex items-center gap-1.5 text-[#F95716]">
                      <AlertCircle className="w-4 h-4" />
                      <span>ATURAN PROGRES BELAJAR:</span>
                    </div>
                    <ul className="list-disc pl-5 space-y-0.5 text-slate-700">
                      <li>
                        <strong>Refleksi Guru:</strong> Wajib diisi agar materi berikutnya dapat dibuka.
                      </li>
                      <li>
                        <strong>Kuis Modul:</strong> Wajib menyelesaikan materi 1 s.d. 10 secara utuh sebelum dapat mengakses kuis.
                      </li>
                      <li>
                        <strong>Sertifikat:</strong> Lulus kuis di 4 modul (skor minimal 80%).
                      </li>
                    </ul>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedModuleId(1);
                        setSelectedLessonId(nextUnlockedLesson.id);
                        setActiveView('materi');
                      }}
                      className="px-5 py-2.5 rounded-2xl bg-[#0B1B8C] text-[#C6F63D] font-extrabold text-xs sm:text-sm flex items-center gap-2 hover:bg-[#1e40af] transition cursor-pointer shadow-md"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Lanjut ke Materi Terbuka</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setActiveView('pengembang')}
                      className="px-4 py-2.5 rounded-2xl bg-white border-2 border-[#0B1B8C] text-[#0B1B8C] font-extrabold text-xs sm:text-sm flex items-center gap-2 hover:bg-[#C6F63D] transition cursor-pointer shadow-md"
                    >
                      <IdCard className="w-4 h-4 text-[#F95716]" />
                      <span>Info Pengembang</span>
                    </button>

                    <button
                      onClick={handleResetProgress}
                      className="px-3.5 py-2 rounded-xl bg-white/70 border border-slate-400 text-slate-700 text-xs font-bold hover:bg-red-50 hover:text-red-700 transition cursor-pointer whitespace-nowrap flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset Progres</span>
                    </button>
                  </div>
                </div>

                {/* Right: GAMBAR SUASANA BELAJAR DI KELAS + PROGRESS BAR */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  {/* GAMBAR SUASANA KELAS DI BERANDA */}
                  <div className="rounded-3xl overflow-hidden border-3 border-[#0B1B8C] shadow-lg relative group">
                    <img
                      src={classroomScene}
                      alt="Suasana Belajar Digital di Kelas Sekolah Dasar"
                      referrerPolicy="no-referrer"
                      className="w-full h-48 sm:h-52 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0B1B8C]/90 to-transparent p-3 text-white">
                      <div className="text-[11px] font-bold text-[#C6F63D] flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Suasana Kelas Digital Interaktif SD</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Indicator Card */}
                  <div className="bg-white border-2 border-[#0B1B8C] rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                      <span>PROGRES KETUNTASAN</span>
                      <span className="font-mono-num font-extrabold text-[#0B1B8C] text-sm">
                        {totalFinishedLessons} / {ALL_LESSONS.length} Materi ({progressPercentage}%)
                      </span>
                    </div>
                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden border border-[#0B1B8C]">
                      <div
                        className="h-full bg-[#C6F63D] transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bento Cards for 4 Modul */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {LMS_MODULES.map((mod) => {
                  const modFinishedCount = getModuleFinishedCount(mod.id);
                  const score = moduleScores[mod.id];
                  const quizUnlocked = isModuleQuizUnlocked(mod.id);
                  const bgClass =
                    mod.accentColor === 'blue'
                      ? 'bg-[#5B6CFA] text-white'
                      : mod.accentColor === 'orange'
                      ? 'bg-[#F95716] text-white'
                      : mod.accentColor === 'lime'
                      ? 'bg-[#C6F63D] text-[#0B1B8C]'
                      : 'bg-[#95E18D] text-[#0B1B8C]';

                  return (
                    <div
                      key={mod.id}
                      className={`${bgClass} border-2 border-[#0B1B8C] rounded-3xl p-5 flex flex-col justify-between shadow-md`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono-num font-bold opacity-90">
                          <span>{mod.code} · {modFinishedCount}/10 MATERI</span>
                          <span>
                            {score !== undefined ? `Kuis: ${score}%` : 'Kuis: -'}
                          </span>
                        </div>
                        <h3 className="font-display text-xl font-bold mt-1.5 leading-snug">
                          {mod.title}
                        </h3>
                        <p className="text-xs mt-2 opacity-90 leading-relaxed">
                          {mod.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-current/20 flex items-center justify-between gap-2">
                        <button
                          onClick={() => {
                            setSelectedModuleId(mod.id);
                            const target =
                              mod.lessons.find((l) => !isLessonFinished(l.id)) || mod.lessons[0];
                            setSelectedLessonId(target.id);
                            setActiveView('materi');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-white text-[#0B1B8C] border border-[#0B1B8C] text-xs font-extrabold hover:bg-slate-50 transition cursor-pointer"
                        >
                          Baca 10 Materi
                        </button>

                        <button
                          onClick={() => {
                            setQuizActiveModuleId(mod.id);
                            setActiveView('kuis');
                          }}
                          className={`px-3 py-1.5 rounded-xl border border-[#0B1B8C] text-xs font-extrabold transition cursor-pointer flex items-center gap-1 ${
                            quizUnlocked
                              ? 'bg-[#0B1B8C] text-[#C6F63D] hover:bg-[#1e40af]'
                              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                          }`}
                        >
                          {quizUnlocked ? (
                            <>
                              <span>Kuis Modul {mod.id}</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </>
                          ) : (
                            <>
                              <Lock className="w-3 h-3 text-[#F95716]" />
                              <span>Kuis ({modFinishedCount}/10)</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Status Kuis Per Modul */}
            <div className="bg-[#6C7CFF] border-2 border-[#0B1B8C] rounded-3xl p-5 text-white space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold">Status Evaluasi Kuis per Modul</h3>
                  <p className="text-xs text-white/80">Ambang kelulusan tiap modul adalah 80% (Kuis baru terbuka setelah 10 materi selesai)</p>
                </div>
                {allModulesPassed ? (
                  <span className="px-3 py-1.5 rounded-xl bg-[#C6F63D] text-[#0B1B8C] text-xs font-extrabold">
                    SELURUH KUIS LULUS!
                  </span>
                ) : (
                  <span className="px-3 py-1.5 rounded-xl bg-[#F95716] text-white text-xs font-bold">
                    Perlu Kelulusan di 4 Modul
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {LMS_MODULES.map((mod) => {
                  const score = moduleScores[mod.id];
                  const passed = (score ?? 0) >= 80;
                  const quizUnlocked = isModuleQuizUnlocked(mod.id);
                  const countFinished = getModuleFinishedCount(mod.id);

                  return (
                    <div
                      key={mod.id}
                      className="bg-[#FBF7EC] text-[#0B1B8C] border-2 border-[#0B1B8C] rounded-2xl p-4 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-[11px] font-bold text-slate-500">{mod.code}</div>
                        <div className="font-bold text-sm truncate max-w-[150px]">{mod.title}</div>
                        <div className="font-mono-num text-xs mt-1">
                          {score !== undefined ? (
                            <span className={passed ? 'text-[#059669] font-bold' : 'text-[#F95716] font-bold'}>
                              Skor: {score}% ({passed ? 'Lulus' : 'Ulangi'})
                            </span>
                          ) : quizUnlocked ? (
                            <span className="text-[#059669] font-bold">Siap Dikerjakan</span>
                          ) : (
                            <span className="text-slate-400">Terkunci ({countFinished}/10)</span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setQuizActiveModuleId(mod.id);
                          setActiveView('kuis');
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1 ${
                          quizUnlocked
                            ? 'bg-[#0B1B8C] text-[#C6F63D] hover:bg-[#1e40af]'
                            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        }`}
                      >
                        {quizUnlocked ? (
                          score !== undefined ? 'Buka' : 'Uji'
                        ) : (
                          <>
                            <Lock className="w-3 h-3 text-[#F95716]" />
                            <span>Kunci</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 2: RUANG BELAJAR (MODUL 1, MODUL 2, MODUL 3)
           =================================================================== */}
        {activeView === 'materi' && (
          <div className="space-y-5">
            <div className="bg-[#FBF7EC] border-2 border-[#0B1B8C] rounded-3xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {LMS_MODULES.map((mod) => {
                  const doneCount = getModuleFinishedCount(mod.id);
                  const isActive = mod.id === selectedModuleId;
                  const quizUnlocked = isModuleQuizUnlocked(mod.id);

                  return (
                    <button
                      key={mod.id}
                      onClick={() => {
                        setSelectedModuleId(mod.id);
                        const firstUnlockedOrFirst =
                          mod.lessons.find((l) => isLessonUnlocked(l.globalIndex)) || mod.lessons[0];
                        setSelectedLessonId(firstUnlockedOrFirst.id);
                        setReflectionError(null);
                      }}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold border-2 transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                        isActive
                          ? 'bg-[#0B1B8C] text-[#C6F63D] border-[#0B1B8C]'
                          : 'bg-white text-[#0B1B8C] border-[#0B1B8C]/25 hover:border-[#0B1B8C]'
                      }`}
                    >
                      <span>Modul {mod.id}</span>
                      <span className="font-mono-num opacity-85">({doneCount}/10)</span>
                      {quizUnlocked && <span className="text-[10px] text-[#C6F63D] bg-[#059669] px-1.5 py-0.5 rounded-md">Kuis Siap</span>}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleResetProgress}
                  className="px-3.5 py-2 rounded-xl bg-white border border-[#0B1B8C]/30 text-slate-700 text-xs font-bold hover:bg-red-50 hover:text-red-700 transition cursor-pointer whitespace-nowrap flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Progres</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Lesson Reader */}
              <div className="lg:col-span-7 bg-[#FBF7EC] border-3 border-[#0B1B8C] rounded-[32px] p-5 sm:p-7 shadow-xl space-y-5">
                <div className="text-xs text-slate-600 flex items-center flex-wrap gap-1.5">
                  <span>Ruang Belajar Bimtek SD</span>
                  <span>&rsaquo;</span>
                  <span>{currentModule.code}</span>
                  <span>&rsaquo;</span>
                  <span className="font-bold text-[#0B1B8C]">Materi {currentLesson.lessonNumber} dari 10</span>
                </div>

                <div className="bg-[#FAF3E0] border-2 border-[#0B1B8C] rounded-3xl p-5 sm:p-6 relative">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono-num font-bold text-[#F95716]">
                      {currentModule.code} · MATERI #{currentLesson.lessonNumber} · {currentLesson.duration}
                    </span>
                    {isLessonFinished(currentLesson.id) ? (
                      <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#059669]">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Selesai & Refleksi Terisi</span>
                      </span>
                    ) : completedLessons.includes(currentLesson.id) ? (
                      <span className="text-xs font-bold text-[#F95716] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Perlu Isi Refleksi</span>
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-[#0B1B8C]">Sedang Dipelajari</span>
                    )}
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1B8C] leading-tight">
                    {currentLesson.title}
                  </h2>

                  <p className="mt-2 text-sm text-[#F95716] font-bold">{currentLesson.summary}</p>

                  <div className="mt-4 space-y-3 text-sm sm:text-base text-slate-800 leading-relaxed">
                    {currentLesson.contentParagraphs.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>

                  <div className="mt-5 bg-white border-2 border-[#0B1B8C] rounded-2xl p-4">
                    <div className="text-xs font-extrabold text-[#0B1B8C] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#F95716]" />
                      <span>TIPS PRAKTIK BAIK DI KELAS SD:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                      {currentLesson.practicalTip}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="inline-block bg-[#F95716] text-white font-bold text-xs px-4 py-1.5 rounded-t-xl border-t-2 border-x-2 border-[#0B1B8C]">
                    Poin Kunci Materi:
                  </div>
                  <div className="bg-[#C6F63D] border-2 border-[#0B1B8C] rounded-b-2xl rounded-tr-2xl p-4 sm:p-5">
                    <ul className="space-y-2 text-xs sm:text-sm font-semibold text-[#0B1B8C]">
                      {currentLesson.keyPoints.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="font-mono-num font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Teacher Reflection Section (Wajib Diisi untuk Membuka Materi Selanjutnya) */}
                <div
                  id="teacher-reflection-box"
                  className={`rounded-2xl p-5 border-2 transition-all ${
                    reflectionError
                      ? 'bg-red-50 border-red-500 shadow-md ring-2 ring-red-400'
                      : isLessonReflectionFilled(currentLesson.id)
                      ? 'bg-[#EBF7EE] border-[#059669]'
                      : 'bg-white border-[#0B1B8C]/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="teacher-reflection-input"
                      className="block text-xs sm:text-sm font-bold text-[#0B1B8C]"
                    >
                      Refleksi Guru (Wajib diisi): {currentLesson.reflectionPrompt}
                    </label>
                    {isLessonReflectionFilled(currentLesson.id) ? (
                      <span className="text-[11px] font-bold text-[#059669] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Sudah Diisi</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-[#F95716] flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Wajib Diisi</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 mb-2">
                    *Seluruh materi terbuka bebas dipelajari. Namun, <strong>Kuis Modul {currentModule.code} baru akan terbuka setelah seluruh 10 materi pada modul ini diisi refleksinya</strong>.
                  </p>

                  <textarea
                    id="teacher-reflection-input"
                    rows={3}
                    value={
                      (reflections[currentLesson.id] &&
                       !reflections[currentLesson.id].toLowerCase().includes('sangat aplikatif') &&
                       !reflections[currentLesson.id].toLowerCase().startsWith('refleksi materi'))
                        ? reflections[currentLesson.id]
                        : ''
                    }
                    onChange={(e) => {
                      setReflections((prev) => ({
                        ...prev,
                        [currentLesson.id]: e.target.value,
                      }));
                      if (reflectionError) setReflectionError(null);
                    }}
                    placeholder="Tuliskan catatan refleksi singkat Bapak/Ibu guru terkait penerapan materi ini di kelas..."
                    className="w-full text-xs sm:text-sm p-3.5 rounded-xl bg-white border border-[#0B1B8C]/40 focus:outline-none focus:ring-2 focus:ring-[#0B1B8C] text-[#0B1B8C]"
                  />

                  {reflectionError && (
                    <div className="mt-2 text-xs font-bold text-red-600 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{reflectionError}</span>
                    </div>
                  )}
                </div>

                {/* Bottom Action Bar */}
                <div className="bg-[#5B6CFA] border-2 border-[#0B1B8C] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-white text-xs sm:text-sm font-bold flex items-center gap-2">
                    <ThumbsUp className="w-5 h-5 text-[#C6F63D] shrink-0" />
                    <span>
                      {isLessonFinished(currentLesson.id)
                        ? 'Good Job! Materi & refleksi ini telah tuntas.'
                        : 'Selesai membaca? Isi refleksi lalu klik tombol selesai.'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleCompleteLesson(currentLesson.id)}
                      className={`flex-1 sm:flex-none px-5 py-3 rounded-xl border-2 border-[#0B1B8C] font-extrabold text-xs sm:text-sm active:scale-[0.99] transition cursor-pointer whitespace-nowrap ${
                        isLessonFinished(currentLesson.id)
                          ? 'bg-[#95E18D] text-[#0B1B8C]'
                          : 'bg-[#C6F63D] text-[#0B1B8C] hover:brightness-95'
                      }`}
                    >
                      {isLessonFinished(currentLesson.id)
                        ? '✓ Tuntas (Good Job!)'
                        : 'Selesai & Simpan Refleksi'}
                    </button>

                    <button
                      onClick={() => {
                        setQuizActiveModuleId(currentModule.id);
                        setActiveView('kuis');
                      }}
                      className={`px-4 py-3 rounded-xl border-2 border-[#0B1B8C] font-bold text-xs transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                        isModuleQuizUnlocked(currentModule.id)
                          ? 'bg-[#0B1B8C] text-[#C6F63D] hover:bg-[#1e40af]'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      {isModuleQuizUnlocked(currentModule.id) ? (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-[#C6F63D]" />
                          <span>Kuis Modul {currentModule.id}</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5 text-[#F95716]" />
                          <span>Kuis ({getModuleFinishedCount(currentModule.id)}/10)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: 10-Lesson List */}
              <div className="lg:col-span-5 bg-[#FBF7EC] border-3 border-[#0B1B8C] rounded-[32px] p-5 sm:p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b-2 border-[#0B1B8C]/15 pb-3">
                  <div>
                    <div className="text-xs font-bold text-[#F95716]">DAFTAR 10 MATERI</div>
                    <h3 className="font-display text-lg font-bold text-[#0B1B8C]">
                      {currentModule.title}
                    </h3>
                  </div>
                  <span className="font-mono-num text-xs font-extrabold text-[#0B1B8C]">
                    {getModuleFinishedCount(currentModule.id)}/10 Tuntas
                  </span>
                </div>

                <div className="divide-y divide-[#0B1B8C]/15">
                  {currentModule.lessons.map((lesson) => {
                    const unlocked = isLessonUnlocked(lesson.globalIndex);
                    const finished = isLessonFinished(lesson.id);
                    const hasRead = completedLessons.includes(lesson.id);
                    const hasRefl = isLessonReflectionFilled(lesson.id);
                    const isSelected = lesson.id === currentLesson.id;

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => {
                          if (unlocked) {
                            setSelectedLessonId(lesson.id);
                            setReflectionError(null);
                          } else {
                            setLockedNotice(
                              `Materi #${lesson.lessonNumber} masih terkunci! Anda wajib menyelesaikan materi sebelumnya dan mengisi Refleksi Guru terlebih dahulu.`
                            );
                            setTimeout(() => setLockedNotice(null), 4000);
                          }
                        }}
                        className={`py-3.5 px-3 rounded-2xl transition flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-[#C6F63D]/45 border-2 border-[#0B1B8C]'
                            : unlocked
                            ? 'hover:bg-white cursor-pointer'
                            : 'opacity-55 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-11 h-11 rounded-2xl border-2 border-[#0B1B8C] flex flex-col items-center justify-center shrink-0 font-mono-num text-xs font-extrabold ${
                              finished
                                ? 'bg-[#95E18D] text-[#0B1B8C]'
                                : unlocked
                                ? 'bg-white text-[#0B1B8C]'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            {finished ? (
                              <CheckCircle2 className="w-5 h-5 text-[#0B1B8C]" />
                            ) : unlocked ? (
                              <span>{lesson.lessonNumber}</span>
                            ) : (
                              <Lock className="w-4 h-4" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm font-bold text-[#0B1B8C] truncate">
                              {lesson.lessonNumber}. {lesson.title}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span
                                className={`text-[11px] font-bold ${
                                  finished
                                    ? 'text-[#059669]'
                                    : hasRead && !hasRefl
                                    ? 'text-[#F95716]'
                                    : unlocked
                                    ? 'text-[#0B1B8C]'
                                    : 'text-slate-500'
                                }`}
                              >
                                {finished
                                  ? 'Tuntas · Good Job!'
                                  : hasRead && !hasRefl
                                  ? 'Belum Refleksi'
                                  : unlocked
                                  ? 'Terbuka'
                                  : 'Terkunci'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="font-mono-num text-xs font-extrabold text-[#F95716]">
                            {lesson.duration}
                          </div>
                          <div className="text-[10px] text-slate-500 mt-0.5">
                            {unlocked ? (
                              <span className="flex items-center justify-end gap-1">
                                <Unlock className="w-3 h-3" /> Baca
                              </span>
                            ) : (
                              <span className="flex items-center justify-end gap-1 text-[#F95716]">
                                <Lock className="w-3 h-3" /> Kunci
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <div className="grid grid-cols-12 rounded-2xl overflow-hidden border-2 border-[#0B1B8C] font-extrabold text-xs sm:text-sm">
                    <button
                      onClick={() => {
                        setQuizActiveModuleId(currentModule.id);
                        setActiveView('kuis');
                      }}
                      className={`col-span-8 py-3.5 px-4 text-left transition cursor-pointer flex items-center gap-2 ${
                        isModuleQuizUnlocked(currentModule.id)
                          ? 'bg-[#0B1B8C] text-white hover:bg-[#1e40af]'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      {isModuleQuizUnlocked(currentModule.id) ? (
                        <>
                          <span>Buka Kuis Modul {currentModule.id}</span>
                          <ChevronRight className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 text-[#F95716]" />
                          <span>Kuis Modul {currentModule.id} Terkunci</span>
                        </>
                      )}
                    </button>
                    <div className="col-span-4 bg-[#F95716] text-white py-3.5 px-2 text-center font-mono-num text-[11px] flex items-center justify-center">
                      {isModuleQuizUnlocked(currentModule.id)
                        ? moduleScores[currentModule.id] !== undefined
                          ? `${moduleScores[currentModule.id]}%`
                          : 'Siap Uji'
                        : `${getModuleFinishedCount(currentModule.id)}/10 Materi`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 3: KUIS PER MODUL (KUIS MODUL 1, MODUL 2, MODUL 3)
           =================================================================== */}
        {activeView === 'kuis' && (
          <div className="bg-[#FBF7EC] border-3 border-[#0B1B8C] rounded-[32px] p-5 sm:p-8 shadow-xl space-y-6">
            {/* Header & Module Tabs */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#0B1B8C]/15 pb-5">
              <div>
                <div className="text-xs font-bold text-[#F95716]">
                  EVALUASI KOMPETENSI PER MODUL · AMBANG BATAS 80%
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1B8C] mt-1">
                  Kuis Interaktif per Modul
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Pilih modul yang ingin Anda uji. Kuis hanya terbuka setelah Anda menuntaskan seluruh 10 materi beserta Refleksi Guru.
                </p>
              </div>

              {isModuleQuizUnlocked(quizActiveModuleId) && (
                <button
                  type="button"
                  onClick={handleQuickFillPassingQuiz}
                  className="px-3.5 py-2 rounded-xl bg-white border-2 border-[#0B1B8C] text-[#0B1B8C] text-xs font-bold hover:bg-[#C6F63D] transition cursor-pointer whitespace-nowrap self-start md:self-auto"
                >
                  Isi Jawaban Lulus (100%)
                </button>
              )}
            </div>

            {/* 4 Module Selector Tabs for Quiz */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {LMS_MODULES.map((mod) => {
                const isActive = mod.id === quizActiveModuleId;
                const score = moduleScores[mod.id];
                const passed = (score ?? 0) >= 80;
                const unlocked = isModuleQuizUnlocked(mod.id);
                const countFinished = getModuleFinishedCount(mod.id);

                return (
                  <button
                    key={mod.id}
                    onClick={() => {
                      setQuizActiveModuleId(mod.id);
                    }}
                    className={`p-4 rounded-2xl border-2 text-left transition cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? 'bg-[#0B1B8C] text-[#C6F63D] border-[#0B1B8C] shadow-md'
                        : 'bg-white text-[#0B1B8C] border-[#0B1B8C]/25 hover:border-[#0B1B8C]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-bold opacity-80">
                        <span>{mod.code}</span>
                        {!unlocked && (
                          <span className="flex items-center gap-1 text-[#F95716]">
                            <Lock className="w-3 h-3" />
                            <span>Terkunci</span>
                          </span>
                        )}
                      </div>
                      <div className="font-bold text-sm mt-0.5">{mod.title}</div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-current/20 flex items-center justify-between text-xs font-mono-num font-bold">
                      <span>5 Soal Studi Kasus</span>
                      <span>
                        {unlocked ? (
                          score !== undefined ? (
                            <span className={passed ? (isActive ? 'text-[#C6F63D]' : 'text-[#059669]') : 'text-[#F95716]'}>
                              {score}% {passed ? '✓ Lulus' : '× Ulang'}
                            </span>
                          ) : (
                            'Siap Dikerjakan'
                          )
                        ) : (
                          `${countFinished}/10 Refleksi`
                        )}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* LOCKED STATE / UNLOCKED QUIZ */}
            {!isModuleQuizUnlocked(quizActiveModuleId) ? (
              <div className="bg-[#FAF3E0] border-3 border-[#0B1B8C] rounded-3xl p-6 sm:p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#F95716] text-white flex items-center justify-center mx-auto border-2 border-[#0B1B8C] shadow-md">
                  <Lock className="w-8 h-8" />
                </div>
                <div className="text-xs font-extrabold text-[#F95716] uppercase tracking-wider">
                  AKSES KUIS TERKUNCI
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1B8C]">
                  Kuis {quizModule.code} Belum Dapat Diakses
                </h3>
                <p className="text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
                  Seluruh materi modul terbuka bebas untuk dipelajari kapan saja. Namun kuis modul ini baru akan terbuka setelah Anda <strong>menjawab seluruh pertanyaan refleksi pada 10 materi di {quizModule.code} ({quizModule.title})</strong>.
                </p>

                <div className="max-w-md mx-auto bg-white border-2 border-[#0B1B8C] rounded-2xl p-4 text-left space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#0B1B8C]">
                    <span>Progres Refleksi {quizModule.code}:</span>
                    <span className="font-mono-num text-[#F95716]">
                      {getModuleFinishedCount(quizModule.id)} / 10 Refleksi Terisi
                    </span>
                  </div>
                  <div className="w-full bg-[#FAF3E0] rounded-full h-3.5 border border-[#0B1B8C]/20 overflow-hidden">
                    <div
                      className="bg-[#059669] h-full transition-all duration-500"
                      style={{ width: `${(getModuleFinishedCount(quizModule.id) / 10) * 100}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Masih ada {10 - getModuleFinishedCount(quizModule.id)} materi yang refleksinya belum diisi untuk membuka kuis ini.
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSelectedModuleId(quizModule.id);
                      const nextLesson =
                        quizModule.lessons.find((l) => !isLessonFinished(l.id)) || quizModule.lessons[0];
                      setSelectedLessonId(nextLesson.id);
                      setReflectionError(null);
                      setActiveView('materi');
                    }}
                    className="px-6 py-3 rounded-2xl bg-[#0B1B8C] text-[#C6F63D] border-2 border-[#0B1B8C] font-extrabold text-sm hover:brightness-110 transition cursor-pointer inline-flex items-center gap-2 shadow-md"
                  >
                    <span>Buka Materi & Tulis Refleksi {quizModule.code}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {moduleScores[quizActiveModuleId] !== undefined && (
                  <div
                    className={`rounded-3xl p-5 sm:p-6 border-3 border-[#0B1B8C] ${
                      moduleScores[quizActiveModuleId] >= 80 ? 'bg-[#95E18D]' : 'bg-[#F95716] text-white'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-extrabold tracking-wider uppercase">
                          {moduleScores[quizActiveModuleId] >= 80
                            ? `LULUS KUIS ${quizModule.code} (≥ 80%)`
                            : `BELUM LULUS KUIS ${quizModule.code} (< 80%)`}
                        </div>
                        <div className="font-display text-3xl sm:text-4xl font-bold mt-1 font-mono-num">
                          Skor: {moduleScores[quizActiveModuleId]}%
                        </div>
                        <p className="text-xs sm:text-sm mt-1 opacity-95">
                          {moduleScores[quizActiveModuleId] >= 80
                            ? `Selamat! Anda telah menguasai kompetensi ${quizModule.title}. Hasil tersimpan di Google Sheets.`
                            : 'Nilai belum memenuhi batas kelulusan 80%. Silakan baca kembali materi lalu klik tombol "Ulangi Kuis Modul Ini".'}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 shrink-0">
                        {allModulesPassed ? (
                          <button
                            type="button"
                            onClick={() => setActiveView('sertifikat')}
                            className="px-5 py-3 rounded-2xl bg-[#C6F63D] border-2 border-[#0B1B8C] text-[#0B1B8C] font-extrabold text-sm flex items-center gap-2 hover:brightness-95 transition cursor-pointer"
                          >
                            <Award className="w-4 h-4" />
                            <span>Klaim Sertifikat Digital</span>
                          </button>
                        ) : null}

                        <button
                          type="button"
                          onClick={handleResetModuleQuiz}
                          className="px-4 py-3 rounded-2xl bg-[#0B1B8C] text-white font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-[#1e40af] transition cursor-pointer"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Ulangi Kuis Modul Ini</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quiz Questions List */}
                <form onSubmit={handleSubmitModuleQuiz} className="space-y-5">
                  <div className="bg-[#FAF3E0] border-2 border-[#0B1B8C] rounded-2xl p-4 flex items-center justify-between text-xs font-bold text-[#0B1B8C]">
                    <span>Menampilkan 5 Soal untuk: {quizModule.title}</span>
                    <span className="font-mono-num text-[#F95716]">Modul {quizModule.id}</span>
                  </div>

                  {quizModule.quiz.map((q, idx) => {
                    const selectedOption = quizAnswers[q.id];
                    const isScored = moduleScores[quizActiveModuleId] !== undefined;

                    return (
                      <div
                        key={q.id}
                        className="bg-white border-2 border-[#0B1B8C] rounded-3xl p-5 sm:p-6 space-y-4"
                      >
                        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                          <span>SOAL {idx + 1} DARI {quizModule.quiz.length}</span>
                          <span className="text-[#F95716]">{q.moduleRef}</span>
                        </div>

                        <h3 className="text-sm sm:text-base font-bold text-[#0B1B8C] leading-relaxed">
                          {q.question}
                        </h3>

                        <div className="space-y-2.5">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = selectedOption === optIdx;
                            const isCorrect = q.correctIndex === optIdx;

                            let style = 'bg-[#FBF7EC] border-[#0B1B8C]/25 text-[#0B1B8C] hover:border-[#0B1B8C]';
                            if (isScored) {
                              if (isCorrect) style = 'bg-[#95E18D] border-[#0B1B8C] text-[#0B1B8C] font-bold';
                              else if (isSelected && !isCorrect) style = 'bg-[#F95716]/20 border-[#F95716] text-[#0B1B8C]';
                            } else if (isSelected) {
                              style = 'bg-[#C6F63D] border-[#0B1B8C] text-[#0B1B8C] font-bold';
                            }

                            return (
                              <label
                                key={optIdx}
                                className={`flex items-start gap-3 p-3.5 rounded-2xl border-2 transition cursor-pointer ${style}`}
                              >
                                <input
                                  type="radio"
                                  name={`mod-quiz-${q.id}`}
                                  checked={isSelected}
                                  onChange={() =>
                                    setQuizAnswers((prev) => ({
                                      ...prev,
                                      [q.id]: optIdx,
                                    }))
                                  }
                                  className="mt-1 accent-[#0B1B8C]"
                                />
                                <span className="text-xs sm:text-sm leading-relaxed">
                                  <strong className="font-mono-num mr-1.5">{String.fromCharCode(65 + optIdx)}.</strong>
                                  {opt}
                                </span>
                              </label>
                            );
                          })}
                        </div>

                        {isScored && (
                          <div className="bg-[#FBF7EC] border border-[#0B1B8C]/25 rounded-2xl p-3.5 text-xs text-slate-700">
                            <strong className="text-[#0B1B8C]">Pembahasan Bimtek SD:</strong> {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#5B6CFA] border-2 border-[#0B1B8C] rounded-3xl p-5 text-white">
                    <div className="text-xs sm:text-sm font-bold">
                      Terjawab:{' '}
                      <span className="font-mono-num text-[#C6F63D]">
                        {quizModule.quiz.filter((q) => quizAnswers[q.id] !== undefined).length} / 5 Soal
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#C6F63D] border-2 border-[#0B1B8C] text-[#0B1B8C] font-extrabold text-sm hover:brightness-95 transition cursor-pointer"
                    >
                      Kumpulkan & Nilai Kuis Modul {quizModule.id}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
            TAB 4: SERTIFIKAT DIGITAL RESMI
           =================================================================== */}
        {activeView === 'sertifikat' && (
          <CertificateView
            user={user}
            completedLessonsCount={totalFinishedLessons}
            totalLessons={ALL_LESSONS.length}
            moduleScores={moduleScores}
            averageScore={averageScore}
            allModulesPassed={allModulesPassed}
            onNavigateQuiz={(modId) => {
              if (modId) setQuizActiveModuleId(modId);
              setActiveView('kuis');
            }}
            onNavigateLearn={() => setActiveView('materi')}
            onSyncNotify={(msg) => setSyncMessage(msg)}
          />
        )}

        {/* ===================================================================
            TAB 5: INFO PENGEMBANG APLIKASI (DEDICATED MENU)
           =================================================================== */}
        {activeView === 'pengembang' && (
          <DeveloperInfoView onNavigateLearn={() => setActiveView('materi')} />
        )}

        {/* ===================================================================
            TAB 6: KODE & BACKEND .GS
           =================================================================== */}
        {activeView === 'kode' && <CodeBundleModal />}

        {/* Footer */}
        <footer className="pt-6 pb-6 text-center text-xs text-white/80 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-white/15">
          <div className="flex items-center gap-2">
            <Cloud className="w-3.5 h-3.5 text-[#C6F63D]" />
            <span>Database: {syncMessage}</span>
          </div>
          <button
            onClick={() => setActiveView('pengembang')}
            className="hover:text-[#C6F63D] underline cursor-pointer"
          >
            Pengembang: Achmad Firmansyah — SD Negeri 2 Mojosari Situbondo
          </button>
        </footer>

        {/* Mobile Bottom Navigation Bar */}
        {renderMobileBottomBar()}
      </main>

      {/* iOS PWA Install Modal Helper */}
      {showInstallModal && isIOS && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-4">
          <div className="bg-[#FBF7EC] border-3 border-[#0B1B8C] rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h4 className="font-display font-bold text-lg text-[#0B1B8C]">Cara Pasang di iPhone/iPad</h4>
              <button
                onClick={() => setShowInstallModal(false)}
                className="w-7 h-7 rounded-full bg-slate-200 text-[#0B1B8C] font-bold text-xs"
              >
                ✕
              </button>
            </div>
            <ol className="text-xs text-slate-700 space-y-2 list-decimal pl-4 leading-relaxed">
              <li>Buka website ini di browser Safari.</li>
              <li>Ketuk tombol <strong>Share</strong> (ikon kotak dengan panah ke atas) di bagian bawah layar.</li>
              <li>Gulir ke bawah lalu pilih <strong>Add to Home Screen (Tambahkan ke Layar Utama)</strong>.</li>
              <li>Aplikasi EduPro PWA akan terpasang di layar utama HP Anda.</li>
            </ol>
            <button
              onClick={() => setShowInstallModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#0B1B8C] text-[#C6F63D] font-bold text-xs"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
