import angular from 'angular';
const app = angular.module('crystalCalculatorApp');

class RecommendationBoxController {

}

app.controller('RecommendationBoxController', RecommendationBoxController);

app.directive('recommendationBox', () => ({
  restrict: 'E',
  templateUrl: 'app/components/recommendation-box/views/recommendation-box.html',
  bindToController: true,
  controller: RecommendationBoxController,
  controllerAs: 'vm',
  scope: {
    result: '='
  }
}));

