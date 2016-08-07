import angular from 'angular';
const app = angular.module('crystalCalculatorApp');

class SelectableTreasureTableController {

  constructor(dataJson, $timeout, StateService) {
    // this == $scope.vm
    this.$timeout = $timeout;
    this.StateService = StateService;
    this.description = dataJson.selectableTreasures[this.collectionName].description;

    if (!StateService.getModel(this.collectionName) || !StateService.getModel(this.collectionName).name) {
      StateService.setModel(this.collectionName, {});
      this.treasure = null;
      this.selectedTreasure = 'none';
    } else {
      const storedTreasure = StateService.getModel(this.collectionName);
      this.selectedTreasure = storedTreasure.name;
      this.treasure = {
        name: storedTreasure.name,
        level: storedTreasure.level
      };
    }

    const treasureNamesInThisCollection = Object.keys(dataJson.selectableTreasures[this.collectionName].treasures);
    this.selectableTreasureNames = treasureNamesInThisCollection;

    $timeout(this.triggerTableRecalculateValues.bind(this), 100);
  }

  triggerTableRecalculateValues() {
    if (!this.treasure || !this.treasure.treasureInstance) {
      this.totalCrystals = 0;
      this.averageCrystals = 0;
    } else {
      this.totalCrystals = this.treasure.treasureInstance.crystals;
      this.averageCrystals = this.treasure.treasureInstance.average;
    }
    if (this.treasure) {
      this.$timeout(() => {
        this.StateService.setModel(this.collectionName, {
          name: this.selectedTreasure,
          level: this.treasure.treasureInstance.level
        });
      }, 50);
    } else {
      this.StateService.setModel(this.collectionName, {});
    }
  }

  updateSelectedTreasure() {
    if (this.selectedTreasure === 'none') {
      this.treasure = null;
      this.StateService.setModel(this.collectionName, {});
      this.triggerTableRecalculateValues();
    } else {
      this.treasure = null;
      this.$timeout(() => {
        const storedTreasure = this.StateService.getModel(this.collectionName)[this.selectedTreasure];
        this.treasure = {
          name: this.selectedTreasure,
          level: storedTreasure ? storedTreasure.level : -1
        };
        this.StateService.setModel(this.collectionName, {
          name: this.selectedTreasure,
          level: this.treasure.level
        });
        this.triggerTableRecalculateValues();
      });
    }
  }

}

app.directive('selectableTreasureTable', () => ({
  restrict: 'E',
  templateUrl: 'app/components/treasure-table/views/selectable-treasure-table.html',
  bindToController: true,
  controller: SelectableTreasureTableController,
  controllerAs: 'vm',
  scope: {
    collectionName: '@'
  }
}));
