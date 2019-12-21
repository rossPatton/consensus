import React, {PureComponent} from 'react';

import {tContainerProps, tState} from './_types';
import {SimpleMajorityVoteComponent} from './Component';

class SimpleMajorityVote extends PureComponent<tContainerProps, tState> {
  state = {
    selectedOption: this.props.vote || 'n/a',
  };

  // TODO move up maybe?
  selectOption = (ev: any) => {
    ev.preventDefault();
    const selectedOption = ev.currentTarget.value.toLowerCase();

    this.setState({
      selectedOption,
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
