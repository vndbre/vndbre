import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import ViteFonts from 'vite-plugin-fonts';
import eslintPlugin from "@nabla/vite-plugin-eslint";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    ViteFonts({
      google: {
        families: ['Inter']
      },
    }),
    eslintPlugin({ eslintOptions: { cache: false } })
  ],
});