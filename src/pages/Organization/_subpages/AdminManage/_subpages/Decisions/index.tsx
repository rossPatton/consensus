import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {Paginate} from '../../../../../../containers';
import {getDecisionsByOrg} from '../../../../../../redux';
import {fuzzFilterList} from '../../../../../../utils';
import {tContainerProps} from './_types';
import {DecisionsComponent} from './Component';

export class DecisionsContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);

    const {match: {params: {page = 0} = {}}, org} = props;
    const offset = page ? parseInt(page, 10) : 0;

    props.getDecisions({
      id: org.id,
      limit: -1,
      offset,
    });
  }

  state = {
    decisions: this.props.decisions,
  };

  onSearchChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();

    const filteredList = fuzzFilterList({
      input: this.props.decisions || [],
      key: 'title',
      search: ev.currentTarget.value,
    });

    this.setState({
      decisions: filteredList,
    });
  }

  render() {
    const decisionsToRender = this.state.decisions.length > 0
      ? this.state.decisions
      : this.props.decisions;

    return (
      <Paginate
        items={decisionsToRender}
        match={this.props.match}
        render={(itemsToRender: tDecision[]) => (
          <DecisionsComponent
            decisions={itemsToRender}
            onSearchChange={this.onSearchChange}
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

export const Decisions = connect(
  mapStateToProps,
  mapDispatchToProps
)(DecisionsContainer);
