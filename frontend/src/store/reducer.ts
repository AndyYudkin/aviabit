import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';
import { requestData } from '../api';

export interface FlightInfoPart {
  field: string;
  value: string | number;
}

export interface FlightStatistics {
  period: string;
  actualTimeFlight: number;
  scheduledTimeFlight: number;
  actualTimeWork: number;
  scheduledTimeWork: number;
  flightInfoList: FlightInfoPart[][];
}

export enum StatisticsPeriod {
  Year,
  Month
}

export enum StatisticsStatus {
  All,
  Actual,
  Scheduled
}

interface AppState {
  period: StatisticsPeriod;
  status: StatisticsStatus;
  data: FlightStatistics[];
}

const initialState: AppState = {
  period: StatisticsPeriod.Year,
  status: StatisticsStatus.All,
  data: []
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateStatus: (state, action: PayloadAction<StatisticsStatus>) => {
      state.status = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadAsyncData.fulfilled, (state, action) => {
      state.period = action.payload.period;
      state.data = action.payload.data;
    });
  }
});

export const { updateStatus } = appSlice.actions;

export const selectPeriod = (state: RootState) => state.app.period;
export const selectStatus = (state: RootState) => state.app.status;
export const selectData = (state: RootState) => state.app.data;

export const loadAsyncData = createAsyncThunk(
  'app/fetchData',
  async (period: StatisticsPeriod) => await requestData(period)
);
