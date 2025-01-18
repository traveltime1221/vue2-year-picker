(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue2YearPicker = factory(global.vue));
})(this, (function (vue) { 'use strict';

  var script = {
    name: 'YearPicker',
    props: {
      year: Number,
      icon: Object
    },
    data() {
      return {
        isClickingButton: false, // 是否正在點擊按鈕
        inputYear: '', // 輸入框內的年份
        selectedYear: null, // 已選中的年份
        showYearPicker: false, // 是否顯示年份選單
        perYear: 12,
        currentRange: {
          start: 2020,
          end: 2029
        }
      }
    },
    mounted() {
      this.inputYear = this.year;
    },
    computed: {
      // 動態生成範圍內的年份
      years() {
        const { start } = this.currentRange;
        return Array.from({ length: this.perYear }, (_, i) => start + i)
        // const { start, end } = this.currentRange
        // return Array.from({ length: end - start + 1 }, (_, i) => start + i)
      }
    },
    methods: {
      // 西元轉民國
      toTaiwanYear(year) {
        this.$emit('update:year', year - 1911);
        return year - 1911
      },
      // 民國轉西元
      toWesternYear(taiwanYear) {
        return taiwanYear + 1911
      },
      // 選擇年份
      selectYear(year) {
        this.selectedYear = year;
        this.inputYear = this.toTaiwanYear(year); // 更新輸入框為民國年
        this.showYearPicker = false; // 收起選單
      },
      prevRange() {
        this.isClickingButton = true; // 標記正在點擊按鈕
        if (this.currentRange.start < 1911) return
        this.currentRange.start -= this.perYear;
        this.currentRange.end -= this.perYear;
        setTimeout(() => (this.isClickingButton = false), 200); // 延遲重置
      },
      nextRange() {
        this.isClickingButton = true; // 標記正在點擊按鈕
        this.currentRange.start += this.perYear;
        this.currentRange.end += this.perYear;
        setTimeout(() => (this.isClickingButton = false), 200); // 延遲重置
      },
      // 展開/收起選單
      toggleYearPicker() {
        this.showYearPicker = !this.showYearPicker;
      },
      // 處理輸入框的失焦事件
      handleBlur() {
        setTimeout(() => {
          // 如果不是點擊按鈕，才關閉選單
          if (!this.isClickingButton) {
            this.showYearPicker = false;
          }
        }, 200);

        const year = parseInt(this.inputYear);
        // 檢查是否為有效的民國年份
        if (!isNaN(year) && year >= 1 && year <= 300) {
          this.selectedYear = this.toWesternYear(year);
        } else {
          this.inputYear = ''; // 清空無效輸入
        }
      }
    }
  };

  const _hoisted_1 = { class: "year-picker" };
  const _hoisted_2 = { class: "input-container" };
  const _hoisted_3 = {
    key: 0,
    class: "dropdown"
  };
  const _hoisted_4 = { class: "range-header" };
  const _hoisted_5 = ["disabled"];
  const _hoisted_6 = ["src"];
  const _hoisted_7 = { class: "range-title" };
  const _hoisted_8 = ["src"];
  const _hoisted_9 = { class: "year-grid" };
  const _hoisted_10 = ["onClick"];

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
      vue.createCommentVNode(" 輸入框，點擊展開或收起選單 "),
      vue.createElementVNode("div", _hoisted_2, [
        vue.withDirectives(vue.createElementVNode("input", {
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($data.inputYear) = $event)),
          type: "text",
          placeholder: "輸入民國年份或點擊選擇",
          onFocus: _cache[1] || (_cache[1] = $event => ($data.showYearPicker = true)),
          onBlur: _cache[2] || (_cache[2] = (...args) => ($options.handleBlur && $options.handleBlur(...args)))
        }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [
          [vue.vModelText, $data.inputYear]
        ]),
        vue.createCommentVNode(" <button class=\"toggle-button\" @click=\"toggleYearPicker\">\n          {{ showYearPicker ? \"▲\" : \"▼\" }}\n        </button> ")
      ]),
      vue.createCommentVNode(" 年份選單 "),
      ($data.showYearPicker)
        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3, [
            vue.createElementVNode("div", _hoisted_4, [
              vue.createElementVNode("button", {
                class: "btn bg-transparent",
                onClick: _cache[3] || (_cache[3] = (...args) => ($options.prevRange && $options.prevRange(...args))),
                disabled: $data.currentRange.start < 1913
              }, [
                vue.createElementVNode("img", {
                  width: "20",
                  src: $props.icon.right,
                  alt: ""
                }, null, 8 /* PROPS */, _hoisted_6)
              ], 8 /* PROPS */, _hoisted_5),
              vue.createElementVNode("span", _hoisted_7, " 民國 " + vue.toDisplayString($options.toTaiwanYear($data.currentRange.start)) + " ~ " + vue.toDisplayString($options.toTaiwanYear($data.currentRange.end)), 1 /* TEXT */),
              vue.createElementVNode("button", {
                class: "btn bg-transparent",
                onClick: _cache[4] || (_cache[4] = (...args) => ($options.nextRange && $options.nextRange(...args)))
              }, [
                vue.createElementVNode("img", {
                  width: "20",
                  src: $props.icon.left,
                  alt: ""
                }, null, 8 /* PROPS */, _hoisted_8)
              ])
            ]),
            vue.createElementVNode("div", _hoisted_9, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.years, (year) => {
                return (vue.openBlock(), vue.createElementBlock("button", {
                  key: year,
                  onClick: $event => ($options.selectYear(year)),
                  class: vue.normalizeClass({ selected: year === $data.selectedYear })
                }, vue.toDisplayString($options.toTaiwanYear(year)), 11 /* TEXT, CLASS, PROPS */, _hoisted_10))
              }), 128 /* KEYED_FRAGMENT */))
            ])
          ]))
        : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 顯示選擇結果 "),
      vue.createCommentVNode(" <p v-if=\"selectedYear\">\n        您選擇的年份是：西元 {{ selectedYear }} 年 (民國\n        {{ toTaiwanYear(selectedYear) }} 年)\n      </p> ")
    ]))
  }

  script.render = render;
  script.__scopeId = "data-v-2a17b04a";
  script.__file = "src/components/YearPicker.vue";

  return script;

}));
