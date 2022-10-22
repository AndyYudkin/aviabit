import React, { PureComponent } from 'react';
import { TableCell, TableRow } from '@mui/material';

export class StatisticsHeaderRow extends PureComponent {
  render() {
    return (
      <TableRow>
        <TableCell align="center" colSpan={2} sx={{ padding: 1 }}>
          Период
        </TableCell>
        <TableCell align="center" colSpan={2} sx={{ padding: 1 }}>
          Налет
        </TableCell>
        <TableCell align="center" colSpan={2} sx={{ padding: 1 }}>
          Рабочее время
        </TableCell>
      </TableRow>
    );
  }
}
