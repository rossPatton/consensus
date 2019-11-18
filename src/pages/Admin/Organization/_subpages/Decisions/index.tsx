import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {Search} from '../../../../../containers';
import {getDecisionsByOrg} from '../../../../../redux';
import {tContainerProps} from './_types';
import {DecisionsComponent} from './Component';

class DecisionsContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);

    const {match: {params: {page = 0} = {}}, session} = props;
    const offset = page ? parseInt(page, 10) : 0;

    props.getDecisions({
      id: session.profile.id,
      limit: -1,
      offset,
    });
  }

  render() {
    return (
      <Search
        items={this.props.decisions}
        render={(searchProps: any) => (
          <DecisionsComponent
            {...searchProps}
            decisions={searchProps.items}
            match={this.props.match}
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
