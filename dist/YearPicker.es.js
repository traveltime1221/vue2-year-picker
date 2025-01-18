import { openBlock as l, createElementBlock as o, createElementVNode as i, withDirectives as h, vModelText as d, toDisplayString as c, Fragment as g, renderList as Y, normalizeClass as p, createCommentVNode as k } from "vue";
const _ = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [u, n] of t)
    a[u] = n;
  return a;
}, m = {
  props: {
    year: Number,
    icon: Object
  },
  data() {
    return {
      isClickingButton: !1,
      // 是否正在點擊按鈕
      inputYear: "",
      // 輸入框內的年份
      selectedYear: null,
      // 已選中的年份
      showYearPicker: !1,
      // 是否顯示年份選單
      perYear: 12,
      currentRange: {
        start: 2020,
        end: 2029
      }
    };
  },
  mounted() {
    this.inputYear = this.year;
  },
  computed: {
    // 動態生成範圍內的年份
    years() {
      const { start: e } = this.currentRange;
      return Array.from({ length: this.perYear }, (t, a) => e + a);
    }
  },
  methods: {
    // 西元轉民國
    toTaiwanYear(e) {
      return this.$emit("update:year", e - 1911), e - 1911;
    },
    // 民國轉西元
    toWesternYear(e) {
      return e + 1911;
    },
    // 選擇年份
    selectYear(e) {
      this.selectedYear = e, this.inputYear = this.toTaiwanYear(e), this.showYearPicker = !1;
    },
    prevRange() {
      this.isClickingButton = !0, !(this.currentRange.start < 1911) && (this.currentRange.start -= this.perYear, this.currentRange.end -= this.perYear, setTimeout(() => this.isClickingButton = !1, 200));
    },
    nextRange() {
      this.isClickingButton = !0, this.currentRange.start += this.perYear, this.currentRange.end += this.perYear, setTimeout(() => this.isClickingButton = !1, 200);
    },
    // 展開/收起選單
    toggleYearPicker() {
      this.showYearPicker = !this.showYearPicker;
    },
    // 處理輸入框的失焦事件
    handleBlur() {
      setTimeout(() => {
        this.isClickingButton || (this.showYearPicker = !1);
      }, 200);
      const e = parseInt(this.inputYear);
      !isNaN(e) && e >= 1 && e <= 300 ? this.selectedYear = this.toWesternYear(e) : this.inputYear = "";
    }
  }
}, f = { class: "year-picker" }, w = { class: "input-container" }, R = {
  key: 0,
  class: "dropdown"
}, v = { class: "range-header" }, B = ["disabled"], C = ["src"], b = { class: "range-title" }, y = ["src"], P = { class: "year-grid" }, T = ["onClick"];
function x(e, t, a, u, n, s) {
  return l(), o("div", f, [
    i("div", w, [
      h(i("input", {
        "onUpdate:modelValue": t[0] || (t[0] = (r) => n.inputYear = r),
        type: "text",
        placeholder: "輸入民國年份或點擊選擇",
        onFocus: t[1] || (t[1] = (r) => n.showYearPicker = !0),
        onBlur: t[2] || (t[2] = (...r) => s.handleBlur && s.handleBlur(...r))
      }, null, 544), [
        [d, n.inputYear]
      ])
    ]),
    n.showYearPicker ? (l(), o("div", R, [
      i("div", v, [
        i("button", {
          class: "btn bg-transparent",
          onClick: t[3] || (t[3] = (...r) => s.prevRange && s.prevRange(...r)),
          disabled: n.currentRange.start < 1913
        }, [
          i("img", {
            width: "20",
            src: a.icon.right,
            alt: ""
          }, null, 8, C)
        ], 8, B),
        i("span", b, " 民國 " + c(s.toTaiwanYear(n.currentRange.start)) + " ~ " + c(s.toTaiwanYear(n.currentRange.end)), 1),
        i("button", {
          class: "btn bg-transparent",
          onClick: t[4] || (t[4] = (...r) => s.nextRange && s.nextRange(...r))
        }, [
          i("img", {
            width: "20",
            src: a.icon.left,
            alt: ""
          }, null, 8, y)
        ])
      ]),
      i("div", P, [
        (l(!0), o(g, null, Y(s.years, (r) => (l(), o("button", {
          key: r,
          onClick: (N) => s.selectYear(r),
          class: p({ selected: r === n.selectedYear })
        }, c(s.toTaiwanYear(r)), 11, T))), 128))
      ])
    ])) : k("", !0)
  ]);
}
const D = /* @__PURE__ */ _(m, [["render", x], ["__scopeId", "data-v-d855f566"]]);
export {
  D as default
};
