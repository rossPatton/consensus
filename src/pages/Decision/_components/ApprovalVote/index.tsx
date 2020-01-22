// import React, {PureComponent} from 'react';

// import {tContainerProps, tState} from './_types';
// import {ApprovalVoteComponent} from './Component';

// class ApprovalVote extends PureComponent<tContainerProps, tState> {
//   state = {
//     selectedOptions: [] as string[],
//   };

//   constructor(props: tContainerProps) {
//     super(props);
//     this.state = {
//       selectedOptions: props.votes,
//     };
//   }

//   // TODO move up maybe?
//   selectOption = (ev: any) => {
//     ev.preventDefault();
//     this.setState({
//       selectedOptions: [
//         ...this.state.selectedOptions,
//         ev.currentTarget.value,
//       ],
//     });
//   }

//   render() {
//     return (
//       <ApprovalVoteComponent
//         options={this.props.options}
//         selectOption={this.selectOption}
//         selectedOptions={this.state.selectedOptions}
//         submitVote={this.props.submitVote}
//         tiny={this.props.tiny}
//         userVoted={this.props.userVoted}
//       />
//     );
//   }
// }

// export default ApprovalVote;
