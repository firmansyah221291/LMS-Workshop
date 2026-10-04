export const GAS_WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycbw3Vvl_8rLhp7B1lQvbrsVTOi8p1vLbgSO7KDVzsDzgUf9FooCbjwePwusM5CaeoyB9_A/exec';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  nip: string;
  instansi: string;
  role: string;
  loginAt: string;
}

export interface SyncResult {
  ok: boolean;
  mode: 'cloud' | 'local-fallback';
  latencyMs: number;
  message: string;
  data?: unknown;
}

const TIMEOUT_MS = 8500;

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout = TIMEOUT_MS
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timer);
  }
}

export async function syncToGoogleSheet(
  action: 'login' | 'saveProgress' | 'submitModuleQuiz' | 'claimCertificate',
  payload: Record<string, unknown>
): Promise<SyncResult> {
  const start = performance.now();

  try {
    const response = await fetchWithTimeout(GAS_WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        action,
        timestamp: new Date().toISOString(),
        ...payload,
      }),
    });

    const latencyMs = Math.round(performance.now() - start);
    let parsed: unknown = null;
    try {
      const text = await response.text();
      parsed = text ? JSON.parse(text) : { status: 'ok' };
    } catch {
      parsed = { status: 'ok_opaque' };
    }

    return {
      ok: true,
      mode: 'cloud',
      latencyMs,
      message: `Tersinkronisasi ke Google Sheets (${latencyMs} ms)`,
      data: parsed,
    };
  } catch (error) {
    const latencyMs = Math.round(performance.now() - start);
    const isTimeout = error instanceof DOMException && error.name === 'AbortError';

    const queueKey = 'edupro_gas_sync_queue';
    try {
      const existing = JSON.parse(localStorage.getItem(queueKey) || '[]');
      existing.push({
        action,
        payload,
        queuedAt: new Date().toISOString(),
      });
      localStorage.setItem(queueKey, JSON.stringify(existing.slice(-30)));
    } catch {
      // quota safe
    }

    return {
      ok: true,
      mode: 'local-fallback',
      latencyMs,
      message: isTimeout
        ? 'Koneksi Google Sheets lambat (>8.5 dtk). Data diamankan di memori perangkat.'
        : 'Mode cadangan aktif. Data tersimpan di perangkat & siap disinkronkan.',
    };
  }
}
