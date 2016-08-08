import angular from 'angular';
import _ from 'lodash';
const app = angular.module('crystalCalculatorApp');

class ResultBoxController {

  constructor($rootScope, GetTreasuresPossessedAsArrayHelper, dataJson) {
    this.GetTreasuresPossessedAsArrayHelper = GetTreasuresPossessedAsArrayHelper;
    this.dataJson = dataJson;
    this.treasureDataMemo = {};
    this.result = {
      totalCrystals: 0,
      averageCrystalsSum: 0
    };
    $rootScope.$on('stateChanged', (evt, data) => this.updateResult(data));
  }

  updateResult(newData) {
    const treasuresArray = this.GetTreasuresPossessedAsArrayHelper.getTreasuresPossessedAsArray(newData);
    this.result = this._getTotalAndAverageCrystals(treasuresArray);
  }

  _getTotalAndAverageCrystals(treasuresArray) {
    let totalCrystals = 0;
    let averageCrystalsSum = 0;

    _.forEach(treasuresArray, (treasure) => {
      if (!this.treasureDataMemo[treasure.name]) {
        this._addTreasureToMemo(treasure.name);
      }

      totalCrystals += this.treasureDataMemo[treasure.name].crystals;
      averageCrystalsSum += this.treasureDataMemo[treasure.name].averageProfitPerDay[treasure.level];
    });

    return {
      totalCrystals,
      averageCrystalsSum
    };
  }

  _addTreasureToMemo(name) {
    const jsonData = this._findTreasureDataInJson(name);
    this.treasureDataMemo[name] = {
      crystals: jsonData.crystals,
      probabilityPercents: jsonData.probabilityPercents,
      averageProfitPerDay: _.map(jsonData.probabilityPercents, (percent) => jsonData.crystals * (percent / 100))
    };
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


}

app.controller('ResultBoxController', ResultBoxController);

app.directive('resultBox', () => ({
  restrict: 'E',
  templateUrl: 'app/components/result-box/views/result-box.html',
  bindToController: true,
  controller: ResultBoxController,
  controllerAs: 'vm',
  scope: {
    result: '='
  }
}));
