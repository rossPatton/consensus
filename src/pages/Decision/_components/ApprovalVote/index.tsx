import React, {PureComponent} from 'react';

import {tProps, tState} from './_types';
import {ApprovalVoteComponent} from './Component';

class ApprovalVote extends PureComponent<tProps, tState> {
  state = {
    selectedOptions: [] as string[],
  };

  // TODO move up maybe?
  selectOption = (ev: any) => {
    ev.preventDefault();
    this.setState({
      selectedOptions: [
        ...this.state.selectedOptions,
        ev.currentTarget.value,
      ],
    });
  }

  render() {
    return (
      <ApprovalVoteComponent
        options={this.props.options}
        selectOption={this.selectOption}
        selectedOptions={this.state.selectedOptions}
        submitVote={this.props.submitVote}
        tiny={this.props.tiny}
        userVoted={this.props.userVoted}
      />
    );
  }
}

export default ApprovalVote;
