import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { tProps } from './_types';

export const Paginate = memo((props: tProps) => {
  const { match, count = 10, items = [] } = props;
  const { params, url } = match;

  const activePage = params.page ? parseInt(params.page, 0) : 1;

  // a _.range equivalent. sort of
  const pageCount = Math.ceil(items.length / count);
  const pages = Array(pageCount).fill(null);

  console.log('pagination props => ', props);

  return (
    <ul className="lsNone fx aiCtr jcCtr fs4 fw600 mT3">
      {pages.map((_, i) => {
        const pageNo = i + 1;
        const isActive = activePage === pageNo;
        const to = params.page
          ? url.replace(`${params.page}`, pageNo)
          : `${url}/${pageNo}`;

        return (
          <li key={i} className="mL2 mR2">
            {isActive && pageNo}
            {!isActive && (
              <Link to={to}>
                {pageNo}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
});
