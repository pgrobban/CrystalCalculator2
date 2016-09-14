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
    const filteredTreasures = this._filterMaxLevelTreasures(treasuresArray);
    const sortedTreasuresArray = this._getSortedTreasuresArray(filteredTreasures);
    return sortedTreasuresArray;
  }

  _filterMaxLevelTreasures(treasuresArray) {
    const MAX_LEVEL = 9;
    return _.filter(treasuresArray, (treasure) => treasure.level !== MAX_LEVEL);
  }

  _getSortedTreasuresArray(treasuresArray) {
    return _.sortBy(treasuresArray, (treasure) => treasure.profitData.profitWhenUpgraded).reverse();
  }

}
