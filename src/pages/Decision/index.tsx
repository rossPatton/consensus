import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {GenericLoader, Helmet} from '../../components';
import {ErrorBoundary} from '../../containers';
import {getDecision, getDecisionsByOrg} from '../../redux';
import {tProps, tStore} from './_types';
import {DecisionComponent} from './Component';

export class DecisionContainer extends Component<tProps> {
  constructor(props: tProps) {
    super(props);
    this.getDecision();
  }

  componentDidUpdate(nextProps: tProps) {
    const routeChanged = nextProps.match.url !== this.props.match.url;
    if (!routeChanged) return;
    this.getDecision();
  }

  getDecision = () => {
    const {id} = this.props.match.params;
    this.props.getDecision({id})
      .then((res: {payload: tDecision}) => {
        // for rendering the 'more by name' sidebar
        return this.props.getDecisionsByOrg({
          id: res.payload.orgId,
          exclude: id,
          isClosed: false,
          limit: 3,
          offset: 0,
        });
      })
      .catch(console.error);
  }

  shouldComponentUpdate(nextProps: tProps) {
    const loadingFinished = nextProps.isLoading !== this.props.isLoading;
    const routeChanged = nextProps.match.url !== this.props.match.url;
    const decisionsLoaded = nextProps.decisions.length !== this.props.decisions.length;
    return loadingFinished || routeChanged || decisionsLoaded;
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
        <GenericLoader
          isLoading={this.props.isLoading}
          render={() => (
            <DecisionComponent
              decision={this.props.decision}
              decisions={this.props.decisions}
            />
          )}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.decision.isLoading,
  decision: store.decision.data,
  decisions: store.decisions.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getDecision: (query: tIdQuery) => dispatch(getDecision(query)),
  getDecisionsByOrg: (query: tIdQuery) => dispatch(getDecisionsByOrg(query)),
});

export const Decision = connect(
  mapStateToProps,
  mapDispatchToProps
)(DecisionContainer);
