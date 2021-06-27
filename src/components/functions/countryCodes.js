const countryCodes = require("../../data/countries")

export function getCountryCodes() {
    let keys = Object.keys(countryCodes);
    return keys;
}

export default {getCountryCodes};