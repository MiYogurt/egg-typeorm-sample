import 'module-alias/register';

import 'reflect-metadata';
import { Application } from 'egg';
import { createConnection } from 'typeorm';

class appHooks {
  constructor(private app: Application) {}
  async didLoad() {
    const { app } = this;
    const models: any[] = app.loadModel();
    app.model = await createConnection({
      entities: models,
      ...(<any>app.config.typeorm)
    });
  }
  async serverDidReady() {
    const { app } = this;
    await app.runSchedule('elasticsearch_indices');
  }
}

export default appHooks;
