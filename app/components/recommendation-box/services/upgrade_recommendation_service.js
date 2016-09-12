/* eslint-disable consistent-return */
import _ from 'lodash';

export default class UpgradeRecommendationService {

  constructor($rootScope, dataJson, GetTreasuresPossessedAsArrayHelper, TreasureFactory) {
    this.dataJson = dataJson;
    this.GetTreasuresPossessedAsArrayHelper = GetTreasuresPossessedAsArrayHelper;
    this.TreasureFactory = TreasureFactory;
  }

  getRecommendationList(data) {
    const treasuresArray = this.GetTreasuresPossessedAsArrayHelper.getTreasuresPossessedAsArray(data);
    this._addProfitData(treasuresArray);
    const filteredTreasures = this._filterMaxLevelTreasures(treasuresArray);
    const sortedTreasuresArray = this._getSortedTreasuresArray(filteredTreasures);
    return sortedTreasuresArray;
  }

  _filterMaxLevelTreasures(treasuresArray) {
    const MAX_LEVEL = 9;
    return _.filter(treasuresArray, (treasure) => treasure.level !== MAX_LEVEL);
  }

  _addProfitData(treasuresArray) {
    _.forEach(treasuresArray, (treasure) => {
      const crystals = this.TreasureFactory.$get(treasure.name).crystals;
      treasure.profitData = {
        averageProfitPerDay: _.map(this.TreasureFactory.$get(treasure.name).probabilityPercents, (per) => (per * crystals) / 100)
      };
      treasure.profitData.currentProfit = treasure.profitData.averageProfitPerDay[treasure.level];
      treasure.profitData.profitWhenUpgraded = treasure.profitData.averageProfitPerDay[treasure.level + 1];
      treasure.iconUrl = this.TreasureFactory.treasureDataMemo[treasure.name].iconUrl;
    });
  }

  _getSortedTreasuresArray(treasuresArray) {
    return _.sortBy(treasuresArray, (treasure) => treasure.profitData.profitWhenUpgraded).reverse();
  }

}
