import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {categories} from '~app/constants';

const Categories = memo(() => (
  <ul className="flex flex-row flex-wrap justify-center leading-none">
    {categories.map((cat, i) => (
      <li
        key={i}
        className="w-full d:w-1/4 mb-1 text-3">
        <div className="w-full block d:mr-1 d:mr-0 mb-1 d:mb-2">
          <Link to={`/categories/${cat.slug}`}>
            <img
              alt=""
              src={`/images/${cat.slug}.svg`}
              width="480"
            />
          </Link>
        </div>
        <Link to={`/categories/${cat.slug}`}>
          {cat.display}
        </Link>
      </li>
    ))}
  </ul>
));

export default Categories;
