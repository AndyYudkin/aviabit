import React, { PureComponent } from 'react';
import { Container } from '@mui/material';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';

import { StatisticsChart } from '../StatisticsChart';
import { StatisticsSwitch } from '../StatisticsSwitch';
import { StatisticsTable } from '../StatisticsTable';
import { AppDispatch, RootState } from '../../store/store';
import { loadAsyncData, StatisticsPeriod } from '../../store/reducer';

interface Props {
  actions: {
    loadAsyncData: (value: StatisticsPeriod) => void;
  };
}

class AppConnect extends PureComponent<Props> {
  async componentDidMount() {
    this.props.actions.loadAsyncData(StatisticsPeriod.Year);
  }

  render() {
    return (
      <Container sx={{ padding: 1 }}>
        <StatisticsSwitch />
        <StatisticsChart />
        <StatisticsTable />
      </Container>
    );
  }
}

const mapStateToProps = (_state: RootState) => ({});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  actions: bindActionCreators({ loadAsyncData }, dispatch)
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppConnect);
