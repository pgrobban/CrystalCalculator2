import angular from 'angular';
import { forEach } from 'lodash';
const app = angular.module('crystalCalculatorApp');

class ChestTreasureTableController {

  constructor(dataJson, $timeout) {
    // this == $scope.vm
    this.description = dataJson.chestTreasures.description;
    this.treasures = [];
    this.selectableTreasureNames = Object.keys(dataJson.chestTreasures.treasures);
    this.selectedTreasure = 'none';

    this.totalCrystals = 0;
    this.averageCrystals = 0;
  }

  triggerTableRecalculateValues() {
    let totalCrystals = 0;
    let averageCrystals = 0;

    forEach(this.treasures, (treasure) => {
      totalCrystals += treasure.treasureInstance.crystals;
      averageCrystals += treasure.treasureInstance.average;
    });
    this.totalCrystals = totalCrystals;
    this.averageCrystals = averageCrystals;

    this.mainRecalculate();
  }

  addTreasure(name) {
    
  }

}

app.directive('chestTreasureTable', () => ({
  restrict: 'E',
  templateUrl: '/app/components/chest-treasure-table/views/chest-treasure-table.html',
  bindToController: true,
  controller: ChestTreasureTableController,
  controllerAs: 'vm',
  scope: {
    collectionName: '@',
    totalCrystals: '=',
    averageCrystals: '=',
    mainRecalculate: '='
  }
}));
