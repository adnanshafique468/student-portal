// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
  
//   // Base URL for GitHub Pages (repository name)
//   base: '/student-portal/',
  
//   // Development server config
//   server: {
//     port: 5173,
//     open: true,
//     host: true
//   },
  
//   // Build configuration
//   build: {
//     outDir: 'dist',
//     sourcemap: false,
//     minify: 'terser',
//     rollupOptions: {
//       output: {
//         // Split chunks for better performance
//         manualChunks: {
//           vendor: ['react', 'react-dom', 'react-router-dom'],
//           aws: ['@aws-sdk/client-s3', '@aws-sdk/client-dynamodb', '@aws-sdk/lib-dynamodb']
//         }
//       }
//     }
//   }
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/student-portal/',
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})