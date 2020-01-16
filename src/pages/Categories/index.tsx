import React from 'react';

import {categoryMap} from '../../constants';
import {ErrorBoundary} from '../../containers';
import {Category, CategoryList} from './_subpages';
// import {tProps} from './_types';

const Categories = (props: any) => {
  const {match: {params}} = props;
  const renderCategory = !!params.category;

  return (
    <ErrorBoundary>
      <div className="contain mT4">
        <h1 className="fs2 mB3">
          {renderCategory
            ? `Organizations by category: ${categoryMap[params.category]}`
            : 'Categories'}
        </h1>
        {!renderCategory && <CategoryList />}
        {renderCategory && (
          <Category category={params.category} />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default Categories;
