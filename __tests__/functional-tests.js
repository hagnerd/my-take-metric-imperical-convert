const request = require('supertest');
const app = require('../app');

describe("/api/convert", () => {

  test("should convert 5km to 3.1069mi", async (done) => {
    const { status, body } = await request(app)
      .get('/api/convert?input=5km')

    expect(status).toEqual(200);
    expect(body).toEqual({
      initNum: 5,
      initUnit: "km",
      returnNum: 3.1069,
      returnUnit: "mi",
      string: `5 kilometers converts to 3.1069 miles`,
    });

    done();
  });  

  test("convert 32g (invalid input unit)", async (done) => {
    const { status, body } = await request(app)
      .get('/api/convert?input=32g')

    expect(status).toEqual(422);
    expect(body).toEqual({
      error: true,
      message: "invalid unit",
    });

    done();
  });

  test("convert 3/7.2/4kg (invalid input number)", async (done) => {
    const { status, body } = await request(app)
      .get('/api/convert?input=3/7.2/4kg');

    expect(status).toEqual(422);
    expect(body).toEqual({
      error: true,
      message: "invalid number",
    });

    done();
  });

  test("convert 3/7.2/4kilomogram (invalid input number and unit)", async (done) => {
    const { status, body } = await request(app)
      .get('/api/convert?input=3/7.2/4kolomogram');

    expect(status).toEqual(422);
    expect(body).toEqual({
      error: true,
      message: "invalid number and unit",
    });

    done();
  })

  test("attempt to convert no input", async (done) => {
    const { status, body } = await request(app)
      .get('/api/convert');

    expect(status).toEqual(400);
    expect(body).toEqual({
      error: true,
      message: "no input found",
    });

    done();

  });

});
