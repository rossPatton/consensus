import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { getUserRole } from '../../utils';
import { getOrg } from '../../redux';
import { GenericLoader, Helmet } from '../../components';
import { tContainerProps, tStore } from './_types';
import { OrganizationComponent } from './Component';

// TODO this is too much nesting - maybe figure out a less verbose structure
// basically, this
// 1- gets basic org info needed for header
// 2- sets up the shared layout for all sub pages
// 3 - renders correct sub page based on react router match
export class OrganizationContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);

    // 0 is just the default, not possible in the db
    // basically dont re-fetch every time
    if (props.org.id !== 0) return;
    props.getOrg(props.match.params);
  }

  render() {
    const { org, session } = this.props;
    const role = getUserRole(session, org);

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
            <OrganizationComponent
              {...this.props}
              role={role}
            />
          )}
        />
      </>
    );
  }
}

const mapStateToProps = (state: tStore) => ({
  isLoading: state.org.isLoading,
  org: state.org.data,
  session: state.session.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getOrg: (params: tOrgRouteParams) => dispatch(getOrg(params)),
});

export const Organization = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationContainer);
