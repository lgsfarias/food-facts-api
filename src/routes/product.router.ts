import { Router, Request, Response } from 'express';
import { ProductController } from '../controllers/product.controller';

export class ProductRouter {
  router: Router;
  productController: ProductController;

  constructor() {
    this.router = Router();
    this.productController = new ProductController();
    this.routes();
  }

  routes() {
    this.router.get('/', (req: Request, res: Response) => {
      this.productController.findAll(req, res);
    });
    this.router.get('/:code', (req: Request, res: Response) => {
      this.productController.findOne(req, res);
    });
    this.router.put('/:code', (req: Request, res: Response) => {
      this.productController.update(req, res);
    });
    this.router.delete('/:code', (req: Request, res: Response) => {
      this.productController.delete(req, res);
    });
  }
}
