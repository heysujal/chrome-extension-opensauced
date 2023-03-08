import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from 'path'; 
import { crx } from "@crxjs/vite-plugin";
import manifest from './manifest.json' assert { type: 'json' } 
// Node >=17

export default defineConfig({
   
  plugins: [react(), crx({ manifest })],
});