import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Helmet} from '~app/components';
import {categories} from '~app/constants';

const CategoryList = memo(() => (
  <>
    <Helmet
      canonical="/categories"
      title={'Consensus: View All Categories'}
      meta={[
        { name: 'description', content: 'Search for groups by category' },
        { name: 'keywords', content: 'category,search,groups' },
      ]}
    />
    <ul className="flex flex-col d:flex-row flex-wrap">
      {categories.map(cat => (
        <li
          key={cat.slug}
          className="flex-grow-0 d:w-1/3 mb-2">
          <Link
            to={`/categories/${cat.slug}`}
            className="block p-2 border rounded hover:bg-gray-2 transition mt-1 mb-2">
            <h2 className="leading-none text-3">
              {cat.display}
            </h2>
          </Link>
        </li>
      ))}
    </ul>
  </>
));

export default CategoryList;
