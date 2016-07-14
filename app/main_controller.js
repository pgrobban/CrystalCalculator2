import { forEach, round } from 'lodash';

export class MainController {

  constructor($scope, dataJson, $timeout) {
    $scope.result = {
      totalCrystals: 0,
      averageCrystals: 0
    };

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
      $timeout(() => {
        let totalCrystals = 0;
        let averageCrystals = 0;

        forEach($scope.treasureTables, (treasureTable) => {
          totalCrystals += treasureTable.totalCrystals;
          averageCrystals += treasureTable.averageCrystals;
        });

        $scope.result = {
          totalCrystals,
          averageCrystals: round(averageCrystals, 2)
        };
      });
    };
  }

}
