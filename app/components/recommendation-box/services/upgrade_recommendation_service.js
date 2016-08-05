import _ from 'lodash';

export default class UpgradeRecommendationService {

  constructor($rootScope, dataJson) {
    this.dataJson = dataJson;
    this.treasureDataMemo = {};
  }

  getRecommendationList(model) {
    const treasuresArray = this._getTreasuresArray(model);
    this._addProfitDataToTreasuresArray(treasuresArray);
    const filteredTreasures = this._filterMaxLevelTreasures(treasuresArray);
    const sortedTreasuresArray = this._getSortedTreasuresArray(filteredTreasures);
    return sortedTreasuresArray;
  }

  _getTreasuresArray(model) {
    const treasures = [].concat(
      this._getUniqueTreasures(model),
      this._getSelectableTreasures(model),
      this._getChestTreasures(model)
    );
    return treasures;
  }

  _getUniqueTreasures(model) {
    const treasures = [];
    const uniqueTreasureCollections = _.keys(this.dataJson.uniqueTreasures);
    _.forEach(uniqueTreasureCollections, (collection) => {
      _.forEach(model[collection], (treasure, name) => {
        if (treasure.level !== -1) {
          treasures.push({
            name,
            level: treasure.level
          });
        }
      });
    });
    return treasures;
  }

  _getSelectableTreasures(model) {
    const treasures = [];
    const selectableTreasureCollections = _.keys(this.dataJson.selectableTreasures);
    _.forEach(selectableTreasureCollections, (collection) => {
      if (model[collection] && model[collection].name && model[collection].level !== -1) {
        treasures.push(model[collection]);
      }
    });
    return treasures;
  }

  _getChestTreasures(model) {
    return _.filter(model.chestTreasures, (treasure) => treasure && treasure.level !== -1);
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
