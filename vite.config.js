import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/index.js', // 入口文件，根據你的庫設置
      name: 'YearPicker', // 庫的全局名稱
      fileName: (format) => `YearPicker.${format}.js`, // 輸出文件名稱
    },
    rollupOptions: {
      external: ['vue'], // 不將 Vue 打包進庫
      output: {
        globals: {
          vue: 'Vue', // Vue 全局變數
        },
        format: ['es', 'umd', 'cjs'], // 打包三種格式
      },
    },
  },
});
