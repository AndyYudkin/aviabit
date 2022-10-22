import React, { PureComponent } from 'react';
import { Table, TableBody, TableHead } from '@mui/material';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { StatisticsTableRow } from '../StatisticsTableRow';

import { StatisticsHeaderRow } from '../StatisticsHeaderRow';
import { FlightStatusHeaderRow } from '../FlightStatusHeaderRow';
import { AppDispatch, RootState } from '../../store/store';
import { FlightStatistics, selectData } from '../../store/reducer';

interface Props {
  data: FlightStatistics[];
}

class StatisticsTableConnect extends PureComponent<Props> {
  render() {
    const { data } = this.props;
    return (
      <Table>
        <TableHead>
          <StatisticsHeaderRow />
          <FlightStatusHeaderRow />
        </TableHead>
        <TableBody>
          {data.map((row, index: number) => (
            <StatisticsTableRow
              key={`StatisticsTableRow-${index}`}
              data={row}
            />
          ))}
        </TableBody>
      </Table>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  data: selectData(state)
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  actions: bindActionCreators({}, dispatch)
});

export const StatisticsTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatisticsTableConnect);
