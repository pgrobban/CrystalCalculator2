import { TreasureService } from './components/treasure/services/treasure_service';
import dataJson from '../data/treasures.json';

const app = angular.module('crystalCalculatorApp', []);
app.service('treasureService', () => {
  return new TreasureService(dataJson);
});

require('./components');
