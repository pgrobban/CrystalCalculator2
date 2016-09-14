import { map } from 'lodash';

// treasure instance holds values specific to an instance of a treasure, such as level.
export default class TreasureInstance {

  constructor(treasureModel, level) {
    this.treasureModel = treasureModel;

    if (!level || level === -1) {
      this.level = -1;
    } else {
      this.level = level;
    }

    const crystals = treasureModel.crystals;
    this.profitData = {
      crystals
    };
    this.updateProfitData();
  }

  updateProfitData() {
    this.profitData.averageProfitPerDay = map(this.treasureModel.probabilityPercents, (per) => (per * this.profitData.crystals) / 100);
    this.profitData.currentProfit = this.profitData.averageProfitPerDay[this.level];
    this.profitData.profitWhenUpgraded = this.profitData.averageProfitPerDay[this.level + 1];
  }

}
