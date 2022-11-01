import express, { Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { Routes } from './routes';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';
import mongoose from 'mongoose';
import { lastCronExecution } from './cron';

export class App {
  app: express.Application;
  routes: Routes;

  constructor() {
    this.routes = new Routes();
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(this.routes.router);
    this.app.use(errorHandlerMiddleware);

    this.app.get('/', (req: Request, res: Response) => {
      const mongoStatus = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting',
        99: 'uninitialized',
      };
      res.status(200).json({
        status: 200,
        message: 'OK',
        database: mongoStatus[mongoose.connection.readyState],
        lastCronExecution: lastCronExecution,
        uptime: process.uptime().toFixed(1) + ' s',
        memoryUsage: process.memoryUsage(),
      });
    });
  }
}
