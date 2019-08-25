import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { Dispatch } from 'redux';

import { GenericLoader, Helmet } from '../../components';
import { tContainerProps, tStore } from './_types';
import { DirectoryComponent } from './Component';

export class DirectoryContainer extends PureComponent<tContainerProps> {
  // constructor(props: tContainerProps) {
  //   super(props);

  //   // 0 is just the default, not possible in the db
  //   // basically dont re-fetch every time
  //   if (props.org.id !== 0) return;
  //   props.getOrg(props.match.params);
  // }

  render() {
    // const { org, session } = this.props;
    // const role = getUserRole(session, org);

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
        <DirectoryComponent {...this.props} />
      </>
    );
  }
}

// const mapStateToProps = (state: tStore) => ({
//   isLoading: state.org.isLoading,
//   org: state.org.data,
//   session: state.session.data,
// });

// const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
//   getOrg: (params: tOrgRouteParams) => dispatch(getOrg(params)),
// });

export const Directory = DirectoryContainer;
//  connect(
//   mapStateToProps,
//   // mapDispatchToProps
// )(DirectoryContainer);
