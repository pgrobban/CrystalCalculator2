import angular from 'angular';
import TreasureInstance from '../models/treasure_instance';
const app = angular.module('crystalCalculatorApp');

const levelOptions = [{
  value: -1,
  name: "Don't have"
}, {
  value: 0,
  name: '+0 (Unupgraded)'
}, {
  value: 1,
  name: '+1'
}, {
  value: 2,
  name: '+2'
}, {
  value: 3,
  name: '+3'
}, {
  value: 4,
  name: '+4'
}, {
  value: 5,
  name: '+5'
}, {
  value: 6,
  name: '+6'
}, {
  value: 7,
  name: '+7'
}, {
  value: 8,
  name: '+8'
}, {
  value: 9,
  name: '+9'
}
];

class TreasureRowController {

  constructor($scope, TreasureFactory) {
    // this = $scope.vm
    // the treasure model is the static data that holds for all treasures of one kind.
    this.treasureModel = TreasureFactory.$get(this.treasure.name);
    this.treasure.iconUrl = this.treasureModel.getIconUrl();
    // treasure instance holds values specific to an instance of a treasure, such as level.
    this.treasure.treasureInstance = new TreasureInstance(this.treasureModel, this.treasure.level);
    $scope.levelOptions = levelOptions;
  }

  updateTreasureCrystalsValue() {
    this.treasure.treasureInstance.updateCrystalProbability();
    this.recalculateTotalValues();
  }
}

app.controller('TreasureRowController', TreasureRowController);

app.directive('treasure', () => ({
  restrict: 'A',
  templateUrl: '/app/components/treasure-row/views/treasure-row.html',
  bindToController: true,
  controller: TreasureRowController,
  controllerAs: 'vm',
  scope: {
    treasure: '=?',
    recalculateTotalValues: '&'
  }
}));
