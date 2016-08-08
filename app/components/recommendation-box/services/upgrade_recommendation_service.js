import _ from 'lodash';

export default class UpgradeRecommendationService {

  constructor($rootScope, dataJson, GetTreasuresPossessedAsArrayHelper) {
    this.dataJson = dataJson;
    this.GetTreasuresPossessedAsArrayHelper = GetTreasuresPossessedAsArrayHelper;
    this.treasureDataMemo = {};
  }

  getRecommendationList(data) {
    const treasuresArray = this.GetTreasuresPossessedAsArrayHelper.getTreasuresPossessedAsArray(data);
    this._addProfitDataToTreasuresArray(treasuresArray);
    const filteredTreasures = this._filterMaxLevelTreasures(treasuresArray);
    const sortedTreasuresArray = this._getSortedTreasuresArray(filteredTreasures);
    return sortedTreasuresArray;
  }

  _filterMaxLevelTreasures(treasuresArray) {
    const MAX_LEVEL = 9;
    return _.filter(treasuresArray, (treasure) => treasure.level !== MAX_LEVEL);
  }

  _addProfitDataToTreasuresArray(treasuresArray) {
    _.forEach(treasuresArray, (treasure) => {
      if (!this.treasureDataMemo[treasure.name]) {
        this._addTreasureToMemo(treasure.name);
      }
      treasure.iconUrl = this.treasureDataMemo[treasure.name].icon;
      treasure.profitData = {
        currentProfit: this.treasureDataMemo[treasure.name].averageProfitPerDay[treasure.level],
        profitWhenUpgraded: this.treasureDataMemo[treasure.name].averageProfitPerDay[treasure.level + 1]
      };
    });
  }

  _addTreasureToMemo(name) {
    const jsonData = this._findTreasureDataInJson(name);
    this.treasureDataMemo[name] = {
      icon: this.getIconUrl(jsonData.icon),
      crystals: jsonData.crystals,
      probabilityPercents: jsonData.probabilityPercents,
      averageProfitPerDay: _.map(jsonData.probabilityPercents, (percent) => jsonData.crystals * (percent / 100))
    };
  }

  getIconUrl(iconFile) {
    const iconBasePath = 'img/';
    return `${iconBasePath}${iconFile}`;
  }

  _findTreasureDataInJson(name) {
    if (!name) {
      throw new Error('_findTreasureDataInJson called without name');
    }

    let data = null;
    _.forEach(this.dataJson, (superCollection) => {
      _.forEach(superCollection, (subCollection) => {
        _.forEach(subCollection.treasures, (treasure, treasureName) => {
          if (name === treasureName) {
            data = treasure;
            return false;
          }
        });
      });
    });
    if (!data) {
      throw new Error(`Treasure with name ${name} not in json`);
    }
    return data;
  }

  _getSortedTreasuresArray(treasuresArray) {
    return _.sortBy(treasuresArray, (treasure) => treasure.profitData.profitWhenUpgraded).reverse();
  }

}
