import cx from 'classnames';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {categories} from '~app/constants';

const Categories = memo(() => (
  <ul className="d:pl-5 d:pr-5 font-semibold text-left">
    {categories.map((cat, i) => (
      <li
        key={i}
        className="w-full d:pl-5 d:pr-5 mb-3 d:mb-4">
        <div
          className={cx({
            'flex': true,
            'justify-end': cat.align === 'right',
          })}>
          <h2 className="text-2 d:text-1 w-1/2 d:max-w-1/2 mb-2">
            <Link to={`/categories/${cat.slug}`}>
              {cat.display}
            </Link>
          </h2>
        </div>
        <div
          className={cx({
            'flex flex-row': true,
            'flex-row-reverse': cat.align === 'right',
          })}>
          <Link
            to={`/categories/${cat.slug}`}
            className={cx({
              'w-full d:min-w-1/2': true,
              'mr-3': cat.align === 'left',
              'ml-3': cat.align === 'right',
            })}>
            <img
              alt=""
              className="w-full rounded-lg"
              src={`/images/${cat.slug}_sm.svg`}
              width="480"
            />
          </Link>
          <p className="hidden d:block text-2 text-gray-5 leading-loose">
            {cat.description}
          </p>
        </div>
      </li>
    ))}
  </ul>
));

export default Categories;
