const request = require('supertest');
const app = require('../../app');
const {loadPlanetsData} = require('../../models/planets.model');
const {mongoConnect, mongoDisconnect} = require('../../services/mongo');

describe('Launches API', () => {
  beforeAll(async () => {
    await mongoConnect();
    await loadPlanetsData();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe('Test GET /v1/launches', () => {
    test('It should respond with 200 success', async () => {
      const response = await request(app)
        .get('/v1/launches')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  describe('Test POST /v1/launches', () => {
    const completeLaunchData = {
      mission: 'Tetris 11',
      rocket: 'WhiteFlower',
      target: 'Kepler-1410 b',
      launchDate: '2027-08-31',
    }

    const wrongDateLaunchData = {
      mission: 'Tetris 11',
      rocket: 'WhiteFlower',
      target: 'Kepler-1410 b',
      launchDate: 'hello',
    }

    const datelessLaunchData = {
      mission: 'Tetris 11',
      rocket: 'WhiteFlower',
      target: 'Kepler-1410 b',
    }

    test('It should respond with 201 success', async () => {
      const response = await request(app)
        .post('/v1/launches')
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
        .post('/v1/launches')
        .send(datelessLaunchData)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: 'Missing required Data values.',
      });
    });

    test('It should catch invalid dates', async () => {
      const response = await request(app)
        .post('/v1/launches')
        .send(wrongDateLaunchData)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: 'Invalid launch date',
      });
    });
  });

})
