import React, {memo} from 'react';

import {categoryMap} from '../../constants';
import {Template} from '../../containers';
import {Category, CategoryList} from './_subpages';
import {tProps} from './_types';

const Categories = memo((props: tProps) => {
  const {match: {params}} = props;
  const renderCategory = !!params.category;

  return (
    <Template>
      <h1 className="mb-2">
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
