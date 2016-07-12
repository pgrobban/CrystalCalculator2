import { TreasureFactory } from './components/treasure/factories/treasure_factory';
import dataJson from '../data/treasures.json';

const app = angular.module('crystalCalculatorApp', []);

app.value('dataJson', dataJson);
app.factory('TreasureFactory', (dataJson) => {
  return new TreasureFactory(dataJson);
});

require('./components');
