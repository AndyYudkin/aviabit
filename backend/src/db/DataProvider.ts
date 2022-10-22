import { v4 } from 'uuid';
import * as log4js from 'log4js';
import { DateTime } from 'luxon';

import * as data from './data.json';
import { Airport, Flight } from '../components/statistics/type';

const log = log4js.getLogger('DataProvider');

const flightList: Flight[] = [];

export class DataProvider {
  public static Parse(): null | Error {
    let result = null;
    try {
      data.forEach((obj) => {
        const id = v4();
        const takeoffAirport = new Airport(
          obj.takeoff.name,
          obj.takeoff.lat.toString(),
          obj.takeoff.long.toString()
        );
        const landingAirport = new Airport(
          obj.landing.name,
          obj.landing.lat.toString(),
          obj.landing.long.toString()
        );
        const flight = new Flight(
          id,
          DateTime.fromISO(obj.dateFlight, { zone: 'utc' }),
          obj.flight,
          obj.plnType,
          obj.pln,
          obj.timeFlight,
          obj.timeBlock,
          obj.timeNight,
          obj.timeBiologicalNight,
          obj.timeWork,
          obj.type,
          takeoffAirport,
          landingAirport
        );
        flightList.push(flight);
      });
      flightList.sort((a, b) =>
        a.flightDate.toUnixInteger() < b.flightDate.toUnixInteger() ? -1 : 1
      );
      log.trace('[DataProvider.Parse]:done');
    } catch (error) {
      log.error(error);
      result = error;
    }
    return result;
  }

  public static GetFlightList(): Flight[] {
    return flightList;
  }
}
