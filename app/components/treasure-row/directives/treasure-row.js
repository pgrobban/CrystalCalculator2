import angular from 'angular';
import TreasureInstance from '../controllers/treasure-controller';
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
    const treasure = $scope.vm.treasure;

    this._treasureFactory = TreasureFactory.$get(treasure.name);
    this.treasureInstance = new TreasureInstance(treasure);

    $scope.vm.levelOptions = levelOptions;
  }

  getIconUrl() {
    return this._treasureFactory.getIconUrl();
  }

  updateTreasureCrystalsValue() {
    const level = this.treasureInstance.level;
    if (level === -1) {
      this.treasureInstance.value = 0;
    } else {
      const probability = this._treasureFactory.getProbabilityForLevel(level);
      const crystals = this._treasureFactory.getCrystals();
      this.treasureInstance.value = (probability / 100) * crystals;
    }
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
    treasure: '=?'
  }
}));
