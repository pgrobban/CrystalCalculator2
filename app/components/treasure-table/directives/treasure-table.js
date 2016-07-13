import angular from 'angular';

const app = angular.module('crystalCalculatorApp');

class TreasureTableController {

  constructor() {
    this.treasures = [
      { name: 'Prophet Cookie\'s Majestic Beard' },
      { name: 'Prophet Cookie\'s Majestic Beard' }
    ];
  }

  recalculateTotalValues() {
    let totalCrystals = 0;
    let averageCrystals = 0;

    this.treasures.forEach((treasure) => {
      totalCrystals += treasure.treasureInstance.crystals;
      averageCrystals += treasure.treasureInstance.average;
    });
    console.log(totalCrystals, averageCrystals)
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
