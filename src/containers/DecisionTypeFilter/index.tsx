import React, {Component} from 'react';

import {tProps, tState} from './_types';

// for use with events
export default class DecisionTypeFilter extends Component<tProps, tState> {
  public state = {
    decisionFilter: 'n/a' as tDecisionType,
  };

  public filter = (ds: tDecision[]) => {
    const {decisionFilter} = this.state;
    if (decisionFilter === 'n/a') return ds;

    // only 2 types atm, easy comparison
    const isApproval = decisionFilter === 'Approval';
    return ds.filter(d => {
      if (isApproval) return d.type === 'Approval';
      return d.type !== 'Approval';
    });
  };

  public onChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    ev.preventDefault();
    this.setState({
      decisionFilter: ev.currentTarget.value as tDecisionType,
    });
  }

  render() {
    const items = this.filter(this.props.items);
    return this.props.render({
      decisionFilter: this.state.decisionFilter,
      items,
      onDecisionTypeChange: this.onChange,
    });
  }
}
