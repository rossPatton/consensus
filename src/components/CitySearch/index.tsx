import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {GenericLoader} from '../../containers';
import {getCities} from '../../redux';
import {tContainerProps, tState, tStore} from './_types';
import {OrgSignupComponent} from './Component';

// use within an existing form, tie to it's updateState method
export class CitySearchContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);
    if (!props.citiesThunk.fetched) {
      props.getCitiesDispatch({region: props.geo.region});
    }
  }

  state = {
    showRegionField: false,
  }

  toggleRegionField = () =>
    this.setState({
      showRegionField: !this.state.showRegionField,
    })

  updateState = (state: {[key: string]: unknown}) => {
    if (state.region !== this.props.geo.region) {
      this.props.getCitiesDispatch({region: state.region as string});
    }

    // set local state for the city input, but then pass it up to the form
    this.props.updateState(null, state);
  }

  render() {
    return (
      <GenericLoader
        isLoading={this.props.citiesThunk.isLoading}
        render={() => (
          <OrgSignupComponent
            {...this.props}
            cities={this.props.citiesThunk.data}
            geo={this.props.geo}
            session={this.props.session}
            showRegionField={this.state.showRegionField}
            toggleRegionField={this.toggleRegionField}
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
  getCitiesDispatch: (query: any) => dispatch(getCities(query)),
});

const CitySearch = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CitySearchContainer);

export default CitySearch;
