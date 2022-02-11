<template>
  <div v-if="rangeSet">
    <div class="filter-title" v-html="title"></div>
    <input size="3" :value="range.min" @input="updateMin" />
    <span>-</span>
    <input size="3" :value="range.max" @input="updateMax" />
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: 'Безымянный диапазон' },
    setName: String,
    commitName: String,
    toFixed: { type: Number, default: 2 },
  },
  computed: {
    rangeCache() {
      return this.$store.state.filterCache[this.setName];
    },
    rangeSet() {
      return this.$store.getters.filterSet[this.setName];
    },
    range() {
      return {
        min:
          this.rangeCache.min === -Infinity
            ? +this.rangeSet.min.toFixed(this.toFixed)
            : +this.rangeCache.min.toFixed(this.toFixed),
        max:
          this.rangeCache.max === +Infinity
            ? +this.rangeSet.max.toFixed(this.toFixed)
            : +this.rangeCache.max.toFixed(this.toFixed),
      };
    },
  },
  methods: {
    updateMin(e) {
      this.$store.commit(this.commitName, {
        ...this.range,
        min: +e.target.value,
      });
    },
    updateMax(e) {
      this.$store.commit(this.commitName, {
        ...this.range,
        max: +e.target.value,
      });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
