import { Product } from '../interfaces';
import { ProductRepository } from '../repositories/product.repository';
import AppError from '../utils/AppError';

export class ProductService {
  productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  public async findAll(page: number, limit: number): Promise<Product[]> {
    if (!page) {
      page = 0;
    }
    if (!limit) {
      limit = 100;
    }
    return await this.productRepository.findAll(page, limit);
  }

  public async count(): Promise<number> {
    return await this.productRepository.count();
  }

  public async findOne(code: number): Promise<Product | null> {
    const productFound = await this.productRepository.findOne(code);
    if (!productFound) {
      throw new AppError('Product not found', 404);
    }
    return productFound;
  }

  public async update(code: number, product: Product): Promise<Product | null> {
    const productFound = await this.productRepository.findOne(code);
    if (!productFound) {
      throw new AppError('Product not found', 404);
    }
    return await this.productRepository.update(code, product);
  }

  public async delete(code: number): Promise<Product | null> {
    const productFound = await this.productRepository.findOne(code);
    if (!productFound) {
      throw new AppError('Product not found', 404);
    }
    return await this.productRepository.delete(code);
  }
}
