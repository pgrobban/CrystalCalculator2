import angular from 'angular';

const app = angular.module('crystalCalculatorApp');

class TreasureTableController {

  constructor() {
    console.log("aaa")
  }  

}

app.directive('treasureTable', () => ({
  restrict: 'E',
  templateUrl: '/app/components/treasure-table/views/treasure-table.html',
  bindToController: true,
  controller: TreasureTableController,
  controllerAs: 'vm'
}));
