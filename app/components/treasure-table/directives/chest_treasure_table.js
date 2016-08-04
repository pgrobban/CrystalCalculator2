import angular from 'angular';
import { forEach, map } from 'lodash';
const app = angular.module('crystalCalculatorApp');

class ChestTreasureTableController {

  constructor(dataJson, $timeout, StateService) {
    // this == $scope.vm
    this.StateService = StateService;
    this.description = dataJson.chestTreasures.chestTreasures.description;
    this.selectableTreasureNames = Object.keys(dataJson.chestTreasures.chestTreasures.treasures);
    this.selectedTreasure = 'none';

    this.treasures = [];
    if (!StateService.model[this.collectionName]) {
      StateService.model[this.collectionName] = [];
    } else {
      forEach(StateService.model[this.collectionName], (storedTreasure) => {
        if (storedTreasure) {
          this.treasures.push({
            name: storedTreasure.name,
            level: storedTreasure.level
          });
        }
      });
    }

    $timeout(this.triggerTableRecalculateValues.bind(this), 50);
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

    this.StateService.model[this.collectionName] = map(this.treasures, (treasure) => ({
      name: treasure.name,
      level: treasure.treasureInstance.level
    }));
    this.StateService.saveState();

    this.mainRecalculate();
  }

  chestTreasureSelectChanged() {
    if (this.selectedTreasure === 'none') {
      return;
    } else {
      this.treasures.push({
        name: this.selectedTreasure
      });
      this.selectedTreasure = 'none';
    }
  }

  treasureDeleted(index) {
    this.StateService.model[this.collectionName][index] = undefined;
    this.StateService.saveState();
  }

}

app.directive('chestTreasureTable', () => ({
  restrict: 'E',
  templateUrl: 'app/components/treasure-table/views/chest-treasure-table.html',
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