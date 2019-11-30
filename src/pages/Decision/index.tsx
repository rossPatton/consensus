import loglevel from 'loglevel';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {/* GenericLoader*/ Helmet} from '../../components';
import {ErrorBoundary} from '../../containers';
import {getDecision, getDecisionsByOrg} from '../../redux';
import {tContainerProps, tStore} from './_types';
import {DecisionComponent} from './Component';

class DecisionContainer extends Component<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    this.getDecision();
  }

  componentDidUpdate(nextProps: tContainerProps) {
    const routeChanged = nextProps.match.url !== this.props.match.url;
    if (!routeChanged) return;
    this.getDecision();
  }

  shouldComponentUpdate(nextProps: tContainerProps) {
    const loadingFinished = nextProps.isDecisionLoading !== this.props.isDecisionLoading;
    const sidebarFinished = nextProps.areDecisionsLoading !== this.props.areDecisionsLoading;
    const routeChanged = nextProps.match.url !== this.props.match.url;
    return loadingFinished || routeChanged || sidebarFinished;
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

  render() {
    return (
      <ErrorBoundary>
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
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isDecisionLoading: store.decision.isLoading,
  areDecisionsLoading: store.decisions.isLoading,
  decision: store.decision.data,
  decisions: store.decisions.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getDecision: (query: tIdQuery) => dispatch(getDecision(query)),
  getDecisionsByOrg: (query: tIdQuery) => dispatch(getDecisionsByOrg(query)),
});

const Decision = connect(
  mapStateToProps,
  mapDispatchToProps
)(DecisionContainer);

export default Decision;
