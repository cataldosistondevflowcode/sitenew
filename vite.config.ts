import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { config } from "dotenv";
import fs from "fs";

// Carrega variáveis de ambiente
config();

// Plugin para servir arquivos HTML do dist/ em desenvolvimento
const serveDistHtml = () => {
  return {
    name: 'serve-dist-html',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Se for uma requisição para um arquivo HTML que não existe na raiz
        if (req.url && req.url.endsWith('.html') && !req.url.startsWith('/api/')) {
          const distPath = path.resolve(__dirname, 'dist', req.url);
          if (fs.existsSync(distPath)) {
            const content = fs.readFileSync(distPath, 'utf-8');
            res.setHeader('Content-Type', 'text/html');
            res.end(content);
            return;
          }
        }
        next();
      });
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/sitenew/' : '/',
  server: {
    host: "::",
    port: 3000,
    strictPort: false, // Permite usar outra porta se 3000 estiver ocupada
    proxy: {
      '/api/webflow': {
        target: 'https://api.webflow.com/v2',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/webflow/, ''),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // Adiciona o token de autenticação do .env
            const token = process.env.VITE_WEBFLOW_API_TOKEN;
            console.log('🔑 Proxy: Token encontrado?', token ? 'Sim' : 'Não');
            if (token) {
              proxyReq.setHeader('Authorization', `Bearer ${token}`);
              proxyReq.setHeader('accept-version', '1.0.0');
              console.log('✅ Proxy: Headers de autenticação adicionados');
            } else {
              console.error('❌ Proxy: Token não encontrado no process.env.VITE_WEBFLOW_API_TOKEN');
            }
          });
        },
      },
    },
  },
  plugins: [
    react(),
    serveDistHtml(), // Plugin para servir arquivos HTML do dist/
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  preview: {
    port: 8080,
    strictPort: true,
  },
  // Configuração para SPA - resolve problema dos links permanentes
  appType: 'spa',
}));
