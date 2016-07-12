const app = angular.module('crystalCalculatorApp');

class TreasureController {
  constructor($scope, TreasureFactory) {
    console.log("*** create", $scope.vm.name);
    this._treasureFactory = TreasureFactory.$get($scope.vm.name);
  }

  getImage() {
    return this._treasureFactory.getImageUrl();
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
      name: '@'
    }
  };
});
