# vue2-year-picker

這是一個非常簡易而且只有選擇年份的 Vue2 組件，支持西元轉民國年份轉換。

![範例](https://github.com/traveltime1221/vue2-year-picker/raw/main/src/assets/image/example.gif)

## 安裝

### 環境
`"vue": ">=2.6.0 <2.7.0"`
`"vue-template-compiler": ">=2.6.0 <2.7.0"`
`"node": ">=12.0.0"`

### 安裝方式
```
npm install vue2-year-picker
```

### 解決安裝衝突
如果專案包含 ESLint，安裝本套件時可能會遇到依賴衝突。可使用以下方法進行安裝處理：
```
npm install vue2-year-picker --legacy-peer-deps
```


## 使用方式

### 全域
於 main.js 註冊設定
```
import Vue from "vue";
import App from "./App.vue";
import YearPicker from "vue2-year-picker"; // 引用

Vue.config.productionTip = false;
Vue.component("YearPicker", YearPicker); // 註冊

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

前往 page.vue 引用
```
<template>
  <div id="app">
    <YearPicker :year="year" :icon="icon" />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      year: 114, // 預設年份
      icon: {
        prev: "", // 圖片路徑
        next: "",
      },
    };
  },
};
</script>
```

### 局部
```
<template>
  <div id="app">
    <YearPicker :year="year" :icon="icon" />
  </div>
</template>

<script>
import YearPicker from "vue2-year-picker"; // 引用
export default {
  name: "App",
  components: {
    YearPicker, // 於此註冊
  },
  data() {
    return {
      year: 114, // 預設年份
      icon: {
        prev: "", // 圖片路徑
        next: "", 
      },
    };
  },
};
</script>
```

## 屬性
|  參數 | 類型 | 描述 | 
| -------- | -------- | -------- | 
| year    | Number     | 預設、傳遞選擇年份     | 
| icon    | Object     | 傳遞圖片路徑, prev: 上一頁, next: 下一頁     | 

## 版本歷程
* 1.1.8 文件補齊
* 1.1.7 文件補齊
* 1.1.6 修正圖片參數異常
* 1.1.5 打包異常修正, 參數傳遞異常修正
* 1.1.4 打包異常修正
* 1.0.3 更換打包方式
* 1.0.2 發布版本調整
* 1.0.0 第一次發布

## License
MIT
