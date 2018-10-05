function ConvertHandler() {

  this.getNum = function(input) {
    // finds and counts all `/` (which represent the presence of a fraction)
    const fractionCount = (input.match(/\//g) || []).length;

    // Matches all valid numbers given the spec
    // [0] - full match
    // [1] - full match again (this is to account for edge cases)
    // [2] - numerator/whole-number/decimal-number
    // [3] - optional group that includes `/` and denominator
    // [4] - denominator
    const validNumber = /^((\d+\.?\d*)(\/(\d+\.?\d*))?)/;

    if (validNumber.test(input)) {
      switch(true) {
        case fractionCount > 1:
          // double fraction or something like that
          return "invalid number";
        case fractionCount === 1:
          // normal fraction
          const matches = input.match(validNumber); 
          return Math.round((matches[2] / matches[4]) * 10000) / 10000;
        default:
          // whole number/decimal number without fraction
          return parseFloat(input.match(validNumber)[1]);
      }

    } else {
      return "invalid number";
    }


  };

  this.getUnit = function(input) {
    // match - 1 or more letters at the end of the string
    // [0] - full match
    // [1] - first match group
    const letterRegex = /([a-z]+)$/i;
    const matches = input.match(letterRegex);

    const validMeasurements = [
      "gal",
      "l",
      "lbs",
      "kg",
      "mi",
      "km",
    ];

    if (!matches) {
      // the string does NOT end with letters/word
      return "invalid unit";
    }

    // checks that the `matches[1]` is equivalent to at least one of the valid measurements
    const isValid = validMeasurements.some(measurement => measurement === matches[1].toLowerCase());

    return isValid 
      ? matches[1].toLowerCase() 
      : "invalid unit";

  };

  this.getReturnUnit = function(unit) {
    return {
      "gal": "l",
      "l": "gal",
      "lbs": "kg",
      "kg": "lbs",
      "mi": "km",
      "km": "mi",
    }[unit]
  };

  this.spellOutUnit = function(unit) {
    return {
      "gal": "gallon",
      "l": "litre",
      "lbs": "pound",
      "kg": "kilogram",
      "mi": "mile",
      "km": "kilometer",
    }[unit]
  };

  this.convert = function(initNum, initUnit) {
    let conversionRate;

    switch (true) {
      case initUnit.toLowerCase() === "gal":
        conversionRate = 3.78541;
        return Math.round(initNum * conversionRate * 10000) / 10000;
      case initUnit.toLowerCase() === "l":
        conversionRate = 3.78541;
        return Math.round((initNum / conversionRate) * 10000) / 10000;
      case initUnit.toLowerCase() === "lbs":
        conversionRate = 0.453592;
        return Math.round(initNum * conversionRate * 10000) / 10000;
      case initUnit.toLowerCase() === "kg":
        conversionRate = 0.453592;
        return Math.round((initNum / conversionRate) * 10000) / 10000;
      case initUnit.toLowerCase() === "mi":
        conversionRate = 1.60934;
        return Math.round(initNum * conversionRate * 10000) / 10000;
      case initUnit.toLowerCase() === "km":
        conversionRate = 1.60934;
        return Math.round((initNum / conversionRate) * 10000) / 10000;
    }
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)}${
      initNum > 1 ? "s" : ""
    } converts to ${returnNum} ${this.spellOutUnit(returnUnit)}${
      returnNum > 1 ? "s" : ""
    }`;
  };
}

module.exports = ConvertHandler;
