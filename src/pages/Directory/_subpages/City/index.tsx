import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {Breadcrumbs, GenericLoader, Helmet} from '../../../../components';
import {getCity, getCountry, getRegion} from '../../../../redux';
import {fuzz, slugify} from '../../../../utils';
import {tContainerProps, tStore} from './_types';
import {CityComponent} from './Component';

export class CityContainer extends PureComponent<tContainerProps> {
  state = {
    orgsBySearch: [],
  };

  constructor(props: tContainerProps) {
    super(props);
    props.getCountry(props.match.params);
    props.getRegion(props.match.params);
    props.getCity(props.match.params);
  }

  onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();

    const search = ev.currentTarget.value;
    const searchNorm = search.toLowerCase();
    const {orgs = []} = this.props.city;

    type tMatch = {
      rendered: string,
      score: number;
    };

    const orgsBySearch = orgs
      .map(org => {
        const orgNorm = org.name.toLowerCase();
        const match = fuzz(searchNorm, orgNorm);
        return {
          ...org,
          match,
        };
      })
      .filter(org => !!org.match && org.match.score > 0)
      .sort((a: any, b: any) => {
        if (a.match.score > b.match.score) return -1;
        if (a.match.score < b.match.score) return 1;
        return 0;
      });


    this.setState({orgsBySearch});
  }

  render() {
    const {city, country, isLoading, match, region} = this.props;
    const {orgs = []} = city;
    const {orgsBySearch} = this.state;
    const orgsToRender = orgsBySearch.length > 0
      ? orgsBySearch
      : orgs;

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
            }, {
              display: city.name,
              to: `directory/${country.code}/${region.code}/${slugify(city.name)}`,
            }];

            return (
              <>
                <Breadcrumbs crumbs={crumbs} />
                <CityComponent
                  city={city}
                  country={country}
                  match={match}
                  onChange={this.onChange}
                  orgsToRender={orgsToRender}
                  region={region}
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
  isLoading: store.city.isLoading,
  city: store.city.data,
  country: store.country.data,
  region: store.region.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getCity: (params: tDirectoryParams) => dispatch(getCity(params)),
  getCountry: (params: tDirectoryParams) => dispatch(getCountry(params)),
  getRegion: (params: tDirectoryParams) => dispatch(getRegion(params)),
});

export const City = connect(
  mapStateToProps,
  mapDispatchToProps
)(CityContainer);
