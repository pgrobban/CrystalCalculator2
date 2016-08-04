import angular from 'angular';
import { TreasureFactory } from './components/treasure-row/factories/treasure_factory';
import dataJson from '../data/treasures.json';
import { MainController } from './main_controller';
import * as services from './services';
import { round } from 'lodash';
console.log(services)

const app = angular.module('crystalCalculatorApp', []);

app.value('dataJson', dataJson);
app.factory('TreasureFactory', () => new TreasureFactory(dataJson));
app.factory('StateService', () => new services.StateService());
app.controller('MainController', ($scope, dataJson, $timeout) =>
  new MainController($scope, dataJson, $timeout));

app.filter('round', () => (val) => round(val, 2));

require('./components');

