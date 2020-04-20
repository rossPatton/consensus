import _ from 'lodash';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { FilterPanel, Helmet, Orgs } from '~app/components';
import { categoryMap } from '~app/constants';
import {
  ErrorBoundary,
  GenericLoader,
  Paginate,
  SearchFilter,
} from '~app/containers';
import { getGroups } from '~app/redux';

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
    const {isLoading, orgs} = this.props;

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
          render={() => (
            <>
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
          )}
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
