import { forEach } from 'lodash';
import angular from 'angular';
const app = angular.module('crystalCalculatorApp');

class TreasureTableController {

  constructor(dataJson, StateService, $timeout) {
    this.StateService = StateService;
    // this == $scope.vm
    this.description = dataJson.uniqueTreasures[this.collectionName].description;
    this.treasures = [];

    if (!StateService.getModel(this.collectionName)) {
      StateService.setModel(this.collectionName, {});
    }

    const treasureNamesInThisCollection = Object.keys(dataJson.uniqueTreasures[this.collectionName].treasures);
    forEach(treasureNamesInThisCollection, (treasureName) => {
      this.treasures.push({
        name: treasureName,
        level: StateService.getModel(this.collectionName)[treasureName] ? StateService.getModel(this.collectionName)[treasureName].level : -1
        // level shouldn't be here but currently I don't know any way to pass to the treasureInstance instead of treasure
      });
    });
  }

  updateSaveState() {
    const saveModel = this.StateService.getModel(this.collectionName);
    forEach(this.treasures, (treasure) => {
      saveModel[treasure.name] = {
        level: treasure.treasureInstance.level
      };
    });
    this.StateService.setModel(this.collectionName, saveModel);
  }

}

app.directive('treasureTable', () => ({
  restrict: 'E',
  templateUrl: 'app/components/treasure-table/views/treasure-table.html',
  bindToController: true,
  controller: TreasureTableController,
  controllerAs: 'vm',
  scope: {
    collectionName: '@',
    treasures: '=?'
  }
}));
