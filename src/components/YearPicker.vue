<template>
  <div class="year-picker">
    <!-- 輸入框，點擊展開或收起選單 -->
    <div class="input-container">
      <input v-model="inputYear" type="text" placeholder="輸入民國年份或點擊選擇" @focus="showYearPicker = true"
        @blur="handleBlur" />
      <!-- <button class="toggle-button" @click="toggleYearPicker">
          {{ showYearPicker ? "▲" : "▼" }}
        </button> -->
    </div>

    <!-- 年份選單 -->
    <div v-if="showYearPicker" class="dropdown">
      <div class="range-header">
        <button class="btn bg-transparent" @click="prevRange" :disabled="currentRange.start < 1913">
          <img width="20" :src="icon.left" alt="" />
        </button>
        <span class="range-title">
          民國 {{ toTaiwanYear(currentRange.start) }} ~
          {{ toTaiwanYear(currentRange.end) }}
        </span>
        <button class="btn bg-transparent" @click="nextRange">
          <img width="20" :src="icon.right" alt="" />
        </button>
      </div>

      <div class="year-grid">
        <button v-for="year in years" :key="year" @click="selectYear(year)"
          :class="{ selected: year === selectedYear }">
          {{ toTaiwanYear(year) }}
        </button>
      </div>
    </div>

    <!-- 顯示選擇結果 -->
    <!-- <p v-if="selectedYear">
        您選擇的年份是：西元 {{ selectedYear }} 年 (民國
        {{ toTaiwanYear(selectedYear) }} 年)
      </p> -->
  </div>
</template>

<script>
export default {
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
    this.inputYear = this.year
  },
  computed: {
    // 動態生成範圍內的年份
    years() {
      const { start } = this.currentRange
      return Array.from({ length: this.perYear }, (_, i) => start + i)
      // const { start, end } = this.currentRange
      // return Array.from({ length: end - start + 1 }, (_, i) => start + i)
    }
  },
  methods: {
    // 西元轉民國
    toTaiwanYear(year) {
      this.$emit('update:year', year - 1911)
      return year - 1911
    },
    // 民國轉西元
    toWesternYear(taiwanYear) {
      return taiwanYear + 1911
    },
    // 選擇年份
    selectYear(year) {
      this.selectedYear = year
      this.inputYear = this.toTaiwanYear(year) // 更新輸入框為民國年
      this.showYearPicker = false // 收起選單
    },
    prevRange() {
      this.isClickingButton = true // 標記正在點擊按鈕
      if (this.currentRange.start < 1911) return
      this.currentRange.start -= this.perYear
      this.currentRange.end -= this.perYear
      setTimeout(() => (this.isClickingButton = false), 200) // 延遲重置
    },
    nextRange() {
      this.isClickingButton = true // 標記正在點擊按鈕
      this.currentRange.start += this.perYear
      this.currentRange.end += this.perYear
      setTimeout(() => (this.isClickingButton = false), 200) // 延遲重置
    },
    // 展開/收起選單
    toggleYearPicker() {
      this.showYearPicker = !this.showYearPicker
    },
    // 處理輸入框的失焦事件
    handleBlur() {
      setTimeout(() => {
        // 如果不是點擊按鈕，才關閉選單
        if (!this.isClickingButton) {
          this.showYearPicker = false
        }
      }, 200)

      const year = parseInt(this.inputYear)
      // 檢查是否為有效的民國年份
      if (!isNaN(year) && year >= 1 && year <= 300) {
        this.selectedYear = this.toWesternYear(year)
      } else {
        this.inputYear = '' // 清空無效輸入
      }
    }
  }
}
</script>

<style scoped>
.year-picker {
  font-family: Arial, sans-serif;
  text-align: center;
}

.year-picker .input-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.year-picker input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 0;
  border: 1px solid #eee;
}

.year-picker .toggle-button {
  padding: 8px 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  border-radius: 4px;
  cursor: pointer;
}

.year-picker .toggle-button:hover {
  background-color: #e0e0e0;
}

.year-picker .dropdown {
  position: absolute;
  /* width: 100%; */
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 0;
  z-index: 10;
}

.year-picker .range-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding: 8px;
  line-height: 20px;
}

.year-picker .range-header button {
  background-color: transparent;
  border: 0;
  cursor: pointer;
}

.year-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 0px 10px 10px 10px;
}

.year-grid button {
  padding: 4px 10px;
  font-size: 16px;
  outline: 0;
  border: 0;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
}

.year-grid button:hover {
  background-color: #007bff;
  color: white;
  opacity: 0.5;
  transition: 0.3s;
}

.year-grid button.selected {
  transition: 0.3s;
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
}

p {
  margin-top: 20px;
  font-size: 18px;
  color: #333;
}
</style>