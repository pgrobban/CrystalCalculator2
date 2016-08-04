import _ from 'lodash';

export default class UpgradeRecommendationService {

  constructor($rootScope, dataJson) {
    this.dataJson = dataJson;
    this.treasureDataMemo = {};
  }

  getRecommendationList(model) {
    const treasuresArray = this._getTreasuresArray(model);
    this._addProfitDataToTreasuresArray(treasuresArray);
    const sortedTreasuresArray = this._sortTreasuresArrayBasedOnProfitWhenUpgrading(treasuresArray);
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
      if (model[collection].name && model[collection].level !== -1) {
        treasures.push(model[collection]);
      }
    });
    return treasures;
  }

  _getChestTreasures(model) {
    return _.filter(model.chestTreasures, (treasure) => treasure.level !== -1);
  }

  _addProfitDataToTreasuresArray(treasuresArray) {
    const TREASURE_MAX_LEVEL = 9;
    _.forEach(treasuresArray, (treasure) => {
      if (!this.treasureDataMemo[treasure.name]) {
        this._addTreasureToMemo(treasure.name);
      }
      treasure.icon = this.treasureDataMemo[treasure.name].icon;
      treasure.profitData = {
        currentProfit: this.treasureDataMemo[treasure.name].averageProfitPerDay[treasure.level],
        profitWhenUpgraded: treasure.level === TREASURE_MAX_LEVEL ? null : this.treasureDataMemo[treasure.name].averageProfitPerDay[treasure.level + 1]
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

  _sortTreasuresArrayBasedOnProfitWhenUpgrading(treasuresArray) {
    return _.sortBy(treasuresArray, (treasure) => {
      return treasure.profitData.profitWhenUpgrading;
    }).reverse();
  }

}
