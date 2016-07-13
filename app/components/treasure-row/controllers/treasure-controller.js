export default class TreasureInstance {

  constructor(treasure) {
    this.treasure = treasure;

    if (!treasure.level) {
      this.level = -1;
      this.value = 0;
    }
  }

  setCrystalsValue(value) {
    this.value = value;
  }

}
