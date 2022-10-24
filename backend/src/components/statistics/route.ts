import * as express from 'express';

import { StatisticsController } from './controller';

export const router = express.Router();

const cStatisticsByYear = '/year';
router.get(cStatisticsByYear, StatisticsController.getByYear);

const cStatisticsByMonth = '/month';
router.get(cStatisticsByMonth, StatisticsController.getByMonth);
