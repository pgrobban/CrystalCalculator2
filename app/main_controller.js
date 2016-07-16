import _ from 'lodash';

export class MainController {

  constructor($scope, dataJson, $timeout) {
    $scope.result = {
      totalCrystals: 0,
      averageCrystals: 0
    };

    // init main collections
    const treasureCollectionNames = _.keys(dataJson.uniqueTreasures);
    $scope.treasureTables = _.map(treasureCollectionNames, (collectionName) => ({
      collectionName,
      totalCrystals: 0,
      averageCrystals: 0
    }));

    const selectableTreasureCollectionNames = _.keys(dataJson.selectableTreasures);
    $scope.selectableTreasureTables = _.map(selectableTreasureCollectionNames, (collectionName) => ({
      collectionName,
      totalCrystals: 0,
      averageCrystals: 0
    }));

    $scope.recalculateTotalAndAverage = () => {
      $timeout(() => {
        let totalCrystals = 0;
        let averageCrystals = 0;

        _.forEach(_.concat($scope.treasureTables, $scope.selectableTreasureTables), (treasureTable) => {
          totalCrystals += treasureTable.totalCrystals;
          averageCrystals += treasureTable.averageCrystals;
        });

        $scope.result = {
          totalCrystals,
          averageCrystals: _.round(averageCrystals, 2)
        };
      });
    };
  }

}
