import { ProductRepository } from '../repositories/product.repository';
import { Product } from '../interfaces';

export class Seed {
  productRepository: ProductRepository;
  initialValues: Product[];

  constructor(initialValues: Product[]) {
    this.productRepository = new ProductRepository();
    this.initialValues = initialValues;
  }

  public async seed(): Promise<void> {
    const products = await this.productRepository.findAll(0, 100);
    if (products.length === 0) {
      await this.productRepository.createMany(this.initialValues);
    }

    console.log('db seeded');
  }
}
