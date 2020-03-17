import React from 'react';

import {categoryMap} from '../../constants';
import {Template} from '../../containers';
import {Category, CategoryList} from './_subpages';
import {tProps} from './_types';

const Categories = (props: tProps) => {
  const {match: {params}} = props;
  const renderCategory = !!params.category;

  return (
    <Template>
      <div className="contain mT4">
        <h1 className="fs2 mB3">
          {renderCategory
            ? categoryMap[params.category]
            : 'Categories'}
        </h1>
        {!renderCategory && <CategoryList />}
        {renderCategory && (
          <Category match={props.match} />
        )}
      </div>
    </Template>
  );
};

export default Categories;
