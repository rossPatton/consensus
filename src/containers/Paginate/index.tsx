import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';

import {tProps} from './_types';

export class Paginate extends PureComponent<tProps> {
  static defaultProps = {
    className: 'lsNone fx aiCtr jcCtr fs4 fw600',
    count: 10,
  };

  getSliceOfItems = (items: any[]) => {
    const newArray = [...items];

    const {match: {params: {page}}} = this.props;
    const activePage = page ? parseInt(page, 10) : 1;

    const end = activePage * 10;
    const start = end - 10;

    // -1 here because page numbers are 1 indexed, arrays are 0 indexed
    return newArray.slice(start, end - 1);
  }

  render() {
    const {
      className,
      count,
      items,
      match,
    } = this.props;

    const {params, url} = match;
    const activePage = params.page ? parseInt(params.page, 0) : 1;

    // a _.range equivalent. sort of
    const pageCount = Math.ceil(items.length / count);
    const pages = Array(pageCount).fill(null);

    const itemsToRender = this.getSliceOfItems(items);

    return (
      <>
        {this.props.render(itemsToRender)}
        {pages.length > 0 && (
          <ul className={className}>
            {pages.map((_, i) => {
              const pageNo = i + 1;
              const isActive = activePage === pageNo;
              const to = params.page
                ? url.replace(`${params.page}`, `${pageNo}`)
                : `${url}/${pageNo}`;

              return (
                <li key={i}>
                  {isActive && (
                    <span className="dBl mL1 mR1 pL1 pR1">
                      {pageNo}
                    </span>
                  )}
                  {!isActive && (
                    <Link className="dBl mL1 mR1 pL1 pR1" to={to}>
                      {pageNo}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </>
    );
  }
}
