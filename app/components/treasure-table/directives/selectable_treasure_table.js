import angular from 'angular';
const app = angular.module('crystalCalculatorApp');

class SelectableTreasureTableController {

  constructor(dataJson, $timeout, StateService) {
    // this == $scope.vm
    this.$timeout = $timeout;
    this.StateService = StateService;
    this.description = dataJson.selectableTreasures[this.collectionName].description;

    if (!StateService.model[this.collectionName] || !StateService.model[this.collectionName].name) {
      StateService.model[this.collectionName] = {};
      this.treasure = null;
      this.selectedTreasure = 'none';
    } else {
      const storedTreasure = StateService.model[this.collectionName];
      this.selectedTreasure = storedTreasure.name;
      this.treasure = {
        name: storedTreasure.name,
        level: storedTreasure.level
      };
    }

    const treasureNamesInThisCollection = Object.keys(dataJson.selectableTreasures[this.collectionName].treasures);
    this.selectableTreasureNames = treasureNamesInThisCollection;

    $timeout(this.triggerTableRecalculateValues.bind(this), 0);
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
    if (this.treasure) {
      this.$timeout(() => {
        this.StateService.model[this.collectionName].level = this.treasure.treasureInstance.level;
        this.StateService.saveState();
      }, 0);
    }
  }

  updateSelectedTreasure() {
    if (this.selectedTreasure === 'none') {
      this.treasure = null;
      this.StateService.model[this.collectionName] = {};
      this.StateService.saveState();
      this.triggerTableRecalculateValues();
    } else {
      this.treasure = null;
      this.$timeout(() => {
        this.treasure = ({
          name: this.selectedTreasure,
          level: this.StateService.model[this.collectionName][this.selectedTreasure] ?
            this.StateService.model[this.collectionName][this.selectedTreasure].level : -1
        });
        this.StateService.model[this.collectionName] = {
          name: this.selectedTreasure,
          level: this.treasure.level
        };
        this.StateService.saveState();
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
    collectionName: '@',
    totalCrystals: '=',
    averageCrystals: '=',
    mainRecalculate: '='
  }
}));
