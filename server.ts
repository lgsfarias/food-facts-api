import './src/config/setup';
import './src/config/database';
import './src/cron';
import chalk from 'chalk';
import { App } from './src/app';
import { Seed } from './src/config/dbSeed';
import { initialValues } from './src/config/initialValues';

class Server {
  app: App;
  seed: Seed;

  constructor() {
    this.app = new App();
    this.seed = new Seed(initialValues);
  }

  start() {
    this.seed.seed().then(() => {
      const port = process.env.PORT || '5000';
      this.app.app.listen(port, () => {
        console.log(
          chalk.bold.green(`Server running on http://localhost:${port}`),
        );
      });
    });
  }
}

const server = new Server();
server.start();
