const app = angular.module('crystalCalculatorApp');

class TreasureController {
  constructor() {
    console.log("b");
  }
}

app.directive('treasure', function() {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: '/app/components/treasure/views/treasure.html',
    controller: TreasureController
  };
});
