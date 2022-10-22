import React, { PureComponent } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';

import { AppDispatch, RootState } from '../../store/store';
import { selectStatus, StatisticsStatus } from '../../store/reducer';

interface Props {
  status: StatisticsStatus;
}

class FlightStatusHeaderRowConnect extends PureComponent<Props> {
  render() {
    const { status } = this.props;
    return (
      <TableRow>
        <TableCell colSpan={2}></TableCell>
        {status !== StatisticsStatus.Scheduled && (
          <TableCell
            align="center"
            colSpan={status === StatisticsStatus.Actual ? 2 : 1}
          >
            фкт
          </TableCell>
        )}
        {status !== StatisticsStatus.Actual && (
          <TableCell
            align="center"
            colSpan={status === StatisticsStatus.Scheduled ? 2 : 1}
          >
            плн
          </TableCell>
        )}
        {status !== StatisticsStatus.Scheduled && (
          <TableCell
            align="center"
            colSpan={status === StatisticsStatus.Actual ? 2 : 1}
          >
            фкт
          </TableCell>
        )}
        {status !== StatisticsStatus.Actual && (
          <TableCell
            align="center"
            colSpan={status === StatisticsStatus.Scheduled ? 2 : 1}
          >
            плн
          </TableCell>
        )}
      </TableRow>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  status: selectStatus(state)
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  actions: bindActionCreators({}, dispatch)
});

export const FlightStatusHeaderRow = connect(
  mapStateToProps,
  mapDispatchToProps
)(FlightStatusHeaderRowConnect);
