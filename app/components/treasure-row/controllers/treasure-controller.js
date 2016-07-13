export default class TreasureInstance {

  constructor(treasureModel, level) {
    this.crystals = treasureModel.getCrystals();

    if (!level) {
      this.level = -1;
      this.average = 0;
    }
  }

  setAverageCrystalsValue(average) {
    this.average = average;
  }

}
