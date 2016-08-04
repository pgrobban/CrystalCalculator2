import angular from 'angular';

export default class StateService {

  constructor() {
    if (Storage) {
      if (!localStorage.treasures) {
        this.model = {};
      } else {
        this.restoreState();
      }
    } else {
      this.saveState = this.restoreState = () => { };
    }
  }

  getModel(key) {
    return this.model[key];
  }

  setModel(key, value) {
    this.model[key] = value;
    this.saveState();
  }

  saveState() {
    localStorage.treasures = angular.toJson(this.model);
  }

  restoreState() {
    this.model = angular.fromJson(localStorage.treasures);
  }

}
