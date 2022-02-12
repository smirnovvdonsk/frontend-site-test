export function arrayToRange(array = [-Infinity, Infinity]) {
  return {
    min: Math.min(...array),
    max: Math.max(...array),
  };
}

export default class Filter {
  constructor({
    rooms = [],
    floorRange = arrayToRange(),
    squareRange = arrayToRange(),
    priceRange = arrayToRange(),
  } = {}) {
    this.rooms = [...rooms];
    this.floorRange = { ...floorRange };
    this.squareRange = { ...squareRange };
    this.priceRange = { ...priceRange };
  }

  get priceRangeMillions() {
    return { min: this.priceRange.min / 1000000, max: this.priceRange.max / 1000000 };
  }

  set priceRangeMillions(value) {
    this.priceRange = { min: value.min * 1000000, max: value.max * 1000000 };
  }

  reset() {
    this.rooms.length = 0;
    ['floorRange', 'squareRange', 'priceRange']
      .forEach((name) => {
        this[name].min = -Infinity;
        this[name].max = Infinity;
      });
  }
}
