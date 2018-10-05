const ConvertHandler = require('../controllers/convertHandler');

module.exports = (app) => {
  const convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get((req, res) => {
      const input = req.query.input;

      if (input === undefined) {
        res.status(400).json({ error: true, message: "no input found" });
        return;
      }

      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);

      if (initUnit === 'invalid unit' && initNum === 'invalid number') {
        res.status(422).json({ error: true, message: 'invalid number and unit'});
        return;
      } else if (initNum === 'invalid number') {
        res.status(422).json({ error: true,  message: 'invalid number'});
        return;
      } else if (initUnit === 'invalid unit') {
        res.status(422).json({ error: true,  message: 'invalid unit'});
        return;
      }

      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      res.json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string,
      });

    });
}
