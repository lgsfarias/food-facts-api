import { Product } from '../../src/interfaces';
import { faker } from '@faker-js/faker';
import products from '../../src/models/Product';

export class ProductFactory {
  public createBody(): Product {
    return {
      code: faker.datatype.number(),
      status: 'published',
      url: faker.internet.url(),
      creator: faker.name.firstName(),
      created_t: faker.datatype.number(),
      last_modified_t: faker.datatype.number(),
      product_name: faker.commerce.productName(),
      quantity: String(faker.datatype.number()),
      brands: faker.company.name(),
      categories: faker.commerce.department(),
      labels: faker.commerce.productMaterial(),
      cities: faker.address.city(),
      purchase_places: faker.address.city(),
      stores: faker.address.city(),
      ingredients_text: faker.commerce.productDescription(),
      traces: faker.commerce.productMaterial(),
      serving_size: faker.commerce.productMaterial(),
      serving_quantity: faker.datatype.number(),
      nutriscore_score: faker.datatype.number(),
      nutriscore_grade: faker.datatype.string(),
      main_category: faker.commerce.department(),
      image_url: faker.image.imageUrl(),
      imported_t: faker.date.past(),
    };
  }

  public async create(): Promise<Product> {
    const product = await products.create(this.createBody());
    return product;
  }

  public async createMany(amount: number): Promise<Product[]> {
    const productsList = [];
    for (let i = 0; i < amount; i++) {
      productsList.push(this.createBody());
    }
    return await products.insertMany(productsList);
  }
}
