<template>
  <div class="roomsfilter">
    <div
      v-for="rfitem in filterSet"
      :key="rfitem"
      class="form-check form-check-inline"
    >
      <input
        type="checkbox"
        :checked="filterRaw[rfitem]"
        class="btn-check"
        :id="`rooms-filter-${rfitem}`"
        autocomplete="off"
        @change="updateFilter(rfitem, $event)"
      />
      <label class="btn btn-outline-primary" :for="`rooms-filter-${rfitem}`">{{
        rfitem
      }}</label>
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
</style>
