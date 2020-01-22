import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Breadcrumbs, GenericLoader, Helmet} from '../../../../components';
import {getCountry} from '../../../../redux';
import {fuzzFilterList} from '../../../../utils';
import {tContainerProps, tState, tStore} from './_types';
import {CountryComponent} from './Component';

class CountryContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);
    props.getCountry(props.match.params);
  }

  state = {
    regionsBySearch: [] as tRegion[],
  };

  onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();

    const {regions = []} = this.props.country;

    this.setState({
      regionsBySearch: fuzzFilterList({
        input: regions,
        search: ev.currentTarget.value,
      }),
    });
  }

  render() {
    const {country, isLoading, match} = this.props;
    const {regions = []} = country;
    const {regionsBySearch} = this.state;
    const regionsToRender = regionsBySearch.length > 0
      ? regionsBySearch
      : regions;

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
            }];

            return (
              <>
                <Breadcrumbs crumbs={crumbs} />
                <CountryComponent
                  country={country}
                  match={match}
                  onChange={this.onChange}
                  regionsToRender={regionsToRender}
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
  country: store.country.data,
  isLoading: store.country.isLoading,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getCountry: (params: tDirectoryParams) => dispatch(getCountry(params)),
});

const Country = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CountryContainer);

export default Country;
