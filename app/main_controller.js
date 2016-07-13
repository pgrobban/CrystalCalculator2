import { forEach, round } from 'lodash';

export class MainController {

  constructor($scope, dataJson) {
    $scope.totalCrystals = 0;
    $scope.averageCrystals = 0;

    $scope.treasureTables = [{
      collectionName: 'cookiesLevelUpTreasures',
      totalCrystals: 0,
      averageCrystals: 0
    }, {
      collectionName: 'petsLevelUpTreasures',
      totalCrystals: 0,
      averageCrystals: 0
    }];

    $scope.recalculateTotalAndAverage = () => {
      console.log("***aa", $scope.treasureTables);
      $scope.totalCrystals = 0;
      $scope.averageCrystals = 0;

      forEach($scope.treasureTables, (treasureTable) => {
        $scope.totalCrystals += treasureTable.totalCrystals;
        $scope.averageCrystals += treasureTable.averageCrystals;
      });
      $scope.averageCrystals = round($scope.averageCrystals, 2);
    };
  }

}
