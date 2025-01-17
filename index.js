import YearPicker from './src/YearPicker.vue';

export default {
  install(Vue) {
    Vue.component('YearPicker', YearPicker);
  },
};

// 支持按需引入
export { YearPicker };
