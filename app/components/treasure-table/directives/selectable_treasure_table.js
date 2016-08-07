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
  }

  updateSaveState() {
    if (this.treasure && this.treasure.treasureInstance) {
      this.StateService.setModel(this.collectionName, {
        name: this.selectedTreasure,
        level: this.treasure.treasureInstance.level
      });
    } else {
      this.StateService.setModel(this.collectionName, {});
    }
  }

  updateSelectedTreasure() {
    if (this.selectedTreasure === 'none') {
      this.treasure = null;
    } else {
      this.treasure = null; // need to set to null to force deletion of element. otherwise treasureInstance will be normal object
      this.$timeout(() => {
        this.treasure = {
          name: this.selectedTreasure
        };
      }, 0);
    }
    this.updateSaveState();
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
