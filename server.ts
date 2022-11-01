import './src/config/setup';
import './src/config/database';
import './src/cron';
import chalk from 'chalk';
import { App } from './src/app';

class Server {
  app: App;

  constructor() {
    this.app = new App();
  }

  start() {
    const port = process.env.PORT || '5000';
    this.app.app.listen(port, () => {
      console.log(
        chalk.bold.green(`Server running on http://localhost:${port}`),
      );
    });
  }
}

const server = new Server();
server.start();
