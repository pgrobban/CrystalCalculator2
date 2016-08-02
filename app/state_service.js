import angular from 'angular';

export class StateService {

  constructor($rootScope) {
    if (Storage) {
      if (!localStorage.treasures) {
        this.model = {};
      } else {
        this.restoreState();
      }

      $rootScope.$on('saveState', this.saveState);
      $rootScope.$on('restoreState', this.restoreState);
    }
  }

  saveState() {
    localStorage.treasures = angular.toJson(this.model);
  }

  restoreState() {
    this.model = angular.fromJson(localStorage.treasures);
  }

}
