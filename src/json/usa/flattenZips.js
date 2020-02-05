import loglevel from 'loglevel';
const _ = require('lodash');
const fs = require('fs');

const citiesJson = require('./cities.json');
const ogzips = require('./zipsByStateAndCity.json');
const codeToNameMap = require('./stateNameMap.json');

const flattenOgZips = Promise.all(Object.keys(ogzips).map(statecode => {
  const state = codeToNameMap[statecode];
  const stateObjCities = ogzips[statecode].cities;
  return Object.keys(stateObjCities).map(cityname => ({
    city: cityname,
    codes: stateObjCities[cityname],
    state,
  }));
})).then(res => {
  fs.writeFile('cities.json', JSON.stringify(_.flatten(res)), loglevel.error);
  return null;
})
  .catch(loglevel.error);
