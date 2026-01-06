import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(),
  ],
  define: {
    'process.env': {},
  },
  optimizeDeps: {
    exclude: [
      '@aws-amplify/backend',
      '@aws-amplify/backend-data',
      '@aws-amplify/backend-function',
      '@aws-amplify/backend-auth',
      '@aws-amplify/backend-output-storage',
      '@aws-amplify/model-generator',
      '@aws-amplify/client-config',
      '@aws-amplify/backend-cli',
      '@aws-amplify/ai-constructs',
      '@aws-amplify/graphql-generator',
      'aws-cdk-lib',
      'constructs',
      '@aws-amplify/backend-storage',
    ],
  },
  resolve: {
    alias: {
      'fs/promises': '/src/fs-shim.ts',
      fs: '/src/fs-shim.ts',
      'aws-cdk-lib': '/src/empty-shim.ts',
      constructs: '/src/empty-shim.ts',
      'aws-cdk-lib/aws-s3': '/src/empty-shim.ts',
      // Catch server-only Amplify backend packages in the browser
      '@aws-amplify/backend': '/src/empty-shim.ts',
      '@aws-amplify/backend-data': '/src/empty-shim.ts',
      '@aws-amplify/backend-function': '/src/empty-shim.ts',
      '@aws-amplify/backend-auth': '/src/empty-shim.ts',
      '@aws-amplify/backend-storage': '/src/empty-shim.ts',
      '@aws-amplify/backend-output-storage': '/src/empty-shim.ts',
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})