<template>
  <div class="d-flex flex-column justify-content-start app">
    <div class="filter-title my-0">КОМНАТЫ</div>
    <div class="grid">
      <div
        v-for="rfitem in filterSet"
        :key="rfitem"
        class="form-check check m-0 mb-1 p-0"
      >
        <input
          type="checkbox"
          :checked="filterRaw[rfitem]"
          class="btn-check"
          :id="`rooms-filter-${rfitem}`"
          autocomplete="off"
          @change="updateFilter(rfitem, $event)"
        />
        <label
          class="btn btn-outline-primary"
          :for="`rooms-filter-${rfitem}`"
        >
          {{rfitem}}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  computed: {
    filterRaw() {
      const { rooms } = this.$store.state.filterCache;
      return Object.assign(
        {},
        ...rooms.map((name) => ({
          [name]: true,
        })),
      );
    },
    filterSet() {
      return this.$store.getters.filterSet.rooms;
    },
  },
  methods: {
    updateFilter(key, event) {
      const { commit } = this.$store;
      const payload = { [key]: event.target.checked };
      commit('roomsFilter', payload);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../_variables.scss";
.app {
  padding-left: 12px;
  padding-right: 12px;
}
.filter-title {
  font-weight: bold;
  font-size: 12px;
  line-height: 28px;
}
.grid {
  display: grid;
  grid-auto-flow: column;
  //grid-auto-columns: minmax(40px, 1fr);
  grid-gap: 4px;
  justify-content: start;
}
label {
  font-weight: bold;
  font-size: 16px;
  width: 100%;
  color: $text-color;
  &:hover {
    //color: white;
    background: lighten($primary, 30%);
  }
  border-color: #D8D8D8;
  background: white;
}
.btn-check:checked + .btn-outline-primary {
  color: white;
}
</style>
