<template>
  <div class="d-flex flex-column
    justify-content-between align-items-stretch
    card shadow mx-1 my-2 p-0 component"
  >

          <div class="d-flex justify-content-between m-2">
            <div v-show="floor" class="translucent">{{ floor }} этаж</div>
            <div class="d-flex flex-row">
              <div v-show="rooms">{{ rooms }} {{ roomsWord }}</div>
              <div v-show="rooms && square" class="translucent mx-1">-</div>
              <div v-show="square">{{ square }}м<sup>2</sup></div>
            </div>
          </div>

          <div class="d-flex flex-column number-and-plan m-2 my-0 p-0">
            <div v-show="number" class="number align-self-end px-2">№{{ number }}</div>
            <div class="plan align-self-center text-center">
              <img v-show="plan" class="img-fluid m-0" :src="plan" />
            </div>
          </div>

          <div class="d-flex flex-column align-items-end m-2 px-0">
            <div v-show="price" class="price">{{ priceTriads }}р.</div>
            <div class="price-per-square-meter">{{ pricePerSquareMeter }}р. за м<sup>2</sup></div>
            <div class="align-self-stretch m-0 mt-2 p-0 details">
              <button type="button"
                class="btn btn-primary w-100 text-light"
              >
                ПОДРОБНЕЕ
              </button>
            </div>
          </div>

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
$plan-height: 188px;
%font {
  font-weight: bold;
  line-height: 28px;
  font-size: 12px;
}

@keyframes fade {
  0% {
    transform: scale(0.01);
  }
  100% {
    transform: scale(1.0);
  }
}

.component {
  @extend %font;
  height: 350px;
  &:hover {
    .details {
      button {
        display: unset;
      }
    }
    .plan {
      height: calc($plan-height - 50px);
      img {
        height: calc($plan-height - 50px);
      }
    }
  }
}
.translucent  {
  opacity: 0.5;
}
%plan-border {
  border: 1px solid #EBEBEB;
}
$plan-border-radius: 5px;
.number-and-plan {
  @extend %plan-border;
  border-radius: $plan-border-radius;
}
.number {
  font-size: 14px;
  @extend %plan-border;
  border-top: none;
  border-right: none;
  border-bottom-left-radius: $plan-border-radius;
}
.plan {
  //width: 230px;
  height: $plan-height;
  margin-right: $plan-border-radius;
  margin-left: $plan-border-radius;
  margin-bottom: $plan-border-radius;
}
.price {
  font-size: 20px;
}
.price-per-square-meter {
  font-size: 12px;
  @extend .translucent;
}
.details {
  button {
    @extend %font;
    display: none;
    animation: 0.3s fade;
    font-size: 14px;
    border-radius: 2px;
    border-bottom-left-radius: $plan-border-radius;
    border-bottom-right-radius: $plan-border-radius;
  }
}
</style>
