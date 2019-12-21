import loglevel from 'loglevel';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Dispatch} from 'redux';

import {GenericLoader, Helmet} from '../../components';
import {ErrorBoundary} from '../../containers';
import {getDecision, getDecisionsByOrg, getRoles, getVotes, submitVote} from '../../redux';
import {tContainerProps, tState, tStore} from './_types';
import {DecisionComponent} from './Component';

class DecisionContainer extends Component<tContainerProps, tState> {
  state = {
    userVoted: false,
  };

  constructor(props: tContainerProps) {
    super(props);
    this.getData();
  }

  componentDidUpdate(nextProps: tContainerProps) {
    const routeChanged = nextProps.match.url !== this.props.match.url;
    if (!routeChanged) return;
    this.getData();
  }

  getData = async () => {
    const {id} = this.props.match.params;
    return this.props.getDecision({id})
      .then(this.getSideBarDecisions)
      .then(this.getRolesAndVotes);
  }

  getSideBarDecisions = async () => {
    const {decision, getDecisionsByOrg} = this.props;
    return getDecisionsByOrg({
      id: decision.orgId,
      exclude: decision.id,
      isClosed: false,
      limit: 3,
      offset: 0,
    });
  }

  getRolesAndVotes = async () => {
    const {getRoles, getVotes, match, session} = this.props;
    if (!session.isAuthenticated) return;
    if (session.isAuthenticated && session.type !== 'user') return;

    const {id: decisionId} = match.params;
    const userId = session.profile.id as number;

    return getRoles({id: userId})
      .then(() => getVotes({decisionId, userId}))
      .then(res => {
        return this.setState({
          userVoted: res.payload.length > 0,
        });
      })
      .catch(loglevel.error);
  }

  submitVote = (data: any) => {
    this.props.submitVote({
      data,
      decisionId: this.props.decision.id,
      userId: this.props.session.profile.id,
    })
      .then((res) => {
        loglevel.info('vote => ', res);
        return this.setState({
          userVoted: true,
        });
      })
      .catch(loglevel.error);
  }

  render() {
    const {decision, roles, session} = this.props;

    // TODO consolidate this logic somewhere, maybe utils
    const roleMap = roles.find(roleMap => {
      return roleMap.orgId === decision.orgId;
    }) as tRoleMap;

    let role = roleMap && roleMap.role;
    if (session.type === 'org' && session.profile.id === decision.orgId) {
      role = 'admin';
    }

    const {areRolesLoading, areVotesLoading, isDecisionLoading} = this.props;
    const isLoading = areRolesLoading || areVotesLoading || isDecisionLoading;

    return (
      <ErrorBoundary>
        <GenericLoader
          isLoading={isLoading}
          render={() => (
            <>
              {!role && <Redirect to="/login" />}
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
              <DecisionComponent
                decision={this.props.decision}
                decisions={this.props.decisions}
                match={this.props.match}
                submitVote={this.submitVote}
                userVoted={this.state.userVoted}
                votes={this.props.votes}
              />
            </>
          )}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  areRolesLoading: store.roles.isLoading,
  areVotesLoading: store.votes.isLoading,
  decision: store.decision.data,
  decisions: store.decisions.data,
  isDecisionLoading: store.decision.isLoading,
  roles: store.roles.data,
  session: store.session.data,
  votes: store.votes.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getDecision: (query: tIdQuery) => dispatch(getDecision(query)),
  getDecisionsByOrg: (query: tIdQuery) => dispatch(getDecisionsByOrg(query)),
  getRoles: (query: tIdQuery) => dispatch(getRoles(query)),
  getVotes: (query: any) => dispatch(getVotes(query)),
  submitVote: (query: tIdQuery) => dispatch(submitVote(query)),
});

const Decision = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DecisionContainer);

export default Decision;
