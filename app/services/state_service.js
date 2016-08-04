import angular from 'angular';

export default class StateService {

  constructor($rootScope) {
    this.$rootScope = $rootScope;
    if (Storage) {
      if (!localStorage.treasures) {
        this.model = {};
      } else {
        this.restoreState();
      }
    } else {
      this.model = {};
    }
  }

  getModel(key) {
    return this.model[key];
  }

  setModel(key, value) {
    this.model[key] = value;
    this.$rootScope.$emit('stateChanged', this.model);
    this.saveState();
  }

  saveState() {
    if (Storage) {
      localStorage.treasures = angular.toJson(this.model);
    }
  }

  restoreState() {
    this.model = angular.fromJson(localStorage.treasures);
  }

}
