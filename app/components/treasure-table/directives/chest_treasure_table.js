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
    if (!StateService.getModel(this.collectionName)) {
      StateService.setModel(this.collectionName, []);
    } else {
      forEach(StateService.getModel(this.collectionName), (storedTreasure) => {
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

    this.StateService.setModel(this.collectionName, map(this.treasures, (treasure) => ({
      name: treasure.name,
      level: treasure.treasureInstance.level
    })));

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
    const savedTreasures = this.StateService.getModel(this.collectionName);
    savedTreasures[index] = undefined;
    this.StateService.setModel(this.collectionName, savedTreasures);
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
