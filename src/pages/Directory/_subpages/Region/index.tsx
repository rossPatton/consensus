import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {Breadcrumbs, GenericLoader, Helmet} from '../../../../components';
import {getCountry, getRegion} from '../../../../redux';
import {fuzzFilterList} from '../../../../utils';
import {tContainerProps, tStore} from './_types';
import {RegionComponent} from './Component';

class RegionContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    props.getCountry(props.match.params);
    props.getRegion(props.match.params);
  }

  state = {
    citiesBySearch: [] as tCity[],
  };

  onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();

    const {cities = []} = this.props.region;

    this.setState({
      citiesBySearch: fuzzFilterList({
        input: cities,
        search: ev.currentTarget.value,
      }),
    });
  }

  render() {
    const {country, isLoading, match, region} = this.props;
    const {cities = []} = region;
    const {citiesBySearch} = this.state;
    const citiesToRender = citiesBySearch.length > 0
      ? citiesBySearch
      : cities;

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
          isLoading={isLoading}
          render={() => {
            const crumbs = [{
              display: country.name,
              to: `directory/${country.code}`,
            }, {
              display: region.name,
              to: `directory/${country.code}/${region.code}`,
            }];

            return (
              <>
                <Breadcrumbs crumbs={crumbs} />
                <RegionComponent
                  country={country}
                  match={match}
                  onChange={this.onChange}
                  region={region}
                  citiesToRender={citiesToRender}
                />
              </>
            );
          }}
        />
      </>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.region.isLoading,
  country: store.country.data,
  region: store.region.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getCountry: (params: tDirectoryParams) => dispatch(getCountry(params)),
  getRegion: (params: tDirectoryParams) => dispatch(getRegion(params)),
});

const Region = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegionContainer);

export default Region;
