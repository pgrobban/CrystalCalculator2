import angular from 'angular';
import dataJson from '../data/treasures.json';
import { MainController } from './main_controller';
import * as factories from './factories';
import * as helpers from './helpers';
import * as services from './services';
import { round } from 'lodash';

const app = angular.module('crystalCalculatorApp', []);

app.value('dataJson', dataJson);
app.factory('TreasureFactory', () => new factories.TreasureFactory(dataJson));
app.factory('StateService', ($rootScope, $anchorScroll) => new services.StateService($rootScope, $anchorScroll));
app.factory('GetTreasuresPossessedAsArrayHelper', (dataJson) => new helpers.GetTreasuresPossessedAsArray(dataJson));

app.controller('MainController', ($scope, dataJson, StateService, $timeout, $rootScope) => new MainController($scope, dataJson, StateService, $timeout, $rootScope));

app.filter('round', () => (val) => round(val, 2));

require('./components');

