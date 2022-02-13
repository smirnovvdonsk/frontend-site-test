<template>
  <div class="card outer-card">
    <div
      class="card inner-card m-2 m-xl-4 px-5 py-4"
    >
      <h1>LOREM IPSUM DOLOR SIT</h1>
      <div class="d-flex flex-column align-items-between m-0 p-0">
        <!-- Filters -->
        <div
          class="
            d-flex
            flex-column flex-lg-row
            justify-content-between
            justify-content-xxl-center
            mx-0
          "
          v-if="truth.length"
        >
          <div class="mx-0 mx-lg-1 mx-xl-3">
            <RoomsFilter />
          </div>

          <div
            class="mx-0 mx-lg-1 mx-xl-3"
            v-for="rangeFilter in rangeFilters"
            :key="rangeFilter.setName"
          >
            <RangeFilter :="rangeFilter" />
          </div>

          <div class="flex-lg-grow-1 flex-xxxl-grow-0 mx-0 mx-md-5 m-lg-1 px-5 p-lg-0">
            <button
              type="button"
              class="btn btn-primary w-100 text-light apply-button"
              :class="{ 'apply-blink': filterIsChanged }"
              @click="applyFilter"
            >
              ПРИМЕНИТЬ
            </button>
            <div class="reset-button text-center" @click="resetFilter">
              СБРОСИТЬ ФИЛЬТР
            </div>
          </div>
        </div>
        <!-- Cards -->
        <div class="apa-grid">
          <transition-group name="apa-list-animation">
            <ApaCard v-for="item in filteredTruth" :key="item.uuid" :="item" />
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState, mapGetters, mapMutations, mapActions,
} from 'vuex';
import ApaCard from './components/ApaCard.vue';
import RoomsFilter from './components/RoomsFilter.vue';
import RangeFilter from './components/RangeFilter.vue';

export default {
  computed: {
    ...mapState(['truth', 'filter', 'filterCache']),
    ...mapGetters(['filterSet', 'filteredTruth']),
    rangeFilters() {
      return [
        {
          setName: 'floorRange',
          commitName: 'floorFilter',
          tofixed: 0,
          title: 'ЭТАЖ',
        },
        {
          setName: 'squareRange',
          commitName: 'squareFilter',
          tofixed: 1,
          title: 'ПЛОЩАДЬ, м<sup>2</sup>',
        },
        {
          setName: 'priceRangeMillions',
          commitName: 'priceFilterMillions',
          tofixed: 2,
          title: 'СТОИМОСТЬ, млн.р.',
        },
      ];
    },
    filterIsChanged() {
      return !this.filter.isEqualTo(this.filterCache);
    },
  },
  methods: {
    ...mapMutations(['applyFilter', 'resetFilter', 'floorFilter']),
    ...mapActions(['fetch']),
  },
  components: { ApaCard, RoomsFilter, RangeFilter },
  mounted() {
    setTimeout(() => this.fetch(), 1000);
  },
};
</script>

<style lang="scss">
@import url("/fonts/GothamPro/styles.css");
@import url("/fonts/GothamPro-Bold/styles.css");

@import "./_variables.scss";

@import "bootstrap/scss/bootstrap";

body {
  background-color: $site-background;
  color: $text-color;
}

h1 {
  font-weight: normal;
  font-size: 34px;
  text-align: center;
}

.outer-card {
  background: white;
  border: none;
  border-radius: 10px;
  position: absolute;
  $margin: 10px;
  height: calc(100% - 2 * $margin);
  width: calc(100% - 2 * $margin);
  transform: translate($margin, $margin);
}
.inner-card {
  background: #f8f8f8;
  border: none;
  border-radius: 10px;
  overflow-y: auto;
  height: 100%;
}

.apa-grid {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(230px, 250px));
  justify-content: space-between;
}

.apa-list-animation-move,
.apa-list-animation-enter-active,
.apa-list-animation-leave-active {
  transition: all 0.5s ease;
}
.apa-list-animation-enter-from,
.apa-list-animation-leave-to {
  opacity: 0;
  transform: scale(.1);
}

.apa-list-animation-leave-active {
  position: absolute;
}

.apply-button {
  margin-top: 28px;
  margin-bottom: 14px;
  $padding-y: 7px;
  padding-top: $padding-y;
  padding-bottom: $padding-y;
  font-weight: bold;
  font-size: 14px;
}

.apply-blink {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  0%,
  100% {
    transform: scale(1.05, 1.3);
    box-shadow: 0px 0px 20px $primary;
  }
  50% {
    transform: unset;
    box-shadow: unset;
  }
}

.reset-button {
  font-weight: bold;
  font-size: 10px;
  cursor: pointer;
  text-decoration: underline 1px $primary;
}
</style>
