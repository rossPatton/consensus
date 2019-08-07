import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getDecisionsByOrg } from '../../../../redux';
import { GenericLoader, Helmet } from '../../../../components';
import { DecisionsComponent } from './Component';

export class DecisionsContainer extends Component<any> {
  constructor(props: any) {
    super(props);

    if (props.decisions.length > 0) return;

    const { match: { params: { page = 0 } = {} }, org } = props;
    props.getDecisionsByOrg({
      id: org.id,
      limit: -1,
      offset: page,
    });
  }

  getSliceOfDecisions = (decisions: tDecision[]) => {
    const newArray = [...decisions];

    const { match: { params: { page } } } = this.props;
    const activePage = page ? parseInt(page, 10) : 1;

    const end = activePage * 10;
    const start = end - 10;

    // -1 here because page numbers are 1 indexed, arrays are 0 indexed
    return newArray.slice(start, end - 1);
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
            <>
              <DecisionsComponent
                allDecisions={this.props.decisions}
                decisionsToRender={this.getSliceOfDecisions(this.props.decisions)}
                match={this.props.match}
              />
            </>
          )}
        />
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  decisions: state.decisions.data,
  isLoading: state.decisions.isLoading,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getDecisionsByOrg: (id: number) => dispatch(getDecisionsByOrg(id, 'all')),
});

export const Decisions = connect(
  mapStateToProps,
  mapDispatchToProps
)(DecisionsContainer);
