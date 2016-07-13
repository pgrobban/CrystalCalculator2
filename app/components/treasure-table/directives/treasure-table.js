import angular from 'angular';

const app = angular.module('crystalCalculatorApp');

class TreasureTableController {

  constructor($scope) {
    $scope.vm.treasures = [
      { name: 'Prophet Cookie\'s Majestic Beard' },
      { name: 'Prophet Cookie\'s Majestic Beard' }
    ];
    console.log($scope.vm);
  }

}

app.directive('treasureTable', () => ({
  restrict: 'E',
  templateUrl: '/app/components/treasure-table/views/treasure-table.html',
  bindToController: true,
  controller: TreasureTableController,
  controllerAs: 'vm',
  scope: {
    treasures: '=?'
  }
}));
