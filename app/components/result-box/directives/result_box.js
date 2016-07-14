import angular from 'angular';
const app = angular.module('crystalCalculatorApp');

class ResultBoxController {

  constructor($scope) {
  }

}

app.controller('ResultBoxController', ResultBoxController);

app.directive('resultBox', () => ({
  restrict: 'E',
  templateUrl: '/app/components/result-box/views/result-box.html',
  bindToController: true,
  controller: ResultBoxController,
  controllerAs: 'vm',
  scope: {
    result: '=?'
  }
}));
