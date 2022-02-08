<template>
  <div v-for="item in truth" :key="item.id">
    {{ item.id }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: mapState(['truth']),
  name: 'App',
  components: {},
  mounted() {
    this.$store.dispatch('fetch');
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
