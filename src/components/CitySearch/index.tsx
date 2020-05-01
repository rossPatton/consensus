import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {GenericLoader} from '~app/containers';
import {getCities} from '~app/redux';

import {tContainerProps, tStore} from './_types';
import {CitySearchComponent} from './Component';

// use within an existing form, tie to it's updateState method
export class CitySearchContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    if (!props.citiesThunk.fetched) {
      props.getCitiesDispatch({region: props.geo.region});
    }
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
