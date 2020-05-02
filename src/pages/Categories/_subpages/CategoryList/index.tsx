import React, {memo} from 'react';

import {Categories, Helmet} from '~app/components';

const CategoryList = memo(() => (
  <>
    <Helmet
      canonical="/categories"
      title="Consensus: View All Categories"
      meta={[
        { name: 'description', content: 'Select a category.' },
        { name: 'keywords', content: 'category,search,groups' },
      ]}
    />
    <Categories />
  </>
));

export default CategoryList;
