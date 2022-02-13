<template>
    <input
      class="form-control text-center mx-0 px-1"
      :class="{ 'is-invalid': isInvalid }"
      v-model="stringValue"
      @input.prevent="onInput"
      @blur.prevent="onBlur"
    />
</template>

<script>

export default {
  data() {
    return {
      stringValue: '',
      onInputTimer: null,
      commitTimer: null,
    };
  },
  props: {
    modelValue: Number,
    tofixed: {
      type: Number,
      default: 2,
    },
  },
  watch: {
    modelValue() {
      if (this.toNumber(this.modelValue) !== this.toNumber(this.stringValue)) {
        this.correctStringValue();
      }
    },
  },
  emits: ['update:modelValue'],
  methods: {
    clearOnInputTimer() {
      if (this.onInputTimer) {
        clearTimeout(this.onInputTimer);
        this.onInputTimer = null;
      }
    },
    setDelayedCorrection(delay = 0) {
      this.clearOnInputTimer();
      this.onInputTimer = setTimeout(() => {
        this.correctStringValue();
        this.commit();
      }, delay);
    },
    commit() {
      if (this.commitTimer) {
        clearTimeout(this.commitTimer);
        this.commitTimer = null;
      }
      this.commitTimer = setTimeout(() => {
        this.$emit('update:modelValue', this.toNumber(this.stringValue));
      }, 600);
    },
    onInput() {
      this.setDelayedCorrection(2000);
      this.commit();
    },
    onBlur() {
      this.clearOnInputTimer();
      this.correctStringValue();
    },
    toString(number) {
      return (+(+number).toFixed(this.tofixed)).toString().replace('.', ',');
    },
    toNumber(string) {
      if (typeof string === 'number') return string;
      return +string.replace(',', '.');
    },
    correctStringValue() {
      this.stringValue = !this.isInvalid
        ? this.toString(this.$props.modelValue)
        : '';
    },
  },
  computed: {
    isInvalid() {
      // Введённое пользователем число некорректно
      return Number.isNaN(this.$props.modelValue);
    },
    isValid() {
      // Введённое пользователем число корректно
      return !this.isInvalid;
    },
  },
  mounted() {
    this.stringValue = this.toString(this.modelValue);
    this.correctStringValue();
  },
};
</script>

<style scoped lang="scss">
@import "../_variables.scss";
input {
  color: $text-color;
}
</style>
