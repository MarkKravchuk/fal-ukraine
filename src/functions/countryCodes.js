const countryCodes = require("../data/countries")

export function getCountryCodes() {

    let keys = Object.keys(countryCodes);
    return keys;


}

export function getCountriesWithCodes() {
    let countriesWithCodes = [];
    for (let i = 0; i <Object.keys(countryCodes).length ; i++) {
        let countryWithCode = Object.values(countryCodes)[i] + ' - ' + Object.keys(countryCodes)[i];
        countriesWithCodes.push(countryWithCode);
    }
    return countriesWithCodes;
}

export default {getCountryCodes, getCountriesWithCodes};