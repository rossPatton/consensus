import qs from 'query-string';
import React, {PureComponent} from 'react';
import {Link, withRouter} from 'react-router-dom';

import {tProps} from './_types';

class PaginateContainer extends PureComponent<tProps> {
  static defaultProps = {
    className: 'lsNone fx aiCtr jcCtr fs4 fw600',
    count: 10,
    page: '1',
  };

  getSliceOfItems = (items: object[]) => {
    const {count, location: {search}} = this.props;
    const query = qs.parse(search);
    const activePage = query.page ? parseInt(query.page as string, 10) : 1;

    const newArray = [...items];
    const end = activePage * count;
    const start = end - count;

    // -1 here because page numbers are 1 indexed, arrays are 0 indexed
    return newArray.slice(start, end);
  }

  render() {
    const {
      className,
      count,
      items = [],
      location: {pathname, search},
    } = this.props;

    const query = qs.parse(search);
    const activePage = query.page ? parseInt(query.page as string, 10) : 1;

    // a _.range equivalent. sort of
    const pageCount = Math.ceil(items.length / count);
    const pages = Array(pageCount).fill(null);
    const itemsToRender = items.length > count
      ? this.getSliceOfItems(items)
      : items;

    return (
      <>
        {this.props.render(itemsToRender)}
        {pageCount > 1 && (
          <ul className={className}>
            {pages.map((_, i) => {
              const pageNo = i + 1;
              const queryCopy = {
                ...query,
                page: pageNo,
              };

              const isActive = activePage === pageNo;
              const to = `${pathname}?${qs.stringify(queryCopy)}`;

              return (
                <li key={i}>
                  {isActive && (
                    <span className="dBl mL2 mR2 pL1 pR1">
                      {pageNo}
                    </span>
                  )}
                  {!isActive && (
                    <Link
                      to={to}
                      className="dBl mL2 mR2 pL1 pR1" >
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

const Paginate = withRouter(PaginateContainer);
export default Paginate;
