import React, { PureComponent } from 'react';
import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@mui/material';

import { FlightRow } from '../FlightRow';
import { FlightStatistics } from '../../store/reducer';

interface Props {
  isOpen: boolean;
  data: FlightStatistics;
}

export class FlightListCollapseRow extends PureComponent<Props> {
  render() {
    const { isOpen, data } = this.props;
    return (
      <TableRow>
        <TableCell align="left" sx={{ padding: 0 }} colSpan={6}>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <Box sx={{ marginBottom: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {data.flightInfoList.map((flightInfo, index: number, arr) => (
                    <FlightRow
                      key={`FlightRow-${index}`}
                      index={index}
                      data={flightInfo}
                      isNotLast={index + 1 < arr.length}
                    />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    );
  }
}
