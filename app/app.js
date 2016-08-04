import angular from 'angular';
import { TreasureFactory } from './components/treasure-row/factories/treasure_factory';
import dataJson from '../data/treasures.json';
import { MainController } from './main_controller';
import { StateService } from './state_service';
import { round } from 'lodash';

const app = angular.module('crystalCalculatorApp', []);

app.value('dataJson', dataJson);
app.factory('TreasureFactory', () => new TreasureFactory(dataJson));
app.factory('StateService', () => new StateService());
app.controller('MainController', ($scope, dataJson, $timeout) =>
  new MainController($scope, dataJson, $timeout));

app.filter('round', () => (val) => round(val, 2));

require('./components');

