import React, { PureComponent } from 'react';
import { Chip, Stack } from '@mui/material';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import {
  loadAsyncData,
  selectPeriod,
  selectStatus,
  StatisticsPeriod,
  StatisticsStatus,
  updateStatus
} from '../../store/reducer';
import { AppDispatch, RootState } from '../../store/store';

interface Props {
  period: StatisticsPeriod;
  status: StatisticsStatus;
  actions: {
    updateStatus: (value: StatisticsStatus) => void;
    loadAsyncData: (value: StatisticsPeriod) => void;
  };
}

class StatisticsSwitchConnect extends PureComponent<Props> {
  onChangePeriod = (value: StatisticsPeriod) =>
    this.props.actions.loadAsyncData(value);

  onChangeStatus = (value: StatisticsStatus) => {
    let result = null;
    if (this.props.status === StatisticsStatus.All) {
      if (value === StatisticsStatus.Actual) {
        result = StatisticsStatus.Scheduled;
      } else {
        result = StatisticsStatus.Actual;
      }
    } else if (value !== this.props.status) {
      result = StatisticsStatus.All;
    }
    if (result != null) {
      this.props.actions.updateStatus(result);
    }
  };

  render() {
    const { period, status } = this.props;
    return (
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: 'center', padding: 2 }}
      >
        <Chip
          label="год"
          variant={period === StatisticsPeriod.Year ? 'filled' : 'outlined'}
          onClick={() => this.onChangePeriod(StatisticsPeriod.Year)}
        />
        <Chip
          label="месяц"
          variant={period === StatisticsPeriod.Month ? 'filled' : 'outlined'}
          onClick={() => this.onChangePeriod(StatisticsPeriod.Month)}
        />
        <Chip
          label="Фактически"
          variant={
            status !== StatisticsStatus.Scheduled ? 'filled' : 'outlined'
          }
          onClick={() => this.onChangeStatus(StatisticsStatus.Actual)}
        />
        <Chip
          label="Планово"
          variant={status !== StatisticsStatus.Actual ? 'filled' : 'outlined'}
          onClick={() => this.onChangeStatus(StatisticsStatus.Scheduled)}
        />
      </Stack>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  period: selectPeriod(state),
  status: selectStatus(state)
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  actions: bindActionCreators({ updateStatus, loadAsyncData }, dispatch)
});

export const StatisticsSwitch = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatisticsSwitchConnect);
