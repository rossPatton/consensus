import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {DecisionTypeFilter, SearchFilter} from '../../../../../containers';
import {getDecisionsByOrg} from '../../../../../redux';
import {tContainerProps} from './_types';
import {DecisionsComponent} from './Component';

class DecisionsContainer extends Component<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    this.getDecisions();
  }

  componentDidMount() {
    this.getDecisions();
  }

  private getDecisions() {
    const {match: {params: {page = 0} = {}}, session} = this.props;
    const offset = page ? parseInt(page, 10) : 0;

    this.props.getDecisions({
      id: session.profile.id,
      limit: -1,
      offset,
    });
  }

  render() {
    return (
      <SearchFilter
        items={this.props.decisions}
        render={(searchProps: tSearchFilterProps) => (
          <DecisionTypeFilter
            items={searchProps.items}
            render={(decisionTypeProps: tDecisionFilterProps) => (
              <DecisionsComponent
                {...decisionTypeProps}
                {...searchProps}
                decisions={decisionTypeProps.items}
                match={this.props.match}
              />
            )}
          />
        )}
      />
    );
  }
}

const mapStateToProps = (store: any) => ({
  decisions: store.decisions.data,
  isLoading: store.events.isLoading,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getDecisions: (query: tIdQuery) => dispatch(getDecisionsByOrg(query)),
});

const Decisions = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DecisionsContainer);

export default Decisions;
