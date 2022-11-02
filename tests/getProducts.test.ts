import supertest from 'supertest';
import { App } from '../src/app';
import { ScenarioFactory } from './factories/scenario.factory';
import { ProductFactory } from './factories/products.factory';
import mongoose from 'mongoose';

const productFactory = new ProductFactory();
const scenarioFactory = new ScenarioFactory();
const app = new App().app;
const agent = supertest(app);

beforeEach(async () => {
  await scenarioFactory.resetDatabase();
});

describe('GET /products', () => {
  it('should return 200 OK', async () => {
    const response = await agent.get('/products');
    expect(response.status).toEqual(200);
  });
  it('should return an array of products', async () => {
    await productFactory.createMany(2);
    const response = await agent.get('/products');
    expect(response.body.products.length).toEqual(2);
  });
});

describe('GET /products/:code', () => {
  it('should return 200 OK', async () => {
    const product = await productFactory.create();
    const response = await agent.get(`/products/${product.code}`);
    expect(response.status).toEqual(200);
    expect(response.body.code).toEqual(product.code);
  });
  it('should return 404 Not Found', async () => {
    const response = await agent.get('/products/123');
    expect(response.status).toEqual(404);
  });
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});
