// const jest = require('jest');
const request = require('supertest');

const CWD = process.cwd();
const { server } = require(`${CWD}/server/app`);

beforeAll(() => {
});

afterAll(() => {
  server.close();
});

describe('basic route tests', () => {
  test('get home route GET /', async () => {
    const res = await request(server).get('/api/v1/user?id=5');
    expect(res.status).toEqual(200);
    // expect(res.text).toContain('Hello World!');
  });
});
