const app = angular.module('crystalCalculatorApp');

class TreasureController {
  constructor($scope, treasureService) {
    this._treasureService = treasureService;
  }

  getImage() {
    return 'hello';
  }
}

app.directive('treasure', function() {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: '/app/components/treasure/views/treasure.html',
    controller: TreasureController,
    controllerAs: 'vm'
  };
});
