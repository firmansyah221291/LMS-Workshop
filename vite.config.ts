import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function developerPhotoSaverPlugin() {
  return {
    name: 'developer-photo-saver',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url === '/api/save-developer-photo' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              if (data.image && typeof data.image === 'string') {
                const base64Data = data.image.replace(/^data:image\/\w+;base64,/, '');
                const buffer = Buffer.from(base64Data, 'base64');

                const targets = [
                  path.resolve(__dirname, 'public/Achmad Firmansyah.png'),
                  path.resolve(__dirname, 'public/achmad_firmansyah.jpg'),
                  path.resolve(__dirname, 'src/assets/images/achmad_firmansyah_portrait_1791055408919.jpg'),
                  path.resolve(__dirname, 'dist/Achmad Firmansyah.png'),
                  path.resolve(__dirname, 'dist/achmad_firmansyah.jpg'),
                ];

                for (const target of targets) {
                  try {
                    const dir = path.dirname(target);
                    if (fs.existsSync(dir)) {
                      fs.writeFileSync(target, buffer);
                    }
                  } catch (e) {
                    console.error('Failed writing target:', target, e);
                  }
                }

                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    success: true,
                    message: 'Foto profil asli pengembang berhasil disimpan permanen ke sistem!',
                  })
                );
                return;
              }
            } catch (err) {
              console.error('Error saving developer photo:', err);
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: String(err) }));
              return;
            }
            res.statusCode = 400;
            res.end(JSON.stringify({ success: false, error: 'Invalid payload' }));
          });
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      developerPhotoSaverPlugin(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['icon.svg', 'apple-touch-icon.png', 'manifest.json', 'service-worker.js'],
        manifest: {
          id: '/',
          name: 'EduPro PWA LMS — Bimtek Digitalisasi Pembelajaran SD',
          short_name: 'EduPro',
          description: 'Aplikasi LMS Progressive Web App untuk Pelatihan, Kuis per Modul, dan Sertifikasi Guru SD 2026.',
          theme_color: '#1e40af',
          background_color: '#5b6cfa',
          display: 'standalone',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,woff,woff2}'],
        },
        devOptions: {
          enabled: true,
          type: 'module',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'dist',
      chunkSizeWarningLimit: 1600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('jspdf') || id.includes('html2canvas')) {
                return 'vendor-pdf';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (id.includes('react')) {
                return 'vendor-react';
              }
            }
          },
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
