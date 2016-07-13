import angular from 'angular';
const app = angular.module('crystalCalculatorApp');

class TreasureController {

  constructor($scope, TreasureFactory) {
    this._treasureFactory = TreasureFactory.$get($scope.vm.name);
    const levelOptions = [{
      value: -1,
      name: "Don't have"
    },
      {
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
        value: 1,
        name: '+7'
      }, {
        value: 1,
        name: '+9'
      }, {
        value: 1,
        name: '+9'
      }
    ];
    $scope.vm.levelOptions = levelOptions;
  }

  getIconUrl() {
    return this._treasureFactory.getIconUrl();
  }
}

app.controller('TreasureController', TreasureController);

app.directive('treasure', () => ({
  restrict: 'A',
  templateUrl: '/app/components/treasure/views/treasure.html',
  bindToController: true,
  controller: TreasureController,
  controllerAs: 'vm',
  scope: {
    name: '@',
    level: '='
  }
}));
