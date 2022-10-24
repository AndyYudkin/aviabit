import React, { PureComponent } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis
} from 'recharts';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';

import { AppDispatch, RootState } from '../../store/store';
import {
  FlightStatistics,
  selectData,
  selectStatus,
  StatisticsStatus
} from '../../store/reducer';

interface Props {
  status: StatisticsStatus;
  data: FlightStatistics[];
}

class StatisticsChartConnect extends PureComponent<Props> {
  render() {
    const { status, data } = this.props;
    return (
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="periodShortFormat" />
          {status !== StatisticsStatus.Scheduled && (
            <Bar
              name="Фактическое полетное время"
              dataKey="actualTimeFlight"
              stackId="a"
              fill="#8884d8"
            />
          )}
          {status !== StatisticsStatus.Actual && (
            <Bar
              name="Плановое полетное время"
              dataKey="scheduledTimeFlight"
              stackId="a"
              fill="#82ca9d"
            />
          )}
          {status !== StatisticsStatus.Scheduled && (
            <Bar
              name="Фактическое рабочее время"
              dataKey="actualTimeWork"
              stackId="b"
              fill="#0080FF"
            />
          )}
          {status !== StatisticsStatus.Actual && (
            <Bar
              name="Плановое рабочее время"
              dataKey="scheduledTimeWork"
              stackId="b"
              fill="#6600cc"
            />
          )}
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  status: selectStatus(state),
  data: selectData(state)
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  actions: bindActionCreators({}, dispatch)
});

export const StatisticsChart = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatisticsChartConnect);
