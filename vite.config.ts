import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '')
  const isProduction = mode === 'production'
  const isStaging = mode === 'staging'
  
  return {
    plugins: [react()],
    
    // Path resolution
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        '@pages': resolve(__dirname, 'src/pages'),
        '@hooks': resolve(__dirname, 'src/hooks'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@types': resolve(__dirname, 'src/types'),
        '@assets': resolve(__dirname, 'src/assets'),
        '@styles': resolve(__dirname, 'src/styles'),
      },
    },
    
    // Build configuration
    build: {
      // Output directory
      outDir: 'dist',
      
      // Enable code splitting
      rollupOptions: {
        output: {
          // Manual chunks for better caching
          manualChunks: {
            // Core React chunks
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            
            // Internationalization
            i18n: [
              'react-i18next', 
              'i18next', 
              'i18next-browser-languagedetector', 
              'i18next-http-backend'
            ],
            
            // UI and animations
            ui: ['framer-motion', 'lucide-react'],
            
            // SEO and meta
            seo: ['react-helmet-async'],
            
            // Utilities
            utils: ['clsx', 'tailwind-merge'],
          },
          
          // Asset naming for better caching
          assetFileNames: (assetInfo) => {
            if (!assetInfo.name) return `assets/[name]-[hash][extname]`
            
            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
              return `assets/images/[name]-[hash][extname]`
            }
            
            if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
              return `assets/fonts/[name]-[hash][extname]`
            }
            
            return `assets/[name]-[hash][extname]`
          },
          
          // Chunk naming
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        },
      },
      
      // Minification
      minify: isProduction ? 'terser' : false,
      
      // Terser options for production
      terserOptions: isProduction ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info'],
        },
        mangle: {
          safari10: true,
        },
        format: {
          comments: false,
        },
      } : {},
      
      // Source maps
      sourcemap: isStaging || (!isProduction && command === 'build'),
      
      // Chunk size warning limit
      chunkSizeWarningLimit: 1000,
      
      // Asset size warning limit
      assetsInlineLimit: 4096,
      
      // CSS code splitting
      cssCodeSplit: true,
      
      // Report compressed size
      reportCompressedSize: isProduction,
      
      // Target modern browsers for production
      target: isProduction ? 'es2020' : 'esnext',
    },
    
    // Performance optimizations
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'react-i18next',
        'framer-motion',
        'lucide-react',
        'react-helmet-async',
        'react-intersection-observer',
        'clsx',
        'tailwind-merge',
      ],
      exclude: ['@testing-library/react'],
    },
    
    // Define global constants
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
      __COMMIT_SHA__: JSON.stringify(process.env.GITHUB_SHA || 'dev'),
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV || 'development'),
    },
    
    // Server configuration for development
    server: {
      port: 5172,
      host: true,
      open: false,
      cors: true,
      // Proxy configuration for future API calls
      proxy: {
        // '/api': {
        //   target: env.VITE_API_BASE_URL || 'http://localhost:3001',
        //   changeOrigin: true,
        //   secure: isProduction,
        // },
      },
    },
    
    // Preview configuration
    preview: {
      port: 4173,
      host: true,
      open: false,
      cors: true,
    },
    
    // CSS configuration
    css: {
      // PostCSS configuration is handled by postcss.config.js
      devSourcemap: !isProduction,
      
      // CSS modules configuration
      modules: {
        localsConvention: 'camelCase',
      },
    },
    
    // Environment variables prefix
    envPrefix: 'VITE_',
    
    // Base URL for assets
    base: '/',
    
    // Public directory
    publicDir: 'public',
    
    // Enable/disable esbuild for production
    esbuild: isProduction ? false : {
      drop: isProduction ? ['console', 'debugger'] : [],
    },
  }
})
