import angular from 'angular';
const app = angular.module('crystalCalculatorApp');

class ResultBoxController {

}

app.controller('ResultBoxController', ResultBoxController);

app.directive('resultBox', () => ({
  restrict: 'E',
  templateUrl: 'app/components/result-box/views/result-box.html',
  bindToController: true,
  controller: ResultBoxController,
  controllerAs: 'vm',
  scope: {
    result: '=?'
  }
}));
