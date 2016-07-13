import { forEach } from 'lodash';
import angular from 'angular';
const app = angular.module('crystalCalculatorApp');

class TreasureTableController {

  constructor(dataJson) {
    this.description = dataJson[this.collectionName].description;
    this.treasures = [];
    forEach(Object.keys(dataJson[this.collectionName].treasures), (treasureName) => {
      this.treasures.push({
        name: treasureName
      });
    });
  }

  recalculateTotalValues() {
    let totalCrystals = 0;
    let averageCrystals = 0;

    forEach(this.treasures, (treasure) => {
      totalCrystals += treasure.treasureInstance.crystals;
      averageCrystals += treasure.treasureInstance.average;
    });
    return {
      totalCrystals,
      averageCrystals
    };
  }

}

app.directive('treasureTable', () => ({
  restrict: 'E',
  templateUrl: '/app/components/treasure-table/views/treasure-table.html',
  bindToController: true,
  controller: TreasureTableController,
  controllerAs: 'vm',
  scope: {
    collectionName: '@',
    treasures: '=?'
  }
}));
