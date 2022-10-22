import React, { PureComponent } from 'react';
import { Box, TableCell, TableRow, Typography } from '@mui/material';

import { FlightInfoPart } from '../../store/reducer';

interface Props {
  index: number;
  data: FlightInfoPart[];
  isNotLast: boolean;
}

export class FlightRow extends PureComponent<Props> {
  render() {
    const { index, data, isNotLast } = this.props;
    return (
      <TableRow>
        <TableCell
          sx={{
            paddingLeft: 0,
            borderWidth: isNotLast ? 1 : 0
          }}
        >
          {index}
        </TableCell>
        <TableCell
          sx={{
            paddingLeft: 0,
            borderWidth: isNotLast ? 1 : 0
          }}
        >
          {data.map((obj, index) => (
            <Box
              key={`box-${index}`}
              display="flex"
              flexDirection="row"
              alignItems="center"
            >
              <Typography variant="subtitle1" fontSize={14}>
                {obj.field}:
              </Typography>
              &nbsp;
              <Typography variant="subtitle1" fontSize={12}>
                {obj.value}
              </Typography>
            </Box>
          ))}
        </TableCell>
      </TableRow>
    );
  }
}
