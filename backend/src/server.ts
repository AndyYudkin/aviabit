import * as compression from 'compression';
import * as express from 'express';
import helmet from 'helmet';
import * as nocache from 'nocache';
import * as log4js from 'log4js';

import { router as statisticsRouter } from './components/statistics/route';
import * as config from './config/config.json';
import { DataProvider } from './db/DataProvider';

const log = log4js.getLogger('server');

const app = express();

const main = () => {
  log4js.configure({
    appenders: {
      console: { type: 'console' }
    },
    categories: {
      default: { appenders: ['console'], level: 'all' }
    }
  });

  app.use(log4js.connectLogger(log4js.getLogger('express'), { level: 'auto' }));

  app.use(helmet());
  app.use(nocache());
  app.use(compression());

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');

    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  app.use('/v1/statistics', statisticsRouter);

  const status = DataProvider.Parse();
  if (status instanceof Error) {
    log.error('Broken data. Server is shutdown.');
  } else {
    const { host, port } = config.server;
    app.listen(port, host, () => {
      log.info(`app name: aviabit online server`);
      log.info(`host: ${host}:${port}`);
    });
  }
};

main();
