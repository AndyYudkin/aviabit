import { DateTime } from 'luxon';

export enum FlightStatus {
  actual,
  scheduled
}

export class Airport {
  name: string;
  latitude: string;
  longitude: string;

  constructor(name: string, latitude: string, longitude: string) {
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

export class FlightInfoPart {
  field: string;
  value: string | number;
}

export class Flight {
  id: string;
  flightDate: DateTime;
  flightNumber: string;
  planeType: string;
  planeNumber: string;
  timeFlight: number;
  timeBlock: number;
  timeNight: number;
  timeBiologicalNight: number;
  timeWork: number;
  status: FlightStatus;
  takeoff: Airport;
  landing: Airport;

  constructor(
    id: string,
    flightDate: DateTime,
    flightNumber: string,
    planeType: string,
    planeNumber: string,
    timeFlight: number,
    timeBlock: number,
    timeNight: number,
    timeBiologicalNight: number,
    timeWork: number,
    status: FlightStatus,
    takeoff: Airport,
    landing: Airport
  ) {
    this.id = id;
    this.flightDate = flightDate;
    this.flightNumber = flightNumber;
    this.planeType = planeType;
    this.planeNumber = planeNumber;
    this.timeFlight = timeFlight;
    this.timeBlock = timeBlock;
    this.timeNight = timeNight;
    this.timeBiologicalNight = timeBiologicalNight;
    this.timeWork = timeWork;
    this.status = status;
    this.takeoff = takeoff;
    this.landing = landing;
  }

  public Info(): FlightInfoPart[] {
    return [
      { field: 'Дата', value: this.flightDate.toFormat('dd.LL.yyyy') },
      { field: 'Номер рейса', value: this.flightNumber },
      { field: 'Тип ВС', value: this.planeType },
      { field: 'Бортовый номер', value: this.timeFlight },
      { field: 'Налёт', value: this.timeFlight },
      { field: 'Полётное время', value: this.timeBlock },
      { field: 'Ночное время', value: this.timeNight },
      { field: 'Биологическая ночь', value: this.timeBiologicalNight },
      { field: 'Рабочее время', value: this.timeWork },
      {
        field: 'Статус рейса',
        value: this.status === FlightStatus.actual ? 'фактический' : 'плановый'
      },
      {
        field: 'Взлёт',
        value: `${this.takeoff.name}, ${this.takeoff.latitude}, ${this.takeoff.longitude}`
      },
      {
        field: 'Посадка',
        value: `${this.landing.name}, ${this.landing.latitude}, ${this.landing.longitude}`
      }
    ];
  }
}

export class FlightStatistics {
  period: string;
  periodShortFormat: string;
  actualTimeFlight: number;
  scheduledTimeFlight: number;
  actualTimeWork: number;
  scheduledTimeWork: number;
  flightInfoList: FlightInfoPart[][];

  constructor(
    period: string,
    periodShortFormat: string,
    actualTimeFlight: number,
    scheduledTimeFlight: number,
    actualTimeWork: number,
    scheduledTimeWork: number
  ) {
    this.period = period;
    this.periodShortFormat = periodShortFormat;
    this.actualTimeFlight = actualTimeFlight;
    this.scheduledTimeFlight = scheduledTimeFlight;
    this.actualTimeWork = actualTimeWork;
    this.scheduledTimeWork = scheduledTimeWork;
    this.flightInfoList = [];
  }
}
