import vue from 'rollup-plugin-vue'; // 引入 rollup-plugin-vue
import css from 'rollup-plugin-css-only'; // 用來處理 CSS

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/vue2-year-picker.esm.js', // ESM 格式
      format: 'es',
      name: 'Vue2YearPicker',
    },
    {
      file: 'dist/vue2-year-picker.umd.js', // UMD 格式
      format: 'umd',
      name: 'Vue2YearPicker',
    },
  ],
  external: ['vue'], // 讓 Vue 成為外部依賴
  plugins: [
    vue(), // 處理 Vue 文件
    css({ output: 'vue2-year-picker.css' }) // 把 CSS 輸出到單獨的檔案
  ]
};
