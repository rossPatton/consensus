import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Helmet} from '../../../../components';
import {categories} from '../../../../constants';

const CategoryList = memo(() => (
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
    <ul className="flex flex-col d:flex-row fxWrap">
      {categories.map(cat => (
        <li
          key={cat.slug}
          className=" fxg0 third mb-2">
          <Link
            to={`/categories/${cat.slug}`}
            className="block text-sm leading-none p-2 brdA1 rounded hover:bg-gray-1 trans2 no-underline">
            <h2 className="block leading-none fs3 mT1 mb-2 underline">
              {cat.display}
            </h2>
          </Link>
        </li>
      ))}
    </ul>
  </>
));

export default CategoryList;
