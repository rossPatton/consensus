import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';

import {Breadcrumbs, GenericLoader, Helmet} from '../../../../components';
import {categoryMap} from '../../../../constants';
import {getOrgs} from '../../../../redux';
// import {fuzzFilterList} from '../../../../utils';
import {tContainerProps, tStore} from './_types';

class CategoryContainer extends Component<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    props.getOrgs({category: categoryMap[props.category]});
  }

  render() {
    const {category, isLoading, orgs} = this.props;

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
              display: categoryMap[category],
              to: `categories/${category}`,
            }];

            return (
              <>
                <Breadcrumbs crumbs={crumbs} />
                <ul className="fx fxWrap">
                  {orgs.map((org: tOrg, i) => (
                    <li
                      key={i}
                      className="col fxg0 third mB3">
                      <Link
                        to={`/org/${org.id}/overview`}
                        className="dBl fs6 lh1 p3 brdA1 br8 hvrBgGrey1 trans2 noUnderline">
                        {org.category}
                        <h2 className="dBl lh1 fs3 mT1 mB3 underline">
                          {org.name}
                        </h2>
                        <div>
                          Based in {org.city}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
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

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getOrgs: (params: any) => dispatch(getOrgs(params)),
});

const Category = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryContainer);

export default Category;
