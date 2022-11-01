import { Router } from 'express';
import { ProductRouter } from './product.router';

export class Routes {
  router: Router;
  productRouter: ProductRouter;

  constructor() {
    this.router = Router();
    this.productRouter = new ProductRouter();
    this.routes();
  }

  routes() {
    this.router.use('/products', this.productRouter.router);
  }
}
