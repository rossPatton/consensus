import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {GenericLoader} from '~app/containers';
import {getCities} from '~app/redux';

import {tContainerProps, tStore} from './_types';
import {CitySearchComponent} from './Component';

// use within an existing form, tie to it's updateState method
class CitySearchContainer extends PureComponent<tContainerProps> {
  static defaultProps = {
    city: 'New York',
    region: 'New York',
    showResetButton: true,
  };

  constructor(props: tContainerProps) {
    super(props);
    let region = 'New York';
    const sessionRegion = _.get(props, 'session.profile.region', null);
    const geoRegion = _.get(props, 'geo.region', null);

    if (typeof sessionRegion === 'string' && sessionRegion !== '') {
      region = sessionRegion;
    } else if (typeof geoRegion === 'string' && geoRegion !== '') {
      region = geoRegion;
    }

    props.getCitiesDispatch({ region });
  }

  updateState = async (state: {[key: string]: unknown}) => {
    if (state.region) {
      await this.props.getCitiesDispatch({region: state.region as string});
    }

    // set local state for the city input, but then pass it up to the form
    this.props.updateState(null, state);
  }

  render() {
    return (
      <GenericLoader
        isLoading={this.props.citiesThunk.isLoading}
        render={() => (
          <CitySearchComponent
            {...this.props}
            cities={this.props.citiesThunk.data}
            geo={this.props.geo}
            session={this.props.session}
            updateState={this.updateState}
          />
        )}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  citiesThunk: store.cities,
  geo: store.geo.data,
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getCitiesDispatch: (query: {region: string}) => dispatch(getCities(query)),
});

const CitySearch = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CitySearchContainer);

export default CitySearch;
