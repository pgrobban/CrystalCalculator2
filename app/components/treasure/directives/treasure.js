import angular from 'angular';

const app = angular.module('crystalCalculatorApp');

function TreasureController() {
  console.log("aaa")
}

app.directive('treasure', function() {
  return {
    restrict: 'A',
    templateUrl: '/app/components/treasure/views/treasure.html',
    controller: TreasureController
  };
});
