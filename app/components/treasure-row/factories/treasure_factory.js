/* eslint-disable consistent-return */
import { forEach } from 'lodash';

export class TreasureFactory {

  /* What I want to do is somehow dependency inject dataJson and maybe other dependencies
  to the constructor and have name and other things related to treasures as parameters also.
  But it seems using the get method is the only way. */
  constructor(dataJson) {
    this.dataJson = dataJson;
  }

  $get(name) {
    this.name = name;
    this.treasure = this._findTreasureDataInJson(name);
    return this;
  }

  _findTreasureDataInJson(name) {
    forEach(this.dataJson, (superCollection) => {
      forEach(superCollection, (subCollection) => {
        forEach(subCollection.treasures, (treasure, treasureName) => {
          if (name === treasureName) {
            this.treasureData = treasure;
            return false;
          }
        });
      });
    });
    if (!this.treasureData) {
      throw new Error(`Treasure with name ${name} not in json`);
    }
  }

  getName() {
    return this.name;
  }

  getIconUrl() {
    const iconBasePath = 'img/';
    const iconFile = this.treasureData.icon;
    return `${iconBasePath}${iconFile}`;
  }

  getCrystals() {
    return this.treasureData.crystals;
  }

  getCrystalProbabilityPercents() {
    return this.treasureData.probabilityPercents;
  }
}
