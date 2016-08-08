import _ from 'lodash';

export default class GetTreasuresPossessedAsArray {

  constructor(dataJson) {
    this.dataJson = dataJson;
  }

  getTreasuresPossessedAsArray(data) {
    const treasuresObject = _.cloneDeep(data);
    const treasures = [].concat(
      this._getUniqueTreasures(treasuresObject),
      this._getSelectableTreasures(treasuresObject),
      this._getChestTreasures(treasuresObject)
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

}
