export default class TreasureInstance {

  constructor(treasureModel, level) {
    this.name = treasureModel.name;
    this.iconUrl = treasureModel.getIconUrl();
    this.crystalsWhenPosessed = treasureModel.getCrystals();
    this.crystalProbabilities = treasureModel.getCrystalProbabilityPercents();

    if (!level) {
      this.level = -1;
      this.crystals = 0;
      this.average = 0;
    } else {
      this.level = level;
      this.crystals = this.crystalsWhenPosessed;
      this.average = this._calculateAverage();
    }
  }

  _calculateAverage() {
    return (this.crystalProbabilities[this.level] / 100) * this.crystals;
  }

  updateCrystalProbability() {
    if (this.level === -1) {
      this.crystals = 0;
      this.average = 0;
    } else {
      this.crystals = this.crystalsWhenPosessed;
      this.average = this._calculateAverage();
    }
  }

}
