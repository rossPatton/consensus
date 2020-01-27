import _ from 'lodash';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {Breadcrumbs, GenericLoader, Helmet} from '../../../../components';
import {ErrorBoundary} from '../../../../containers';
import {getRegion} from '../../../../redux';
import {fuzzFilterList} from '../../../../utils';
import {tContainerProps, tStore} from './_types';
import {RegionComponent} from './Component';

class RegionContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    props.getRegion(props.match.params);
  }

  state = {
    citiesBySearch: [] as tCity[],
  };

  onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();

    const {cities = []} = this.props.region.data;

    this.setState({
      citiesBySearch: fuzzFilterList({
        input: cities,
        search: ev.currentTarget.value,
      }),
    });
  }

  render() {
    const {isLoading, match, region} = this.props;

    return (
      <ErrorBoundary status={_.get(region, 'error.status', 200)}>
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
              display: 'United States',
              to: 'directory/us',
            }, {
              display: region.data.name,
              to: `directory/us/${region.data.code}`,
            }];

            const {cities = []} = region.data;
            const {citiesBySearch} = this.state;
            const citiesToRender = citiesBySearch.length > 0
              ? citiesBySearch
              : cities;

            return (
              <>
                <Breadcrumbs crumbs={crumbs} />
                <RegionComponent
                  citiesToRender={citiesToRender}
                  match={match}
                  onChange={this.onChange}
                  region={region.data}
                />
              </>
            );
          }}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.region.isLoading,
  region: store.region,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getRegion: (params: tDirectoryParams) => dispatch(getRegion(params)),
});

const Region = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegionContainer);

export default Region;
