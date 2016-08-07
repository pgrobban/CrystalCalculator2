import _ from 'lodash';

export class MainController {

  constructor($scope, dataJson) {
    $scope.runningFromGithub = window.location.host === 'pgrobban.github.io';

    // init main collections
    const treasureCollectionNames = _.keys(dataJson.uniqueTreasures);
    $scope.treasureTables = _.map(treasureCollectionNames, (collectionName) => ({
      collectionName
    }));

    const selectableTreasureCollectionNames = _.keys(dataJson.selectableTreasures);
    $scope.selectableTreasureTables = _.map(selectableTreasureCollectionNames, (collectionName) => ({
      collectionName
    }));
  }

}
