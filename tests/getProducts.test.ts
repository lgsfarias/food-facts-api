import supertest from 'supertest';
import { App } from '../src/app';
import { ScenarioFactory } from './factories/scenario.factory';
import { ProductFactory } from './factories/products.factory';

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
    expect(response.body.length).toEqual(2);
  });
});
