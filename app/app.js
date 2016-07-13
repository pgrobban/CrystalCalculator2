import angular from 'angular';
import { TreasureFactory } from './components/treasure-row/factories/treasure_factory';
import dataJson from '../data/treasures.json';
import { MainController } from './main_controller';

const app = angular.module('crystalCalculatorApp', []);

app.value('dataJson', dataJson);
app.factory('TreasureFactory', () => new TreasureFactory(dataJson));
app.controller('MainController', ($scope, dataJson) => new MainController($scope, dataJson));

require('./components');

