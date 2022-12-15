import { resolve } from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'UswdsReactHookForm',
      formats: ['es', 'umd'],
      fileName: (format) => `uswds-react-hook-form.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-hook-form'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-hook-form': 'ReactHookForm',
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [
          './node_modules/@uswds',
          './node_modules/@uswds/uswds/packages',
        ],
      },
    },
  },
})
