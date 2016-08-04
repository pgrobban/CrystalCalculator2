import _ from 'lodash'

export default class UpgradeRecommendationService {

  constructor($rootScope, dataJson) {
    this.dataJson = dataJson;
    $rootScope.$on('stateChanged', (evt, data) => this.getRecommendationList(data));
  }

  getRecommendationList(model) {
    const treasuresArray = this._getTreasuresArray(model);
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


}
