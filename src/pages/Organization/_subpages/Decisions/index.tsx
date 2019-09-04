import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {GenericLoader, Helmet} from '../../../../components';
import {Paginate} from '../../../../containers';
import {getDecisionsByOrg} from '../../../../redux';
import {tContainerProps, tStore} from './_types';
import {DecisionsComponent} from './Component';

export class DecisionsContainer extends Component<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);

    if (props.decisions.length > 3) return;

    const { match: { params: { page = 0 } = {} }, org } = props;
    const offset = page ? parseInt(page, 10) : 0;

    props.getDecisionsByOrg({
      id: org.id,
      limit: -1,
      offset,
    });
  }

  render() {
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
        <GenericLoader
          isLoading={this.props.isLoading}
          render={() => (
            <Paginate
              items={this.props.decisions}
              match={this.props.match}
              render={(itemsToRender: tDecision[]) => (
                <DecisionsComponent
                  decisions={itemsToRender}
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

export const Decisions = connect(
  mapStateToProps,
  mapDispatchToProps
)(DecisionsContainer);
