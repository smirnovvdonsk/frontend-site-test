<template>
  <div class="apartment-card">
    <div v-show="floor" class="floor">{{ floor }} этаж</div>
    <div v-show="rooms" class="rooms">{{ rooms }} {{ roomsWord }}</div>
    <div v-show="square" class="square">{{ square }}м<sup>2</sup></div>
    <div v-show="number" class="number">№{{ number }}</div>
    <img v-show="plan" class="plan" :src="plan" />
    <div v-show="price" class="price">{{ priceTriads }}р.</div>
    <div class="price-per-square-meter">{{ pricePerSquareMeter }}р. за м<sup>2</sup></div>
  </div>
</template>

<script>
export default {
  props: {
    building_id: [Number, String],
    building_name: String,
    floor: Number,
    id: [Number, String],
    is_studio: Number,
    number: [Number, String],
    plan: String,
    porch: Number,
    price: Number,
    rooms: Number,
    size: String,
    square: Number,
    uuid: String,
  },
  computed: {
    roomsWord() {
      let suffix = '';
      const rooms = Math.abs(this.rooms);
      const lastTwoDigits = +rooms
        .toString()
        .split('')
        .reverse()
        .slice(0, 2)
        .reverse()
        .join('');
      const lastDigit = +lastTwoDigits.toString().split('').reverse()[0];
      if (lastTwoDigits < 5 || lastTwoDigits > 20) {
        if (lastDigit === 1) suffix = 'а';
        if (lastDigit >= 2 && lastDigit <= 4) suffix = 'ы';
      }
      return `комнат${suffix}`;
    },
    priceTriads() {
      return this.price.toLocaleString('ru-RU');
    },
    pricePerSquareMeter() {
      return (Math.round(this.price / this.square)).toLocaleString('ru-RU');
    },
  },
};
</script>

<style scoped lang="scss">
.floor {
  @extend .rooms;
  opacity: 0.5;
}
.rooms {
  left: 120px;
  top: 8px;
  font-size: 12px;
  font-weight: bold;
  line-height: 28px;
  color: #2c323a;
}
.square {
  @extend .rooms;
}
.plan {
  width: 188px;
}
.price {
  @extend .rooms;
  font-size: 20px;
}
.price-per-square-meter {
  @extend .price;
  font-size: 12px;
  opacity: 0.5;
}
</style>
