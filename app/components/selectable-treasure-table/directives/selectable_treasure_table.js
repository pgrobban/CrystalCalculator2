import { forEach } from 'lodash';
import angular from 'angular';
const app = angular.module('crystalCalculatorApp');

class SelectableTreasureTableController {

  constructor(dataJson) {
    // this == $scope.vm
    this.description = dataJson.selectableTreasures[this.collectionName].description;
    this.treasure = null;
    const treasureNamesInThisCollection = Object.keys(dataJson.selectableTreasures[this.collectionName].treasures);
    this.selectableTreasureNames = treasureNamesInThisCollection;
    this.selectedTreasure = 'none';

    this.totalCrystals = 0;
    this.averageCrystals = 0;
  }

  recalculateTotalValues() {
    if (!this.treasure) {
      this.totalCrystals = 0;
      this.averageCrystals = 0;
    } else {
      this.totalCrystals = this.treasure.total;
      this.averageCrystals = this.treasure.average;
    }
    this.triggerRecalculate();
  }

  updateSelectedTreasure() {
    if (this.selectedTreasure === 'none') {
      this.treasure = null;
    } else {
      this.treasure = ({
        name: this.selectedTreasure
      });
    }
  }

}

app.directive('selectableTreasureTable', () => ({
  restrict: 'E',
  templateUrl: '/app/components/selectable-treasure-table/views/selectable-treasure-table.html',
  bindToController: true,
  controller: SelectableTreasureTableController,
  controllerAs: 'vm',
  scope: {
    collectionName: '@',
    treasures: '=?',
    totalCrystals: '=',
    averageCrystals: '=',
    triggerRecalculate: '&'
  }
}));
