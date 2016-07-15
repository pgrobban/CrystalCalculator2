import { cloneDeep } from 'lodash';

// treasure instance holds values specific to an instance of a treasure, such as level.
export default class TreasureInstance {

  constructor(treasureModel, level) {
    this.treasureModel = cloneDeep(treasureModel);
    if (!level) {
      this.level = -1;
      this.crystals = 0; // a treasure can appear in a row without the player having it, then we set it to be worth 0 crystals to help summation.
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
