import React, {Fragment, memo} from 'react';
import {Link} from 'react-router-dom';

import {tProps} from './_types';

const Breadcrumbs = memo((props: tProps) => {
  if (!props.crumbs) return null;
  if (!(props.crumbs instanceof Array)) return null;

  return (
    <ul className="text-sm font-bold mb-2 leading-none lsNone flex fxWrap brdB1 mb-2 pb-3">
      {props.crumbs.map((crumb: tCrumb, i) => {
        const isLastItem = i === props.crumbs.length - 1;
        const renderLink = !isLastItem && crumb.to;

        return (
          <Fragment key={i}>
            <li className="mr-1">
              {!renderLink && crumb.display}
              {renderLink && (
                <Link to={`/${crumb.to}`}>
                  {crumb.display}
                </Link>
              )}
            </li>
            {renderLink && (
              <li className="mHide mr-1">/</li>
            )}
          </Fragment>
        );
      })}
    </ul>
  );
});

export default Breadcrumbs;
