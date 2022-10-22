import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { DataProvider } from '../../db/DataProvider';
import { FlightStatistics, FlightStatus } from './type';

export class StatisticsController {
  public static getByYear(
    request: Request,
    response: Response,
    _next: NextFunction
  ) {
    const result: FlightStatistics[] = StatisticsController.get(
      'yyyy',
      'yyyy',
      (a, b) => a.flightDate.year === b.flightDate.year
    );
    response.status(StatusCodes.OK).json(result);
  }

  public static getByMonth(
    request: Request,
    response: Response,
    _next: NextFunction
  ) {
    const result: FlightStatistics[] = StatisticsController.get(
      'LLLL yyyy',
      'LL.yy',
      (a, b) =>
        a.flightDate.month === b.flightDate.month &&
        a.flightDate.year === b.flightDate.year
    );
    response.status(StatusCodes.OK).json(result);
  }

  private static get(
    dateFormat: string,
    dateShortFormat: string,
    compareFunction: (a, b) => boolean
  ): FlightStatistics[] {
    const result: FlightStatistics[] = [];
    const flightList = DataProvider.GetFlightList();

    let i = 0;
    while (i < flightList.length) {
      const tmp = new FlightStatistics(
        flightList[i].flightDate.setLocale('ru').toFormat(dateFormat),
        flightList[i].flightDate.setLocale('ru').toFormat(dateShortFormat),
        0,
        0,
        0,
        0
      );
      let j = i;
      while (j < flightList.length) {
        if (compareFunction(flightList[j], flightList[i])) {
          if (flightList[j].status === FlightStatus.actual) {
            tmp.actualTimeFlight += flightList[j].timeFlight;
            tmp.actualTimeWork += flightList[j].timeWork;
          } else {
            tmp.scheduledTimeFlight += flightList[j].timeFlight;
            tmp.scheduledTimeWork += flightList[j].timeWork;
          }
          tmp.flightInfoList.push(flightList[j].Info());
          j += 1;
        } else {
          break;
        }
      }
      result.push(tmp);
      i = j;
    }
    return result;
  }
}
