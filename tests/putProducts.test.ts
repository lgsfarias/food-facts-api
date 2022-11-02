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

describe('PUT /products/:code', () => {
  it('should return 200 OK', async () => {
    const product = await productFactory.create();
    const response = await agent.put(`/products/${product.code}`).send({
      product_name: 'New name',
    });
    expect(response.status).toEqual(200);
    expect(response.body.product_name).toEqual('New name');

    const updatedProduct = await agent.get(`/products/${product.code}`);
    expect(updatedProduct.body.product_name).toEqual('New name');
  });
  it('should return 404 Not Found', async () => {
    const response = await agent.put('/products/123').send({
      product_name: 'New name',
    });
    expect(response.status).toEqual(404);
  });
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});
