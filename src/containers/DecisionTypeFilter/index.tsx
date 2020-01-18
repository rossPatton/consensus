import React, {Component} from 'react';

import {tProps, tState} from './_types';

// for use with events
export default class DecisionTypeFilter extends Component<tProps, tState> {
  state = {
    decisionFilter: 'n/a' as tDecisionType,
  };

  filter = (ds: tDecision[]) => {
    const {decisionFilter} = this.state;
    if (decisionFilter === 'n/a') return ds;

    const isApproval = decisionFilter === 'Approval';
    const isConsensus = decisionFilter === 'Consensus';
    const isSimpleMajority = decisionFilter === 'Simple Majority';
    const isSimplePoll = decisionFilter === 'Simple Poll';

    return ds.filter(d => {
      if (isApproval) return d.type === 'Approval';
      if (isConsensus) return d.type === 'Consensus';
      if (isSimpleMajority) return d.type === 'Simple Majority';
      if (isSimplePoll) return d.type === 'Simple Poll';
      return false;
    });
  };

  onChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
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
