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
    const {groupsThunk, match: {params}} = this.props;

    return (
      <ErrorBoundary status={groupsThunk?.error?.status}>
        <Helmet
          canonical={`/categories/${params.category}`}
          title={`Consensus: View ${params.category} Group`}
          meta={[
            { name: 'description', content: `Search for groups listed under the ${params.category} category` },
            { name: 'keywords', content: 'category,search,groups' },
          ]}
        />
        <GenericLoader
          isLoading={groupsThunk.isLoading}
          render={() => (
            <>
              <SearchFilter
                items={groupsThunk.data}
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
  groupsThunk: store.groups,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getGroups: (query: {category: ts.category}) => dispatch(getGroups(query)),
});

const Category = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryContainer);

export default Category;
