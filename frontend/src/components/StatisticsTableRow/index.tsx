import React, { Component } from 'react';

import { StatisticsRow } from '../StatisticsRow';
import { FlightListCollapseRow } from '../FlightListCollapseRow';
import { FlightStatistics } from '../../store/reducer';

interface Props {
  data: FlightStatistics;
}

interface State {
  isOpen: boolean;
}

export class StatisticsTableRow extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  onSwitchOpen = () => this.setState((prev) => ({ isOpen: !prev.isOpen }));

  render() {
    const { isOpen } = this.state;
    const { data } = this.props;
    return (
      <React.Fragment>
        <StatisticsRow
          isOpen={isOpen}
          data={data}
          onClick={this.onSwitchOpen}
        />
        <FlightListCollapseRow isOpen={isOpen} data={data} />
      </React.Fragment>
    );
  }
}
