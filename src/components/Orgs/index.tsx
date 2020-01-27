import React, {Component} from 'react';

// import {connect} from 'react-redux';
//
import {Paginate} from '../../containers';
import {tContainerProps} from './_types';
import {OrgsComponent} from './Component';

class OrgsContainer extends Component<tContainerProps> {
  render() {
    const {orgs, match} = this.props;
    if (!orgs || orgs instanceof Array && orgs.length === 0) {
      return null;
    }

    return (
      <Paginate
        items={orgs}
        page={match.params.page}
        render={(orgs: tOrg[]) => (
          <OrgsComponent
            orgs={orgs}
          />
        )}
      />
    );
  }
}

// const mapDispatchToProps = (dispatch: Function) => ({
//   deleteEvent: (query: tIdQuery) => dispatch(deleteEvent(query)),
// });

// const Events = connect(null, mapDispatchToProps)(OrgsContainer);
export default OrgsContainer;
