import cx from 'classnames';
import React, {memo} from 'react';

import {categoryMap} from '~app/constants';
import {Template} from '~app/containers';

import {Category, CategoryList} from './_subpages';
import {tProps} from './_types';

const Categories = memo((props: tProps) => {
  const {match: {params}} = props;
  const renderCategory = !!params.category;

  return (
    <Template>
      <h1
        className={cx({
          'mb-2': true,
          'text-center': !renderCategory,
        })}>
        {renderCategory
          ? `${categoryMap[params.category]} Groups`
          : 'Categories'}
      </h1>
      {!renderCategory && <CategoryList />}
      {renderCategory && (
        <Category match={props.match} />
      )}
    </Template>
  );
});

export default Categories;
