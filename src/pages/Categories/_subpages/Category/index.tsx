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
import { getOrgs } from '../../../../redux';
import { tContainerProps, tStore } from './_types';

class CategoryContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    const { match: {params} } = props;
    props.getOrgs({
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
                  render={(searchProps: tSearchFilterProps) => (
                    <Paginate
                      count={9}
                      items={searchProps.items}
                      render={(orgsToRender: tOrg[]) => (
                        <>
                          <FilterPanel
                            onSearchChange={searchProps.onSearchChange}
                            placeholder="Search for a meeting by title"
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
  getOrgs: (query: {category: tCategory}) => dispatch(getOrgs(query)),
});

const Category = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryContainer);

export default Category;
