import loglevel from 'loglevel';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Dispatch} from 'redux';

import {GenericLoader, Helmet} from '../../components';
import {ErrorBoundary} from '../../containers';
import {getDecision, getDecisionsByOrg, getRoles, submitVote} from '../../redux';
import {tContainerProps, tState, tStore} from './_types';
import {DecisionComponent} from './Component';

class DecisionContainer extends Component<tContainerProps, tState> {
  state = {
    userVoted: false,
  };

  constructor(props: tContainerProps) {
    super(props);
    this.getDecision();

    // TODO check if user has voted in this particular poll
    if (props.session.isAuthenticated && props.session.type === 'user') {
      props.getRoles({id: props.session.profile.id as number});
    }
  }

  componentDidUpdate(nextProps: tContainerProps) {
    const routeChanged = nextProps.match.url !== this.props.match.url;
    if (!routeChanged) return;
    this.getDecision();
  }

  shouldComponentUpdate(nextProps: tContainerProps, nextState: tState) {
    const loadingFinished = nextProps.isDecisionLoading !== this.props.isDecisionLoading;
    const rolesFinished = nextProps.areRolesLoading !== this.props.areRolesLoading;
    const sidebarFinished = nextProps.areDecisionsLoading !== this.props.areDecisionsLoading;
    const routeChanged = nextProps.match.url !== this.props.match.url;
    const userVoted = nextState.userVoted !== this.state.userVoted;
    return loadingFinished || routeChanged || rolesFinished || sidebarFinished || userVoted;
  }

  getDecision = () => {
    const {id} = this.props.match.params;
    this.props.getDecision({id})
      .then((res: any) => {
        // for rendering the 'more by name' sidebar
        return this.props.getDecisionsByOrg({
          id: res.payload.orgId,
          exclude: id,
          isClosed: false,
          limit: 3,
          offset: 0,
        });
      })
      .catch(loglevel.error);
  }

  // TODO you are getting voting working
  submitVote = (data: any) => {
    this.props.submitVote({
      data,
      decisionId: this.props.decision.id,
      userId: this.props.session.profile.id,
    })
      .then(() => {
        return this.setState({
          userVoted: true,
        });
      })
      .catch(loglevel.error);
  }

  render() {
    const {decision, roles, session} = this.props;

    const roleMap = roles.find(roleMap => {
      return roleMap.orgId === decision.orgId;
    }) as tRoleMap;

    let role = roleMap && roleMap.role;
    if (session.type === 'org' && session.profile.id === decision.orgId) {
      role = 'admin';
    }

    return (
      <GenericLoader
        isLoading={this.props.areRolesLoading}
        render={() => (
          <ErrorBoundary>
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
            />
          </ErrorBoundary>
        )}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  areDecisionsLoading: store.decisions.isLoading,
  areRolesLoading: store.roles.isLoading,
  decision: store.decision.data,
  decisions: store.decisions.data,
  isDecisionLoading: store.decision.isLoading,
  roles: store.roles.data,
  session: store.session.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getDecision: (query: tIdQuery) => dispatch(getDecision(query)),
  getDecisionsByOrg: (query: tIdQuery) => dispatch(getDecisionsByOrg(query)),
  getRoles: (query: tIdQuery) => dispatch(getRoles(query)),
  submitVote: (query: tIdQuery) => dispatch(submitVote(query)),
});

const Decision = connect(
  mapStateToProps,
  mapDispatchToProps
)(DecisionContainer);

export default Decision;
