import express, { Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to API');
});

export default app;
