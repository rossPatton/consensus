import { Categories } from "@prisma/client";
import { Link } from "@remix-run/react";
import cx from "classnames";

export const CategoriesList = (props: { categories: Categories[] }) => {
  const { categories = [] } = props;
  if (categories.length === 0) return null;

  return (
    <ul className="d:pl-5 d:pr-5 font-semibold text-left">
      {categories.map((cat, i) => (
        <li
          key={i}
          className="w-full d:pl-5 d:pr-5 mb-3 d:mb-4">
          <div
            className={cx('flex', {
              'justify-end': i % 2 === 0,
            })}>
            <h2
              className={cx('text-2 d:text-1 mb-2 d:max-w-6/12', {
                'w-6/12': i % 2 === 0,
              })}>
              <Link to={`/category/${cat.slug}`}>
                {cat.display}
              </Link>
            </h2>
          </div>
          <div
            className={cx('flex flex-row', {
              'flex-row-reverse': i % 2 === 0,
            })}>
            <Link
              to={`/category/${cat.slug}`}
              className={cx('w-full d:min-w-6/12', {
                'mr-3': i % 2 !== 0,
                'ml-3': i % 2 === 0,
              })}>
              <img
                alt={`View ${cat.display} groups`}
                className='w-full rounded-lg'
                src={`/${cat.slug}_sm.svg`}
                height="256"
                width="480"
              />
            </Link>
            <p className='hidden d:block text-2 text-gray-5 leading-loose'>
              {cat.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};
