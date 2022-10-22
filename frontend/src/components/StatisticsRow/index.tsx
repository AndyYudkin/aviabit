import React, { PureComponent } from 'react';
import { IconButton, TableCell, TableRow } from '@mui/material';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import {
  FlightStatistics,
  selectStatus,
  StatisticsStatus
} from '../../store/reducer';
import { AppDispatch, RootState } from '../../store/store';

interface Props {
  status: StatisticsStatus;
  isOpen: boolean;
  data: FlightStatistics;
  onClick: () => void;
}

class StatisticsRowConnect extends PureComponent<Props> {
  render() {
    const { status, isOpen, data, onClick } = this.props;
    return (
      <TableRow>
        <TableCell align="left" sx={{ padding: 0 }}>
          <IconButton onClick={onClick}>
            {isOpen ? (
              <KeyboardArrowUpIcon fontSize="small" />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell align="left" sx={{ paddingLeft: 1, paddingRight: 1 }}>
          {data.period}
        </TableCell>
        {status !== StatisticsStatus.Scheduled && (
          <TableCell
            align="center"
            colSpan={status === StatisticsStatus.Actual ? 2 : 1}
            sx={{ paddingLeft: 1, paddingRight: 1 }}
          >
            {data.actualTimeFlight}
          </TableCell>
        )}
        {status !== StatisticsStatus.Actual && (
          <TableCell
            align="center"
            colSpan={status === StatisticsStatus.Scheduled ? 2 : 1}
            sx={{ paddingLeft: 1, paddingRight: 1 }}
          >
            {data.scheduledTimeFlight}
          </TableCell>
        )}
        {status !== StatisticsStatus.Scheduled && (
          <TableCell
            align="center"
            colSpan={status === StatisticsStatus.Actual ? 2 : 1}
            sx={{ paddingLeft: 1, paddingRight: 1 }}
          >
            {data.actualTimeWork}
          </TableCell>
        )}
        {status !== StatisticsStatus.Actual && (
          <TableCell
            align="center"
            colSpan={status === StatisticsStatus.Scheduled ? 2 : 1}
            sx={{ paddingLeft: 1, paddingRight: 1 }}
          >
            {data.scheduledTimeWork}
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

export const StatisticsRow = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatisticsRowConnect);
