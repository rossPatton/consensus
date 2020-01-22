import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Breadcrumbs, GenericLoader, Helmet, Orgs } from '../../../../components';
import { categoryMap } from '../../../../constants';
import { Paginate, SearchFilter } from '../../../../containers';
import { getOrgs } from '../../../../redux';
import { tContainerProps, tStore } from './_types';

class CategoryContainer extends Component<tContainerProps> {
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
                  items={orgs}
                  searchKey="name"
                  render={(searchProps: tSearchFilterProps) => (
                    <Paginate
                      count={9}
                      items={searchProps.items}
                      page={params.page}
                      render={(orgsToRender: tOrg[]) => (
                        <>
                          <div className="fx aiCtr p3 bgGrey1 br8 mB4 fs6 fw600">
                            <label className="col row mR3" htmlFor="searchFilter">
                              <div>Search</div>
                              <input
                                spellCheck
                                type="search"
                                id="searchFilter"
                                className="mR2 lh1 row"
                                onChange={searchProps.onSearchChange}
                                placeholder="Search for a meeting by title"
                              />
                            </label>
                          </div>
                          <Orgs match={this.props.match} orgs={orgsToRender} />
                        </>
                      )}
                    />
                  )}
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
  isLoading: store.orgs.isLoading,
  orgs: store.orgs.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getOrgs: (query: {category: tCategory}) => dispatch(getOrgs(query)),
});

const Category = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryContainer);

export default Category;
