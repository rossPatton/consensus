import React, {Component} from 'react';

// import {connect} from 'react-redux';
//
import {Paginate} from '../../containers';
import {tProps} from './_types';
import {OrgsComponent} from './Component';

class OrgsContainer extends Component<tProps> {
  render() {
    const {orgs} = this.props;
    if (!orgs || orgs instanceof Array && orgs.length === 0) {
      return null;
    }

    return (
      <Paginate
        items={orgs}
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
