import angular from 'angular';
import UpgradeRecommendationService from '../services/upgrade_recommendation_service';
const app = angular.module('crystalCalculatorApp');

class RecommendationBoxController {

  constructor($rootScope, dataJson, GetTreasuresPossessedAsArrayHelper) {
    this.result = [];
    const recommendationService = new UpgradeRecommendationService($rootScope, dataJson, GetTreasuresPossessedAsArrayHelper);
    $rootScope.$on('stateChanged', (evt, data) => {
      this.result = recommendationService.getRecommendationList(data);
    });
  }

}

app.controller('RecommendationBoxController', RecommendationBoxController);

app.directive('recommendationBox', () => ({
  restrict: 'E',
  templateUrl: 'app/components/recommendation-box/views/recommendation-box.html',
  bindToController: true,
  controller: RecommendationBoxController,
  controllerAs: 'vm'
}));

