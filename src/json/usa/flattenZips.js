const loglevel = require('loglevel');
const _ = require('lodash');
const fs = require('fs');

const citiesJson = require('./cities.json');
const ogzips = require('./zipsByStateAndCity.json');
const codeToNameMap = require('./stateNameMap.json');

const flattenOgZips = Promise.all(Object.keys(ogzips).map(statecode => {
  const state = codeToNameMap[statecode];
  const stateObjCities = ogzips[statecode].cities;

  return Object.keys(stateObjCities).map(cityname => {
    const cityAsNum = parseInt(cityname, 10);

    // basically, if we parseInt a string of text, we get NaN
    // if we parse a string of numbers, we get a number
    // some of the entries in the json file are just zip codes with no city
    // we want to strip these ones out
    if (!isNaN(cityname)) return null;

    return {
      city: cityname,
      codes: stateObjCities[cityname],
      state,
    };
  }).filter(row => !!row);
})).then(res => {
  fs.writeFile('cities.json', JSON.stringify(_.flatten(res)), loglevel.error);
  return null;
})
  .catch(loglevel.error);
