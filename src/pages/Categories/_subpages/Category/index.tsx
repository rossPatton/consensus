import _ from 'lodash';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { FilterPanel, Groups, Helmet } from '~app/components';
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
    const {isLoading, group} = this.props;

    return (
      <ErrorBoundary status={_.get(group, 'error.status', 200)}>
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
                items={group.data}
                searchKey="name"
                render={searchProps => (
                  <Paginate
                    count={9}
                    items={searchProps.items}
                    render={(groupsToRender: ts.group[]) => (
                      <>
                        <FilterPanel
                          onSearchChange={searchProps.onSearchChange}
                          placeholder="Filter groups by name"
                        />
                        <Groups groups={groupsToRender} />
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
  isLoading: store.group.isLoading,
  group: store.group,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getGroups: (query: {category: ts.category}) => dispatch(getGroups(query)),
});

const Category = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryContainer);

export default Category;
