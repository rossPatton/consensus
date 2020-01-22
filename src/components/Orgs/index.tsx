import React, {Component} from 'react';

// import {connect} from 'react-redux';
//
import {Paginate} from '../../containers';
import {tContainerProps} from './_types';
import {OrgsComponent} from './Component';

class OrgsContainer extends Component<tContainerProps> {
  render() {
    const {match} = this.props;

    return (
      <Paginate
        items={this.props.orgs}
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
//   deleteEvent: (query: tIdQueryC) => dispatch(deleteEvent(query)),
// });

// const Events = connect(null, mapDispatchToProps)(OrgsContainer);
export default OrgsContainer;
