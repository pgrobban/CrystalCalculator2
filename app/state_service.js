import angular from 'angular';

export class StateService {

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

  saveState() {
    localStorage.treasures = angular.toJson(this.model);
  }

  restoreState() {
    this.model = angular.fromJson(localStorage.treasures);
  }

}
