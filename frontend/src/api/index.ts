import axios from 'axios';

import { FlightStatistics, StatisticsPeriod } from '../store/reducer';
import { config } from '../config';

export const requestData = async (
  period: StatisticsPeriod
): Promise<{ period: StatisticsPeriod; data: FlightStatistics[] }> => {
  let result = {
    period,
    data: []
  };
  try {
    const response = await axios.get(
      `http://${config.client.host}:${config.client.port}/v1/statistics/${
        period === StatisticsPeriod.Month ? 'month' : 'year'
      }`
    );
    result.data = response.data;
  } catch (error) {
    console.log(error);
  }

  return result;
};
