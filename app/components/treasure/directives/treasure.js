const app = angular.module('crystalCalculatorApp');

class TreasureController {

  constructor($scope, TreasureFactory) {
    this._treasureFactory = TreasureFactory.$get($scope.vm.name);
    const levelOptions = [{
      value: -1,
      name: "Don't have"
    }, {
      value: 0,
      name: '+0 (Unupgraded)'
    }, {
      value: 1,
      name: '+1'
    }];
    $scope.vm.levelOptions = levelOptions;
  }

  getIconUrl() {
    return this._treasureFactory.getIconUrl();
  }
}

app.controller('TreasureController', TreasureController);

app.directive('treasure', function() {
  return {
    restrict: 'A',
    templateUrl: '/app/components/treasure/views/treasure.html',
    bindToController: true,
    controller: TreasureController,
    controllerAs: 'vm',
    scope: {
      name: '@',
      level: '='
    }
  };
});
