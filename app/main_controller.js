/* eslint-disable no-alert*/
import _ from 'lodash';

export class MainController {

  constructor($scope, dataJson, StateService, $timeout, $rootScope) {
    // init main collections
    const treasureCollectionNames = _.keys(dataJson.uniqueTreasures);
    $scope.treasureTables = _.map(treasureCollectionNames, (collectionName) => ({
      collectionName
    }));

    const selectableTreasureCollectionNames = _.keys(dataJson.selectableTreasures);
    $scope.selectableTreasureTables = _.map(selectableTreasureCollectionNames, (collectionName) => ({
      collectionName
    }));

    $scope.confirmAndClearData = () => {
      if (!confirm('Really clear all data? This action cannot be undone.')) {
        return;
      }
      StateService.clearState();
    };

    $timeout(() => {
      $rootScope.$emit('stateChanged', StateService.model); // hack
    }, 100);

    const result = {}; // for result-box
  }

}
