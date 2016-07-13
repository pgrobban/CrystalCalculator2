export default class TreasureInstance {

  constructor(treasureModel, level) {
    this.treasureModel = treasureModel;
    if (!level) {
      this.level = -1;
      this.crystals = 0;
      this.average = 0;
    } else {
      this.level = level;
      this.crystals = treasureModel.getCrystals();
      this.average = this._calculateAverage();
    }
  }

  _calculateAverage() {
    const probabilities = this.treasureModel.getCrystalProbabilityPercents();
    return (probabilities[this.level] / 100) * this.crystals;
  }

  updateCrystalProbability() {
    if (this.level === -1) {
      this.crystals = 0;
      this.average = 0;
    } else {
      this.crystals = this.treasureModel.getCrystals();
      this.average = this._calculateAverage();
    }
  }

}
