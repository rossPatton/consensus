import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Dispatch} from 'redux';

import {Helmet} from '../../../../components';
import {DecisionTypeFilter, SearchFilter} from '../../../../containers';
import {getDecisionsByOrg} from '../../../../redux';
import {tContainerProps, tState, tStore} from './_types';
import {DecisionsComponent} from './Component';

class DecisionsContainer extends Component<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);
    this.getDecisions();
  }

  state = {
    showClosed: false,
  }

  componentDidUpdate() {
    this.getDecisions();
  }

  toggleClosed = () =>
    this.setState({
      showClosed: !this.state.showClosed,
    })

  private getDecisions = () => {
    const {showClosed} = this.state;
    const {match: { params: { page = 0 } = {} }, org} = this.props;
    const offset = page ? parseInt(page, 10) : 0;

    // get active decisions only
    this.props.getDecisionsByOrg({
      id: org.id,
      isClosed: showClosed,
      limit: -1,
      offset,
    });
  }

  render() {
    return (
      <>
        {!this.props.role && <Redirect to="/login" />}
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
        <DecisionTypeFilter
          items={this.props.decisions}
          render={(decisionTypeProps: tDecisionFilterProps) => (
            <SearchFilter
              items={decisionTypeProps.items}
              render={(searchProps: tSearchFilterProps) => (
                <DecisionsComponent
                  decisions={searchProps.items}
                  decisionFilter={decisionTypeProps.decisionFilter}
                  match={this.props.match}
                  onDecisionTypeChange={decisionTypeProps.onDecisionTypeChange}
                  onSearchChange={searchProps.onSearchChange}
                  showClosed={this.state.showClosed}
                  toggleClosed={this.toggleClosed}
                />
              )}
            />
          )}
        />
      </>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  decisions: store.decisions.data,
  isLoading: store.decisions.isLoading,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getDecisionsByOrg: (query: tIdQuery) => dispatch(getDecisionsByOrg(query)),
});

const Decisions = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DecisionsContainer);

export default Decisions;
