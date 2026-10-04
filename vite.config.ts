import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

function photoUploadPlugin(): Plugin {
  return {
    name: 'photo-upload-endpoint',
    configureServer(server) {
      server.middlewares.use('/api/upload-photo', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const { dataUrl } = JSON.parse(body);
              if (dataUrl && dataUrl.includes('base64,')) {
                const base64Data = dataUrl.split('base64,')[1];
                const buffer = Buffer.from(base64Data, 'base64');
                fs.writeFileSync(path.resolve(__dirname, 'public/Achmad Firmansyah.png'), buffer);
                fs.writeFileSync(path.resolve(__dirname, 'public/achmad_firmansyah.jpg'), buffer);
                fs.writeFileSync(
                  path.resolve(__dirname, 'src/assets/images/achmad_firmansyah_portrait_1791055408919.jpg'),
                  buffer
                );
              }
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Foto asli pengembang berhasil disimpan di server' }));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: String(err) }));
            }
          });
        } else {
          res.statusCode = 405;
          res.end('Method Not Allowed');
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      photoUploadPlugin(),
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
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
