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
    if (!this.treasure || !this.treasure.treasureInstance) {
      this.totalCrystals = 0;
      this.averageCrystals = 0;
    } else {
      this.totalCrystals = this.treasure.treasureInstance.crystals;
      this.averageCrystals = this.treasure.treasureInstance.average;
    }
    this.mainRecalculate();
  }

  updateSelectedTreasure() {
    if (this.selectedTreasure === 'none') {
      this.treasure = null;
      this.triggerTableRecalculateValues();
    } else {
      this.treasure = null;
      this.$timeout(() => {
        this.treasure = ({
          name: this.selectedTreasure
        });
        this.triggerTableRecalculateValues();
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
    mainRecalculate: '='
  }
}));
