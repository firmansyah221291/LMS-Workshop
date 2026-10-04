import React, { useState } from 'react';
import { Check, Code2, Copy, Download, FileCode, Server, Sparkles } from 'lucide-react';
import { GAS_WEB_APP_URL } from '../services/gasApi';

export const CodeBundleModal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'gs' | 'html' | 'js' | 'manifest' | 'sw'>('gs');
  const [copied, setCopied] = useState(false);

  const gsCode = `/**
 * BACKEND GOOGLE APPS SCRIPT (Code.gs)
 * Bimtek Daerah Digitalisasi Pembelajaran SD Tahun 2026
 * URL Web App: ${GAS_WEB_APP_URL}
 */

const SHEET_USERS = 'Peserta';
const SHEET_PROGRESS = 'Progres_Materi';
const SHEET_QUIZ = 'Nilai_Kuis_PerModul';

function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss.getSheetByName(SHEET_USERS)) {
    const s1 = ss.insertSheet(SHEET_USERS);
    s1.appendRow(['Timestamp', 'ID_Peserta', 'Nama_Lengkap', 'NIP', 'Email', 'Instansi', 'Peran']);
  }
  if (!ss.getSheetByName(SHEET_PROGRESS)) {
    const s2 = ss.insertSheet(SHEET_PROGRESS);
    s2.appendRow(['Timestamp', 'Email', 'Nama', 'Lesson_ID', 'Total_Selesai', 'Persentase']);
  }
  if (!ss.getSheetByName(SHEET_QUIZ)) {
    const s3 = ss.insertSheet(SHEET_QUIZ);
    s3.appendRow(['Timestamp', 'Email', 'Nama', 'Instansi', 'Modul_ID', 'Skor', 'Status_Lulus', 'No_Sertifikat']);
  }
}

function doPost(e) {
  setupSheets();
  try {
    const body = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const now = new Date();
    const action = body.action;

    if (action === 'login') {
      const s = ss.getSheetByName(SHEET_USERS);
      s.appendRow([now, body.id, body.name, body.nip, body.email, body.instansi, body.role]);
      return jsonResponse({ status: 'success', action: 'login' });
    }

    if (action === 'saveProgress') {
      const s = ss.getSheetByName(SHEET_PROGRESS);
      s.appendRow([now, body.email, body.name, body.lessonId, body.completedCount, body.percentage]);
      return jsonResponse({ status: 'success', action: 'saveProgress' });
    }

    if (action === 'submitModuleQuiz' || action === 'claimCertificate') {
      const s = ss.getSheetByName(SHEET_QUIZ);
      s.appendRow([
        now,
        body.email,
        body.name,
        body.instansi,
        body.moduleId || 'SEMUA',
        body.score || body.averageScore || 0,
        body.passed ? 'LULUS' : 'BELUM LULUS',
        body.certificateNumber || '-'
      ]);
      return jsonResponse({ status: 'success', action });
    }

    return jsonResponse({ status: 'unknown_action' });
  } catch (err) {
    return jsonResponse({ status: 'error', message: err.toString() });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}`;

  const htmlCode = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EduPro PWA LMS — Bimtek SD 2026</title>
  <link rel="manifest" href="manifest.json">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
</head>
<body class="bg-[#5B6CFA] text-[#0B1B8C] font-sans pb-24">
  <header class="bg-[#C6F63D] p-4 text-center rounded-b-3xl font-bold text-xl shadow">
    EduPro — Bimtek Digitalisasi Pembelajaran SD
  </header>
  <main id="app" class="max-w-4xl mx-auto p-4"></main>
  <script src="app.js"></script>
</body>
</html>`;

  const files = {
    gs: {
      filename: 'Code.gs',
      title: 'Backend Google Apps Script (Code.gs)',
      subtitle: 'Siap tempel di Google Sheets > Extensions > Apps Script (doPost)',
      code: gsCode,
    },
    html: {
      filename: 'index.html',
      title: 'Bundel HTML5 + Tailwind CDN',
      subtitle: 'Single Page Application dengan PWA & html2pdf.js',
      code: htmlCode,
    },
    js: {
      filename: 'app.js',
      title: 'Vanilla JavaScript ES6+ (app.js)',
      subtitle: 'Logika autentikasi, materi per modul, kuis per modul, dan sync Google Sheets',
      code: `// Terhubung ke Google Apps Script: ${GAS_WEB_APP_URL}\n// Logika kuis per modul (Modul 1, Modul 2, Modul 3) dan klaim sertifikat`,
    },
    manifest: {
      filename: 'manifest.json',
      title: 'Web App Manifest',
      subtitle: 'Konfigurasi PWA standalone dengan theme-color #1e40af',
      code: `{\n  "name": "EduPro PWA LMS",\n  "short_name": "EduPro",\n  "start_url": "/",\n  "display": "standalone",\n  "theme_color": "#1e40af"\n}`,
    },
    sw: {
      filename: 'service-worker.js',
      title: 'Offline Caching Worker',
      subtitle: 'Caching aset untuk pembelajaran tanpa sinyal',
      code: `// Cache-first untuk aset statis, network-first untuk GAS API`,
    },
  };

  const currentFile = files[activeTab];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#FBF7EC] rounded-3xl p-5 md:p-7 border-2 border-[#0B1B8C] shadow-lg space-y-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b-2 border-[#0B1B8C]/10 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#F95716]">
            <Server className="w-4 h-4" />
            <span>KODE SUMBER & BACKEND RESMI</span>
          </div>
          <h2 className="font-display text-xl md:text-2xl font-bold text-[#0B1B8C] mt-1">
            Paket Kode Bundel SPA & Google Apps Script (.gs)
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            URL Google Apps Script Aktif: <code className="font-mono-num text-[11px] bg-white px-2 py-0.5 rounded border text-[#0B1B8C]">{GAS_WEB_APP_URL}</code>
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C6F63D] border-2 border-[#0B1B8C] text-[#0B1B8C] text-xs font-extrabold hover:brightness-95 transition cursor-pointer whitespace-nowrap"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Tersalin!' : `Salin ${currentFile.filename}`}</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {(['gs', 'html', 'js', 'manifest', 'sw'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === tab
                ? 'bg-[#0B1B8C] text-[#C6F63D] border-[#0B1B8C]'
                : 'bg-white text-[#0B1B8C] border-[#0B1B8C]/20 hover:border-[#0B1B8C]'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>{files[tab].filename}</span>
          </button>
        ))}
      </div>

      <div className="bg-[#0B1B8C] text-[#FBF7EC] rounded-2xl p-4 border-2 border-[#0B1B8C]">
        <div className="flex items-center justify-between border-b border-white/15 pb-2.5 mb-2.5">
          <div className="text-xs font-bold text-[#C6F63D]">{currentFile.title}</div>
          <span className="font-mono-num text-xs text-[#C6F63D]">{currentFile.filename}</span>
        </div>
        <pre className="font-mono-num text-xs leading-relaxed overflow-x-auto max-h-[360px] text-slate-100 select-all">
          <code>{currentFile.code}</code>
        </pre>
      </div>
    </div>
  );
};
