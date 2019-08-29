import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {Breadcrumbs, GenericLoader, Helmet} from '../../../../components';
import {getCountry, getRegion} from '../../../../redux';
import {fuzz} from '../../../../utils';
import {tContainerProps, tStore} from './_types';
import {RegionComponent} from './Component';

export class RegionContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    props.getCountry(props.match.params);
    props.getRegion(props.match.params);
  }

  state = {
    citiesBySearch: [],
  };

  onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();

    const search = ev.currentTarget.value;
    const searchNorm = search.toLowerCase();
    const {cities = []} = this.props.region;

    type tMatch = {
      rendered: string,
      score: number;
    };

    const citiesBySearch = cities
      .map(city => {
        const orgNorm = city.name.toLowerCase();
        const match = fuzz(searchNorm, orgNorm);
        return {
          ...city,
          match,
        };
      })
      .filter(org => !!org.match && org.match.score > 0)
      .sort((a: any, b: any) => {
        if (a.match.score > b.match.score) return -1;
        if (a.match.score < b.match.score) return 1;
        return 0;
      });


    this.setState({citiesBySearch});
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

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getCountry: (params: tDirectoryParams) => dispatch(getCountry(params)),
  getRegion: (params: tDirectoryParams) => dispatch(getRegion(params)),
});

export const Region = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegionContainer);
