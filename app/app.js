import angular from 'angular';
import { TreasureFactory } from './components/treasure-row/factories/treasure_factory';
import dataJson from '../data/treasures.json';
import { MainController } from './main_controller';
import { round } from 'lodash';

const app = angular.module('crystalCalculatorApp', []);

if (Storage) {
  if (!localStorage.treasures) {
    localStorage.treasures = '{}';
  }
}

app.value('dataJson', dataJson);
app.factory('TreasureFactory', () => new TreasureFactory(dataJson));
app.controller('MainController', ($scope, dataJson, $timeout) =>
  new MainController($scope, dataJson, $timeout));

app.filter('round', () => (val) => round(val, 2));

require('./components');

