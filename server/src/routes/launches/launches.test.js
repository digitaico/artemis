const request = require('supertest');
const app = require('../../app');

describe('Test GET /launches', () => {
  test('It should respond with 200 success', async () => {
    const response = await request(app)
      .get('/launches')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

describe('Test POST /launches', () => {
  const completeLaunchData = {
    mission: 'Tetris 11',
    rocket: 'WhiteFlower',
    target: 'Kepler 100500-a',
    launchDate: '2027-08-31',
  }

  const wrongDateLaunchData = {
    mission: 'Tetris 11',
    rocket: 'WhiteFlower',
    target: 'Kepler 100500-a',
    launchDate: 'hello',
  }

  const datelessLaunchData = {
    mission: 'Tetris 11',
    rocket: 'WhiteFlower',
    target: 'Kepler 100500-a',
  }

  test('It should respond with 201 success', async () => {
    const response = await request(app)
      .post('/launches')
      .send(completeLaunchData)
      .expect('Content-Type', /json/)
      .expect(201);

    // use jest, no supertest,  to test body,  say date format.
    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    expect(responseDate).toBe(requestDate);
    expect(response.body).toMatchObject(datelessLaunchData);
  });

  test('It should catch missing required properties', async () => {
    const response = await request(app)
      .post('/launches')
      .send(datelessLaunchData)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: 'Missing required Data values.',
    });
  });

  test('It should catch invalid dates', async () => {
    const response = await request(app)
      .post('/launches')
      .send(wrongDateLaunchData)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: 'Invalid launch date',
    });
  });
})
