import { forEach } from 'lodash';
import angular from 'angular';
const app = angular.module('crystalCalculatorApp');

class TreasureTableController {

  constructor(dataJson) {
    this.description = dataJson[this.collectionName].description;
    this.treasures = [];
    const treasureNamesInThisCollection = Object.keys(dataJson[this.collectionName].treasures);
    forEach(treasureNamesInThisCollection, (treasureName) => {
      this.treasures.push({
        name: treasureName
      });
    });
    this.totalCrystals = 0;
    this.averageCrystals = 0;
  }

  recalculateTotalValues() {
    let totalCrystals = 0;
    let averageCrystals = 0;

    forEach(this.treasures, (treasure) => {
      totalCrystals += treasure.treasureInstance.crystals;
      averageCrystals += treasure.treasureInstance.average;
    });
    this.totalCrystals = totalCrystals;
    this.averageCrystals = averageCrystals;
    this.triggerRecalculate();
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
    treasures: '=?',
    totalCrystals: '=',
    averageCrystals: '=',
    triggerRecalculate: '&'
  }
}));
