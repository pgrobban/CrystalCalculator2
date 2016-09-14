import angular from 'angular';
import { forEach, map } from 'lodash';
import TreasureInstance from '../../treasure-row/models/treasure_instance';
const app = angular.module('crystalCalculatorApp');

class ChestTreasureTableController {

  constructor(dataJson, $timeout, StateService, TreasureFactory) {
    // this == $scope.vm
    this.StateService = StateService;
    this.TreasureFactory = TreasureFactory;
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
    // $timeout(this.updateSaveState.bind(this), 50);
  }

  updateSaveState() {
    this.StateService.setModel(this.collectionName, map(this.treasures, (treasure) => ({
      name: treasure.name,
      level: treasure.treasureInstance.level || -1
    })));
  }

  chestTreasureSelectChanged() {
    if (this.selectedTreasure === 'none') {
      return;
    } else {
      const treasureModel = this.TreasureFactory.$get(this.selectedTreasure);

      this.treasures.push({
        name: this.selectedTreasure,
        treasureInstance: new TreasureInstance(treasureModel, -1)
      });
      this.selectedTreasure = 'none';
      this.updateSaveState();
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
    collectionName: '@'
  }
}));
