import angular from 'angular';
import TreasureInstance from '../models/treasure-instance';
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
    // the treasure instance holds all static data plus unique data for this instance
    // of the treasure, such as level.
    this.treasure = new TreasureInstance(this.treasureModel, this.treasure.level);
    this.levelOptions = levelOptions;
  }

  updateTreasureCrystalsValue() {
    this.treasure.updateCrystalProbability();
    const crystals = this.treasure.crystals;
    const average = this.treasure.average;
    console.log(crystals, average);
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
