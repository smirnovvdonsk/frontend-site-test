<template>
  <div v-if="rangeSet" class="d-flex flex-column app">
    <div class="filter-title" v-html="title"></div>
    <div class="d-flex flex-row justify-content-between align-items-center">
      <NumberInput size=4 v-model="min" :tofixed="tofixed"/>
      <div class="translucent px-1">-</div>
      <NumberInput size=4 v-model="max" :tofixed="tofixed"/>
    </div>
    <div class="range-slider">
      <div class="range-slider__track-container" ref="widthContainer">
        <div
          class="range-slider__thumb-container"
          :style="{ left: sliderLeft1 }"
          @dragstart="() => false"
          @mousedown="onMouseDown('sliderLeft1', $event)"
          @touchstart="onMouseDown('sliderLeft1', $event)"
        >
          <div class="range-slider__thumb"></div>
        </div>
        <div
          class="range-slider__thumb-container"
          :style="{ left: sliderLeft2 }"
          @dragstart="() => false"
          @mousedown="onMouseDown('sliderLeft2', $event)"
          @touchstart="onMouseDown('sliderLeft2', $event)"
        >
          <div class="range-slider__thumb"></div>
        </div>
        <div class="range-slider__track-fill" :style="{ left: sliderLeft1, width: sliderWidth }"
          ref="fill"
        >
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import NumberInput from './NumberInput.vue';

export default {
  props: {
    title: { type: String, default: 'Безымянный диапазон' },
    setName: String,
    commitName: String,
    tofixed: { type: Number, default: 2 },
  },
  computed: {
    rangeCache() {
      return this.$store.state.filterCache[this.setName];
    },
    rangeSet() {
      return this.$store.getters.filterSet[this.setName];
    },
    min: {
      get() { return Math.max(this.rangeCache.min, this.rangeSet.min); },
      set(value) {
        this.$store.commit(this.commitName, {
          min: Math.min(Math.max(this.rangeSet.min, value), this.max),
          max: this.max,
        });
      },
    },
    max: {
      get() { return Math.min(this.rangeCache.max, this.rangeSet.max); },
      set(value) {
        this.$store.commit(this.commitName, {
          min: this.min,
          max: Math.max(Math.min(this.rangeSet.max, value), this.min),
        });
      },
    },
    sliderScaleSize() { return this.rangeSet.max - this.rangeSet.min; },
    sliderLeft1Size: {
      get() { return this.min - this.rangeSet.min; },
      set(value) { this.min = value + this.rangeSet.min; },
    },
    sliderSize: {
      get() { return this.max - this.min; },
      set(value) { this.max = value + this.min; },
    },
    sliderLeft1: {
      get() { return `${Math.max((this.sliderLeft1Size / this.sliderScaleSize) * 100, 0)}%`; },
      set(value) { this.sliderLeft1Size = (+value.replace('%', '') / 100) * this.sliderScaleSize; },
    },
    sliderWidth() { return `${Math.min((this.sliderSize / this.sliderScaleSize) * 100, 100)}%`; },
    sliderLeft2: {
      get() { return `${Math.min(((this.sliderLeft1Size + this.sliderSize) / this.sliderScaleSize) * 100, 100)}%`; },
      set(value) { this.sliderSize = (+value.replace('%', '') / 100) * this.sliderScaleSize - this.sliderLeft1Size; },
    },
  },
  methods: {
    onMouseDown(valueName, event) {
      function onDragStart() {
        return false;
      }
      document.addEventListener('dragstart', onDragStart);
      const app = this;
      const thumb = event.currentTarget;
      thumb.style.transition = 'none';
      app.$refs.fill.style.transition = 'none';
      const fullWidth = app.$refs.widthContainer.clientWidth;
      const startX = event.pageX || event.changedTouches[0].screenX;
      const startPercent = +app[valueName].replace('%', '');
      function commit(e) {
        const stopX = e.pageX || e.changedTouches[0].screenX;
        const deltaX = stopX - startX;
        const deltaPercent = (deltaX / fullWidth) * 100;
        const finalPercent = startPercent + deltaPercent;
        app[valueName] = `${finalPercent}%`;
      }
      function onMouseMove(e) {
        commit(e);
      }
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('touchmove', onMouseMove);
      function onMouseUp(e) {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('touchmove', onMouseMove);
        commit(e);
        document.removeEventListener('dragstart', onDragStart);
        thumb.style.transition = '';
        app.$refs.fill.style.transition = '';
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('touchend', onMouseUp);
        document.removeEventListener('touchcancel', onMouseUp);
      }
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('touchend', onMouseUp);
      document.addEventListener('touchcancel', onMouseUp);
    },
  },
  components: { NumberInput },
};
</script>

<style scoped lang="scss">
$slider-track-size: 2px;
$slider-thumb-container-size: 24px;
$slider-thumb-size: 16px;
$margin-minimum: calc($slider-thumb-container-size/2);
.app {
  padding-left: $margin-minimum;
  padding-right: $margin-minimum;
}
.translucent {
  opacity: 0.5;
}
.filter-title {
  font-weight: bold;
  font-size: 12px;
  line-height: 28px;
}
.range-slider {
  $margin-y: calc($margin-minimum + 5px);
  margin-top: $margin-y;
  margin-bottom: $margin-y;
  margin-left: 0;
  margin-right: 0;
  .range-slider__track-container {
    background: #D8D8D8;
    padding: 0;
    width: 100%;
    height: $slider-track-size;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    border-radius: calc($slider-track-size/2);
    .range-slider__track-fill {
      background: #70D24E;
      position: absolute;
      margin: 0;
      display: inline;
      height: 100%;
      transition: all 0.5s;
    }
  }
  .range-slider__thumb-container {
    position: absolute;
    margin: 0;
    width: $slider-thumb-container-size;
    height: $slider-thumb-container-size;
    border-radius: 50%;
    z-index: 1;
    top: calc($slider-track-size/2);
    transform: translateY(-50%) translateX(-50%);
    display: inline-block;
    background: white;
    box-shadow: 0px 5px 10px rgba(86, 86, 86, 0.05);
    transition: all 0.5s;
    &:hover {
      background: #70D24E;
      transition: all 0.5s;
    }
    .range-slider__thumb {
      position: absolute;
      margin: 0;
      width: $slider-thumb-size;
      height: $slider-thumb-size;
      border-radius: 50%;
      z-index: 2;
      top: calc($slider-thumb-container-size/2);
      left: calc($slider-thumb-container-size/2);
      transform: translateY(-50%) translateX(-50%);
      //display: inline;
      background: #70D24E;
    }
  }
}
</style>
