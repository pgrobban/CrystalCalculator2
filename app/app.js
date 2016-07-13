import angular from 'angular';
import { TreasureFactory } from './components/treasure-row/factories/treasure_factory';
import dataJson from '../data/treasures.json';

const app = angular.module('crystalCalculatorApp', []);

app.value('dataJson', dataJson);
app.factory('TreasureFactory', () => new TreasureFactory(dataJson));

require('./components');
