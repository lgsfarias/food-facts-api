import db from '../../src/config/database';

export class ScenarioFactory {
  public async resetDatabase() {
    await db.dropDatabase();
  }
}
