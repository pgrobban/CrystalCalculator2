import angular from 'angular';
const app = angular.module('crystalCalculatorApp');

class SelectableTreasureTableController {

  constructor(dataJson, $timeout) {
    // this == $scope.vm
    this.$timeout = $timeout;
    this.description = dataJson.selectableTreasures[this.collectionName].description;
    this.treasure = null;

    const treasureNamesInThisCollection = Object.keys(dataJson.selectableTreasures[this.collectionName].treasures);
    this.selectableTreasureNames = treasureNamesInThisCollection;
    this.selectedTreasure = 'none';

    this.totalCrystals = 0;
    this.averageCrystals = 0;
  }

  triggerTableRecalculateValues() {
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
      this.treasure = null;
      this.$timeout(() => {
        this.treasure = ({
          name: this.selectedTreasure
        });
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
    totalCrystals: '=',
    averageCrystals: '=',
    triggerRecalculate: '&'
  }
}));
