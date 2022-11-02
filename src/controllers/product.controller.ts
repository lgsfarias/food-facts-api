import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import AppError from '../utils/AppError';

export class ProductController {
  productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  public async findAll(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);
      const products = await this.productService.findAll(page, limit);
      const total = await this.productService.count();
      res.status(200).json({ products, total });
    } catch (err) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({
          status: err.statusCode,
          message: err.message,
        });
      } else {
        res.status(500).json({
          status: 500,
          message: 'Internal Server Error',
        });
      }
    }
  }

  public async findOne(req: Request, res: Response): Promise<void> {
    try {
      const code = parseInt(req.params.code);
      const product = await this.productService.findOne(code);
      res.status(200).json(product);
    } catch (err) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({
          status: err.statusCode,
          message: err.message,
        });
      } else {
        res.status(500).json({
          status: 500,
          message: 'Internal Server Error',
        });
      }
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const code = parseInt(req.params.code);
      const product = await this.productService.update(code, req.body);
      res.status(200).json(product);
    } catch (err) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({
          status: err.statusCode,
          message: err.message,
        });
      } else {
        res.status(500).json({
          status: 500,
          message: 'Internal Server Error',
        });
      }
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const code = parseInt(req.params.code);
      await this.productService.delete(code);
      res.status(204).send();
    } catch (err) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({
          status: err.statusCode,
          message: err.message,
        });
      } else {
        res.status(500).json({
          status: 500,
          message: 'Internal Server Error',
        });
      }
    }
  }
}
