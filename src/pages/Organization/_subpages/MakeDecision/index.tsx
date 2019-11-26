import dayJS from 'dayjs';
import _ from 'lodash';
import loglevel from 'loglevel';
import qs from 'querystring';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Dispatch } from 'redux';

import {Helmet} from '../../../../components';
import {postDecision} from '../../../../redux';
// import {postDecisionSuccess} from '../../../../redux/async/decision/actions';
// import {parseTimeString} from '../../../../utils';
import {tContainerProps, tCreateDecision, tState, tStateUnion, tStore} from './_types';
import {CreateOrEditEventComponent } from './Component';

class MakeDecisionContainer extends Component<tContainerProps, tState> {
  state = {
    deadline: dayJS().toISOString(),
    description: '',
    isDraft: false,
    isPrivate: false,
    newOption: '',
    options: [] as string[],
    orgName: this.props.org.name,
    title: '',
    type: 'Simple Poll' as tDecisionType,
  };

  // we use query params to populate the form when editing an event
  componentDidMount() {
    const draft = qs.parse(this.props.router.search.split('?')[1]);
    if (!draft.id) return;

    const isPrivate = draft.isPrivate === 'true';
    // const options = (draft.options as string).split(',');

    this.setState({
      deadline: dayJS(draft.deadline as string).format('YYYY-MM-DD'),
      description: draft.description as string,
      id: parseInt(draft.id as string, 10),
      isDraft: true,
      isPrivate,
      options: [],
      orgName: this.props.org.name,
      title: draft.title as string,
      type: draft.type as tDecisionType,
    });
  }

  saveAsDraft = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    this.setState({
      isDraft: true,
    }, () => this.onSubmit(ev, true));
  }

  onSubmit = async (
    ev: React.MouseEvent<HTMLButtonElement>,
    saveAsDraft: boolean = false) => {
    ev.preventDefault();
    // const {decisions} = this.props;
    const {newOption, ...restOfState} = this.state;

    let {options} = this.state;
    if (restOfState.type === 'Simple Poll') {
      options = ['Yes', 'No', 'Abstain'];
    }

    let newDecision: tDecision;
    try {
      const postDecision = await this.props.postDecision({
        ...restOfState,
        isDraft: saveAsDraft,
        options,
        orgId: this.props.org.id as number,
      });

      console.log('postDecision => ', postDecision);

      newDecision = postDecision.payload;
    } catch (err) {
      return loglevel.error('failed to save decision to db', err);
    }

    // update redux on client side on event upload success
    // postDecisionSuccess([newDecision, ...decisions]);
    this.setState({
      id: newDecision.id,
    });
  }

  toggleChecked = () => {
    this.setState({
      isPrivate: !this.state.isPrivate,
    });
  }

  removeOption = (optionToRemove: string) => {
    const {options: oldOptions} = this.state;
    const options = _.filter(oldOptions, opt => opt !== optionToRemove);
    this.setState({
      options,
    });
  }

  updateState = (stateKey: tStateUnion, value: any) => {
    let {options} = this.state;
    if (stateKey === 'options') {
      options = [...options, value];
      return this.setState({
        options,
      } as Pick<tState, tStateUnion>);
    }

    this.setState({
      [stateKey]: value,
    } as Pick<tState, tStateUnion>);
  }

  render() {
    const {session} = this.props;

    return (
      <>
        <Helmet
          canonical=""
          title=""
          meta={[
            { name: 'description', content: '' },
            { name: 'keywords', content: '' },
            { property: 'og:title', content: '' },
            { property: 'og:description', content: '' },
          ]}
        />
        {!session.isAuthenticated && <Redirect to="" />}
        {session.isAuthenticated && (
          <CreateOrEditEventComponent
            {...this.props}
            {...this.state}
            onSubmit={this.onSubmit}
            removeOption={this.removeOption}
            saveAsDraft={this.saveAsDraft}
            toggleChecked={this.toggleChecked}
            updateState={this.updateState}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  decisions: store.decisions.data,
  session: store.session.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  postDecision: (decision: tCreateDecision) => dispatch(postDecision(decision)),
});

const MakeDecision = connect(
  mapStateToProps,
  mapDispatchToProps
)(MakeDecisionContainer);

export default MakeDecision;
