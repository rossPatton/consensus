import {PlaceholderImage} from '@app/components';
import {categories} from '@app/constants';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

const Categories = memo(() => (
  <ul className="flex flex-row flex-wrap justify-center leading-none">
    {categories.map((cat, i) => (
      <li
        key={i}
        className="w-1/2 d:w-1/4 p-1 mb-1">
        <div className="w-full block d:mr-1 d:mr-0 mb-1 d:mb-2">
          <PlaceholderImage
            height={100}
            seed={i}
            width={200}
          />
        </div>
        <Link to={`/categories/${cat.slug}`}>
          {cat.display}
        </Link>
      </li>
    ))}
  </ul>
));

export default Categories;
