import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(
    {
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }
  )],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
})
