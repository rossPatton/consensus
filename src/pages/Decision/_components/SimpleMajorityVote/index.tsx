import React, {PureComponent} from 'react';

import {tProps, tState, tStateUnion} from './_types';
import {SimpleMajorityVoteComponent} from './Component';

class SimpleMajorityVote extends PureComponent<tProps, tState> {
  state = {
    selectedOption: 'n/a' as tStateUnion,
  };

  // TODO move up maybe?
  selectOption = (ev: any) => {
    ev.preventDefault();
    this.setState({
      selectedOption: ev.currentTarget.value,
    });
  }

  render() {
    return (
      <SimpleMajorityVoteComponent
        options={this.props.options}
        selectOption={this.selectOption}
        selectedOption={this.state.selectedOption}
        submitVote={this.props.submitVote}
        tiny={this.props.tiny}
        userVoted={this.props.userVoted}
      />
    );
  }
}

export default SimpleMajorityVote;
