<template>
  <div class="card m-4" style="background: #f8f8f8">
    <div class="container">
      <div class="row">
        <div class="col">
          <RoomsFilter/>
          <button @click="applyFilter">Применить</button>
          <button @click="resetFilter">Сбросить фильтр</button>
          <br>filterCache{{ filterCache }}
          <br>filter{{ filter }}
        </div>
      </div>
      <div
        class="
          row row-cols-1 row-cols-lg-auto
          align-items-evenly
          justify-content-start
        "
      >
        <ApaCard v-for="item in filteredTruth" :key="item.uuid" :="item" />
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

export default {
  computed: {
    ...mapState(['filter', 'filterCache']),
    ...mapGetters(['filterSet', 'filteredTruth']),
  },
  methods: {
    ...mapMutations(['applyFilter', 'resetFilter']),
    ...mapActions(['fetch']),
  },
  components: { ApaCard, RoomsFilter },
  mounted() {
    this.fetch();
  },
};
</script>

<style lang="scss">
@import url("/fonts/GothamPro/styles.css");
@import url("/fonts/GothamPro-Bold/styles.css");

@import "bootstrap/scss/_functions";
$font-family-sans-serif: "Gotham Pro", system-ui, -apple-system, "Segoe UI",
  "Liberation Sans", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
  "Apple Color Emoji", "Twemoji Mozilla", "Segoe UI Emoji", "Segoe UI Symbol",
  "Noto Color Emoji";
@import "bootstrap/scss/bootstrap";

body {
  background-color: #2f2e2d;
}

.apartment-card {
  @extend .card;
  @extend .shadow;
  @extend .mx-1;
  @extend .my-2;
  &-header {
    @extend .px-2;
    @extend .py-1;
  }
}

/*
Анимации появлений, скрытий, переходов */

%default-transition {
  transition: all 0.2s ease;
}

%fade {
  opacity: 0;
}

%scale {
  transform: scale(0.1);
}

%slide {
  transform: translateY(-100%);
  &-invert {
    transform: translateY(+100%);
  }
}

@mixin default-transition {
  &-enter,
  &-leave,
  &-invert-enter,
  &-invert-leave {
    &-active {
      @extend %default-transition;
    }
  }
}

@mixin fade {
  @include default-transition;
  &-enter-from,
  &-leave-to,
  &-invert-enter-from,
  &-invert-leave-to {
    @extend %fade;
  }
}

@mixin scale {
  @include default-transition;
  &-enter-from,
  &-leave-to,
  &-invert-enter-from,
  &-invert-leave-to {
    @extend %scale;
  }
}

@mixin slide {
  @include default-transition;
  &-enter-from,
  &-leave-to {
    @extend %slide;
  }
  &-invert-enter-from,
  &-invert-leave-to {
    @extend %slide-invert;
  }
}

.fade {
  @include fade;
  &-scale {
    @include fade;
    @include scale;
  }
}

.slide {
  @include slide;
  &-fade {
    @include fade;
    @include slide;
  }
}

.flip-list {
  &-item {
    @extend %default-transition;
  }
  &-enter-from,
  &-leave-to {
    @extend %fade;
    @extend %scale;
  }
}
</style>
