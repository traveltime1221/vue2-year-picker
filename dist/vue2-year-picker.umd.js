(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue2YearPicker = factory());
})(this, (function () { 'use strict';

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

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

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
      }
      // scopedId
      {
          options._scopeId = scopeId;
      }
      let hook;
      {
          hook = function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  const isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return (id, style) => addStyle(id, style);
  }
  let HEAD;
  const styles = {};
  function addStyle(id, css) {
      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          let code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  style.element.setAttribute('media', css.media);
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              const index = style.ids.size - 1;
              const textNode = document.createTextNode(code);
              const nodes = style.element.childNodes;
              if (nodes[index])
                  style.element.removeChild(nodes[index]);
              if (nodes.length)
                  style.element.insertBefore(textNode, nodes[index]);
              else
                  style.element.appendChild(textNode);
          }
      }
  }

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "year-picker" }, [
      _c("div", { staticClass: "input-container" }, [
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.inputYear,
              expression: "inputYear",
            },
          ],
          attrs: { type: "text", placeholder: "輸入民國年份或點擊選擇" },
          domProps: { value: _vm.inputYear },
          on: {
            focus: function ($event) {
              _vm.showYearPicker = true;
            },
            blur: _vm.handleBlur,
            input: function ($event) {
              if ($event.target.composing) {
                return
              }
              _vm.inputYear = $event.target.value;
            },
          },
        }),
      ]),
      _vm._v(" "),
      _vm.showYearPicker
        ? _c("div", { staticClass: "dropdown" }, [
            _c("div", { staticClass: "range-header" }, [
              _c(
                "button",
                {
                  staticClass: "btn bg-transparent",
                  attrs: { disabled: _vm.currentRange.start < 1913 },
                  on: { click: _vm.prevRange },
                },
                [
                  _c("img", {
                    attrs: { width: "20", src: _vm.icon.prev, alt: "" },
                  }),
                ]
              ),
              _vm._v(" "),
              _c("span", { staticClass: "range-title" }, [
                _vm._v(
                  "\n        民國 " +
                    _vm._s(_vm.toTaiwanYear(_vm.currentRange.start)) +
                    " ~\n        " +
                    _vm._s(_vm.toTaiwanYear(_vm.currentRange.end)) +
                    "\n      "
                ),
              ]),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn bg-transparent",
                  on: { click: _vm.nextRange },
                },
                [
                  _c("img", {
                    attrs: { width: "20", src: _vm.icon.next, alt: "" },
                  }),
                ]
              ),
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "year-grid" },
              _vm._l(_vm.years, function (year) {
                return _c(
                  "button",
                  {
                    key: year,
                    class: { selected: year === _vm.selectedYear },
                    on: {
                      click: function ($event) {
                        return _vm.selectYear(year)
                      },
                    },
                  },
                  [
                    _vm._v(
                      "\n        " + _vm._s(_vm.toTaiwanYear(year)) + "\n      "
                    ),
                  ]
                )
              }),
              0
            ),
          ])
        : _vm._e(),
    ])
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = function (inject) {
      if (!inject) return
      inject("data-v-0da325ad_0", { source: "\n.year-picker[data-v-0da325ad] {\n  font-family: Arial, sans-serif;\n  text-align: center;\n}\n.year-picker .input-container[data-v-0da325ad] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  position: relative;\n}\n.year-picker input[data-v-0da325ad] {\n  width: 100%;\n  padding: 8px;\n  font-size: 16px;\n  border: 0;\n  border: 1px solid #eee;\n}\n.year-picker .toggle-button[data-v-0da325ad] {\n  padding: 8px 10px;\n  font-size: 16px;\n  border: 1px solid #ccc;\n  background-color: #f0f0f0;\n  border-radius: 4px;\n  cursor: pointer;\n}\n.year-picker .toggle-button[data-v-0da325ad]:hover {\n  background-color: #e0e0e0;\n}\n.year-picker .dropdown[data-v-0da325ad] {\n  position: absolute;\n  /* width: 100%; */\n  background-color: #fff;\n  border: 1px solid #eee;\n  border-radius: 0;\n  z-index: 10;\n}\n.year-picker .range-header[data-v-0da325ad] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 14px;\n  padding: 8px;\n  line-height: 20px;\n}\n.year-picker .range-header button[data-v-0da325ad] {\n  background-color: transparent;\n  border: 0;\n  cursor: pointer;\n}\n.year-grid[data-v-0da325ad] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 10px;\n  padding: 0px 10px 10px 10px;\n}\n.year-grid button[data-v-0da325ad] {\n  padding: 4px 10px;\n  font-size: 16px;\n  outline: 0;\n  border: 0;\n  background: transparent;\n  border-radius: 4px;\n  cursor: pointer;\n}\n.year-grid button[data-v-0da325ad]:hover {\n  background-color: #007bff;\n  color: white;\n  opacity: 0.5;\n  transition: 0.3s;\n}\n.year-grid button.selected[data-v-0da325ad] {\n  transition: 0.3s;\n  background-color: #007bff;\n  color: #fff;\n  border-color: #007bff;\n}\np[data-v-0da325ad] {\n  margin-top: 20px;\n  font-size: 18px;\n  color: #333;\n}\n", map: {"version":3,"sources":["/Volumes/SP-PX10/projects/code/Tools/vue2/vue2-year-picker/src/components/YearPicker.vue"],"names":[],"mappings":";AAiIA;EACA,8BAAA;EACA,kBAAA;AACA;AAEA;EACA,aAAA;EACA,mBAAA;EACA,8BAAA;EACA,kBAAA;AACA;AAEA;EACA,WAAA;EACA,YAAA;EACA,eAAA;EACA,SAAA;EACA,sBAAA;AACA;AAEA;EACA,iBAAA;EACA,eAAA;EACA,sBAAA;EACA,yBAAA;EACA,kBAAA;EACA,eAAA;AACA;AAEA;EACA,yBAAA;AACA;AAEA;EACA,kBAAA;EACA,iBAAA;EACA,sBAAA;EACA,sBAAA;EACA,gBAAA;EACA,WAAA;AACA;AAEA;EACA,aAAA;EACA,8BAAA;EACA,mBAAA;EACA,eAAA;EACA,YAAA;EACA,iBAAA;AACA;AAEA;EACA,6BAAA;EACA,SAAA;EACA,eAAA;AACA;AAEA;EACA,aAAA;EACA,qCAAA;EACA,SAAA;EACA,2BAAA;AACA;AAEA;EACA,iBAAA;EACA,eAAA;EACA,UAAA;EACA,SAAA;EACA,uBAAA;EACA,kBAAA;EACA,eAAA;AACA;AAEA;EACA,yBAAA;EACA,YAAA;EACA,YAAA;EACA,gBAAA;AACA;AAEA;EACA,gBAAA;EACA,yBAAA;EACA,WAAA;EACA,qBAAA;AACA;AAEA;EACA,gBAAA;EACA,eAAA;EACA,WAAA;AACA","file":"YearPicker.vue","sourcesContent":["<template>\n  <div class=\"year-picker\">\n    <!-- 輸入框，點擊展開或收起選單 -->\n    <div class=\"input-container\">\n      <input v-model=\"inputYear\" type=\"text\" placeholder=\"輸入民國年份或點擊選擇\" @focus=\"showYearPicker = true\"\n        @blur=\"handleBlur\" />\n      <!-- <button class=\"toggle-button\" @click=\"toggleYearPicker\">\n          {{ showYearPicker ? \"▲\" : \"▼\" }}\n        </button> -->\n    </div>\n\n    <!-- 年份選單 -->\n    <div v-if=\"showYearPicker\" class=\"dropdown\">\n      <div class=\"range-header\">\n        <button class=\"btn bg-transparent\" @click=\"prevRange\" :disabled=\"currentRange.start < 1913\">\n          <img width=\"20\" :src=\"icon.prev\" alt=\"\" />\n        </button>\n        <span class=\"range-title\">\n          民國 {{ toTaiwanYear(currentRange.start) }} ~\n          {{ toTaiwanYear(currentRange.end) }}\n        </span>\n        <button class=\"btn bg-transparent\" @click=\"nextRange\">\n          <img width=\"20\" :src=\"icon.next\" alt=\"\" />\n        </button>\n      </div>\n\n      <div class=\"year-grid\">\n        <button v-for=\"year in years\" :key=\"year\" @click=\"selectYear(year)\"\n          :class=\"{ selected: year === selectedYear }\">\n          {{ toTaiwanYear(year) }}\n        </button>\n      </div>\n    </div>\n\n    <!-- 顯示選擇結果 -->\n    <!-- <p v-if=\"selectedYear\">\n        您選擇的年份是：西元 {{ selectedYear }} 年 (民國\n        {{ toTaiwanYear(selectedYear) }} 年)\n      </p> -->\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'YearPicker',\n  props: {\n    year: Number,\n    icon: Object\n  },\n  data() {\n    return {\n      isClickingButton: false, // 是否正在點擊按鈕\n      inputYear: '', // 輸入框內的年份\n      selectedYear: null, // 已選中的年份\n      showYearPicker: false, // 是否顯示年份選單\n      perYear: 12,\n      currentRange: {\n        start: 2020,\n        end: 2029\n      }\n    }\n  },\n  mounted() {\n    this.inputYear = this.year\n  },\n  computed: {\n    // 動態生成範圍內的年份\n    years() {\n      const { start } = this.currentRange\n      return Array.from({ length: this.perYear }, (_, i) => start + i)\n      // const { start, end } = this.currentRange\n      // return Array.from({ length: end - start + 1 }, (_, i) => start + i)\n    }\n  },\n  methods: {\n    // 西元轉民國\n    toTaiwanYear(year) {\n      this.$emit('update:year', year - 1911)\n      return year - 1911\n    },\n    // 民國轉西元\n    toWesternYear(taiwanYear) {\n      return taiwanYear + 1911\n    },\n    // 選擇年份\n    selectYear(year) {\n      this.selectedYear = year\n      this.inputYear = this.toTaiwanYear(year) // 更新輸入框為民國年\n      this.showYearPicker = false // 收起選單\n    },\n    prevRange() {\n      this.isClickingButton = true // 標記正在點擊按鈕\n      if (this.currentRange.start < 1911) return\n      this.currentRange.start -= this.perYear\n      this.currentRange.end -= this.perYear\n      setTimeout(() => (this.isClickingButton = false), 200) // 延遲重置\n    },\n    nextRange() {\n      this.isClickingButton = true // 標記正在點擊按鈕\n      this.currentRange.start += this.perYear\n      this.currentRange.end += this.perYear\n      setTimeout(() => (this.isClickingButton = false), 200) // 延遲重置\n    },\n    // 展開/收起選單\n    toggleYearPicker() {\n      this.showYearPicker = !this.showYearPicker\n    },\n    // 處理輸入框的失焦事件\n    handleBlur() {\n      setTimeout(() => {\n        // 如果不是點擊按鈕，才關閉選單\n        if (!this.isClickingButton) {\n          this.showYearPicker = false\n        }\n      }, 200)\n\n      const year = parseInt(this.inputYear)\n      // 檢查是否為有效的民國年份\n      if (!isNaN(year) && year >= 1 && year <= 300) {\n        this.selectedYear = this.toWesternYear(year)\n      } else {\n        this.inputYear = '' // 清空無效輸入\n      }\n    }\n  }\n}\n</script>\n\n<style scoped>\n.year-picker {\n  font-family: Arial, sans-serif;\n  text-align: center;\n}\n\n.year-picker .input-container {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  position: relative;\n}\n\n.year-picker input {\n  width: 100%;\n  padding: 8px;\n  font-size: 16px;\n  border: 0;\n  border: 1px solid #eee;\n}\n\n.year-picker .toggle-button {\n  padding: 8px 10px;\n  font-size: 16px;\n  border: 1px solid #ccc;\n  background-color: #f0f0f0;\n  border-radius: 4px;\n  cursor: pointer;\n}\n\n.year-picker .toggle-button:hover {\n  background-color: #e0e0e0;\n}\n\n.year-picker .dropdown {\n  position: absolute;\n  /* width: 100%; */\n  background-color: #fff;\n  border: 1px solid #eee;\n  border-radius: 0;\n  z-index: 10;\n}\n\n.year-picker .range-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 14px;\n  padding: 8px;\n  line-height: 20px;\n}\n\n.year-picker .range-header button {\n  background-color: transparent;\n  border: 0;\n  cursor: pointer;\n}\n\n.year-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 10px;\n  padding: 0px 10px 10px 10px;\n}\n\n.year-grid button {\n  padding: 4px 10px;\n  font-size: 16px;\n  outline: 0;\n  border: 0;\n  background: transparent;\n  border-radius: 4px;\n  cursor: pointer;\n}\n\n.year-grid button:hover {\n  background-color: #007bff;\n  color: white;\n  opacity: 0.5;\n  transition: 0.3s;\n}\n\n.year-grid button.selected {\n  transition: 0.3s;\n  background-color: #007bff;\n  color: #fff;\n  border-color: #007bff;\n}\n\np {\n  margin-top: 20px;\n  font-size: 18px;\n  color: #333;\n}\n</style>"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__ = "data-v-0da325ad";
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector);

  return __vue_component__;

}));
