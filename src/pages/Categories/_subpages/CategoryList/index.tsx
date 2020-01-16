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
    <ul className="fx fxWrap">
      {categories.map(cat => (
        <li
          key={cat.slug}
          className="col fxg0 third mB3">
          <Link
            to={`/categories/${cat.slug}`}
            className="dBl fs6 lh1 p3 brdA1 br8 hvrBgGrey1 trans2 noUnderline">
            <h2 className="dBl lh1 fs3 mT1 mB3 underline">
              {cat.display}
            </h2>
          </Link>
        </li>
      ))}
    </ul>
  </>
));

export default CategoryList;
