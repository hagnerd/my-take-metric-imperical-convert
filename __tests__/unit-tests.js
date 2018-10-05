const ConvertHandler = require("../controllers/convertHandler");

const convertHandler = new ConvertHandler();

describe("Unit Test Suite", () => {

  describe("convertHandler.getNum", () => {
    test("Should work with whole number input", () => {
      expect(convertHandler.getNum("32L")).toEqual(32);
    });

    test("Decimal input", () => {
      expect(convertHandler.getNum("1.5L")).toEqual(1.5);
      expect(convertHandler.getNum("1.2345L")).toEqual(1.2345);
    });

    test("Fractional input", () => {
      expect(convertHandler.getNum("1/2L")).toEqual(0.5);
    })

    test("Fractional input w/ decimals", () => {
      expect(convertHandler.getNum("1.2/1.5L")).toEqual(0.8);
    })

    test("Should return `invalid number`", () => {
      expect(convertHandler.getNum("lkamd")).toEqual("invalid number");
    });
  });

  describe("convertHandler.getUnit", () => {

    test("for each valid unit input", () => {
      const inputs = [
        "gal", 
        "l", 
        "mi", 
        "km", 
        "kg", 
        "lbs", 
        "GAL", 
        "L", 
        "MI", 
        "KM", 
        "KG", 
        "LBS", 
      ];

      inputs.forEach(unit => {
        expect(convertHandler.getUnit(`1${unit}`)).toEqual(unit.toLowerCase());
      });
    });

    test("should return invalid unit when passed bad measurement", () => {
      expect(convertHandler.getUnit("1br")).toEqual("invalid unit");
    })

  });

  describe("convertHandler.getReturnUnit", () => {
    test("should return valid output unit for each valid input unit", () => {

      const inputs = [
        "gal",
        "l",
        "lbs",
        "kg",
        "mi",
        "km",
      ];

      const outputs = [
        "l",
        "gal",
        "kg",
        "lbs",
        "km",
        "mi",
      ]

      inputs.forEach((unit, index) => {
        expect(convertHandler.getReturnUnit(unit)).toEqual(outputs[index])
      });

    });
  });

  describe("convertHandler.spellOutUnit(unit)", () => {
    test("should return valid output for each valid input unit", () => {
      const inputs = [
        "gal",
        "l",
        "lbs",
        "kg",
        "mi",
        "km",
      ];

      const outputs = [
        "gallon",
        "litre",
        "pound",
        "kilogram",
        "mile",
        "kilometer",
      ];

      inputs.forEach((unit, i) => {
        expect(convertHandler.spellOutUnit(unit)).toEqual(outputs[i]);
      });
    });
  });

  describe("convertHandler.convert(num, unit)", () => {
    test("GAL to L", () => {
      expect(convertHandler.convert(5, "gal")).toEqual(18.9271);
    });

    test("L to GAL", () => {
      expect(convertHandler.convert(18.9271, "l")).toEqual(5);
    });

    test("mi to km", () => {
      expect(convertHandler.convert(5, "mi")).toEqual(8.0467);
    });

    test("km to mi", () => {
      expect(convertHandler.convert(5, "km")).toEqual(3.1069);
    });

    test("lbs to kg", () => {
      expect(convertHandler.convert(100, "lbs")).toEqual(45.3592);
    });

    test("kg to lbs", () => {
      expect(convertHandler.convert(100, "kg")).toEqual(220.4624);
    });

  });

  describe("convertHandler.getString(initNum, initUnit, returnNum, returnUnit)", () => {

    test("should return `5 kilometers converts to 3.1069 miles`", () => {
      expect(convertHandler.getString(5, 'km', 3.1069, 'mi')).toEqual(`5 kilometers converts to 3.1069 miles`)
    });
  });

});
