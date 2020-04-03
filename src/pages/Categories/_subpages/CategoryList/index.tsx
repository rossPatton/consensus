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
          className=" fxg0 third mb-3">
          <Link
            to={`/categories/${cat.slug}`}
            className="dBl text-sm leading-none p-3 brdA1 br8 hover:bg-gray-11 trans2 no-underline">
            <h2 className="dBl leading-none fs3 mT1 mb-3 underline">
              {cat.display}
            </h2>
          </Link>
        </li>
      ))}
    </ul>
  </>
));

export default CategoryList;
