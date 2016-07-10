import dataJson from '../data/treasures.json';
import _ from 'lodash';

_.forEach(dataJson, (jsonKey) => {
    console.log(jsonKey);
});