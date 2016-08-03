import { forEach } from 'lodash';
import angular from 'angular';
const app = angular.module('crystalCalculatorApp');

class TreasureTableController {

  constructor(dataJson, StateService, $timeout) {
    this.StateService = StateService;
    // this == $scope.vm
    this.description = dataJson.uniqueTreasures[this.collectionName].description;
    this.treasures = [];

    if (!StateService.model[this.collectionName]) {
      StateService.model[this.collectionName] = {};
    }

    const treasureNamesInThisCollection = Object.keys(dataJson.uniqueTreasures[this.collectionName].treasures);
    forEach(treasureNamesInThisCollection, (treasureName) => {
      this.treasures.push({
        name: treasureName,
        level: StateService.model[this.collectionName][treasureName] ? StateService.model[this.collectionName][treasureName].level : -1
        // level shouldn't be here but currently I don't know any way to pass to the treasureInstance instead of treasure
      });
    });
    $timeout(this.triggerTableRecalculateValues.bind(this), 100); // because treasure.treasureInstance is undefined before the directives are created
  }

  triggerTableRecalculateValues() {
    let totalCrystals = 0;
    let averageCrystals = 0;

    this.StateService.model[this.collectionName] = {};
    forEach(this.treasures, (treasure) => {
      totalCrystals += treasure.treasureInstance.crystals;
      averageCrystals += treasure.treasureInstance.average;

      this.StateService.model[this.collectionName][treasure.name] = {
        level: treasure.treasureInstance.level
      };
    });
    this.totalCrystals = totalCrystals;
    this.averageCrystals = averageCrystals;

    this.StateService.saveState();
    this.mainRecalculate();
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
    treasures: '=?',
    totalCrystals: '=',
    averageCrystals: '=',
    mainRecalculate: '='
  }
}));
