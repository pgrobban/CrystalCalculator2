/* eslint-disable consistent-return */
import { forEach } from 'lodash';

export class TreasureFactory {

  constructor(dataJson) {
    this.dataJson = dataJson;
    this.treasureDataMemo = {}; // map a treasure name as key to data
  }

  $get(name) {
    this.name = name;

    if (!this.treasureDataMemo[name]) {
      this._addTreasureDataToMemo(name);
    }
    return this.treasureDataMemo[name];
  }

  _addTreasureDataToMemo(name) {
    if (!name) {
      throw new Error('_findTreasureDataInJson called without name');
    }

    let found = false;
    forEach(this.dataJson, (superCollection, superCollectionName) => {
      forEach(superCollection, (subCollection, subCollectionName) => {
        forEach(subCollection.treasures, (treasure, treasureName) => {
          if (name === treasureName) {
            this.treasureDataMemo[name] = this.dataJson[superCollectionName][subCollectionName].treasures[name];
            this.treasureDataMemo[name].iconUrl = this._getIconUrl(this.treasureDataMemo[name].icon);
            found = true;
            return false; // will break innermost lodash but need to break all 3 loops to get rid of error handling
          }
        });
      });
    });
    if (!found) {
      throw new Error(`Treasure with name ${name} not in json`);
    }
  }

  _getIconUrl(fileName) {
    const iconBasePath = 'img/';
    return `${iconBasePath}${fileName}`;
  }
}
