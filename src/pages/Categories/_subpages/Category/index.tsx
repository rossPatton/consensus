import _ from 'lodash';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { Breadcrumbs, FilterPanel, Helmet, Orgs } from '../../../../components';
import { categoryMap } from '../../../../constants';
import {
  ErrorBoundary,
  GenericLoader,
  Paginate,
  SearchFilter,
} from '../../../../containers';
import { getGroups } from '../../../../redux';
import { tContainerProps, tStore } from './_types';

class CategoryContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    const { match: {params} } = props;
    props.getGroups({
      category: categoryMap[params.category],
    });
  }

  render() {
    const {match: {params}, isLoading, orgs} = this.props;

    return (
      <ErrorBoundary status={_.get(orgs, 'error.status', 200)}>
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
              display: 'All Categories',
              to: 'categories',
            }, {
              display: categoryMap[params.category],
              to: `categories/${params.category}`,
            }];

            return (
              <>
                <Breadcrumbs crumbs={crumbs} />
                <SearchFilter
                  items={orgs.data}
                  searchKey="name"
                  render={searchProps => (
                    <Paginate
                      count={9}
                      items={searchProps.items}
                      render={(orgsToRender: tGroup[]) => (
                        <>
                          <FilterPanel
                            className="fx aiCtr p3 bgWhite br8 mB4 fs6 fw600"
                            onSearchChange={searchProps.onSearchChange}
                            placeholder="Filter groups by name"
                          />
                          <Orgs orgs={orgsToRender} />
                        </>
                      )}
                    />
                  )}
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
  isLoading: store.orgs.isLoading,
  orgs: store.orgs,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getGroups: (query: {category: tCategory}) => dispatch(getGroups(query)),
});

const Category = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryContainer);

export default Category;
