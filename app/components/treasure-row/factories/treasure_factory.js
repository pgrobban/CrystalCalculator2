export class TreasureFactory {

  /* What I want to do is somehow dependency inject dataJson and maybe other dependencies
  to the constructor and have name and other things related to treasures as parameters also.
  But it seems using the get method is the only way. */
  constructor(dataJson) {
    this.dataJson = dataJson;
  }

  $get(name) {
    this.name = name;
    return this;
  }

  getName() {
    return this.name;
  }

  getIconUrl() {
    const iconBasePath = 'img/';
    const iconFile = this.dataJson.cookiesLevelUpTreasures.treasures[this.name].icon;
    return `${iconBasePath}${iconFile}`;
  }

  getCrystals() {
    return this.dataJson.cookiesLevelUpTreasures.treasures[this.name].crystals;
  }

  getCrystalProbabilityPercents() {
    return this.dataJson.cookiesLevelUpTreasures.treasures[this.name].probabilityPercents;
  }
}
