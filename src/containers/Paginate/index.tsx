import qs from 'query-string';
import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

import {tProps, tState} from './_types';

class PaginateContainer extends Component<tProps, tState> {
  static defaultProps = {
    className: 'flex items-center justify-center font-bold',
    count: 10,
    page: 1,
    placement: 'bottom' as 'top' | 'bottom',
  };

  constructor(props: tProps) {
    super(props);

    const {location: {search}} = props;
    const query = qs.parse(search);

    // using the qs makes it so pagination works with and without js
    this.state = {
      page: parseInt((query.page as string), 10) || props.page,
    };
  }

  getSliceOfItems = (items: object[]) => {
    const {count} = this.props;
    const {page} = this.state;

    const newArray = [...items];
    const end = page * count;
    const start = end - count;

    // -1 here because page numbers are 1 indexed, arrays are 0 indexed
    return newArray.slice(start, end);
  }

  // literally just to force an update when deeply nested in pure components
  setPage = (page: number) =>
    this.setState({
      page,
    });

  render() {
    const {page} = this.state;
    const {
      className,
      count,
      items = [],
      location: {pathname, search},
      placement,
    } = this.props;

    const query = qs.parse(search);

    // a _.range equivalent. sort of
    const pageCount = Math.ceil(items.length / count);
    const pages = Array(pageCount).fill(null);
    const itemsToRender = items.length > count
      ? this.getSliceOfItems(items)
      : items;

    return (
      <>
        {/*
          @TODO this is counter-intuitive, but easy, but eventually
          separate out the list rendering into another component or something
        */}
        {placement === 'bottom' && this.props.render(itemsToRender)}
        {pageCount > 1 && (
          <ul className={className}>
            {pages.map((_, i) => {
              const pageNo = i + 1;
              const queryCopy = {
                ...query,
                page: pageNo,
              };

              const isActive = page === pageNo;
              const to = `${pathname}?${qs.stringify(queryCopy)}`;

              return (
                <li key={i}>
                  {isActive && (
                    <span className="block ml-1 mr-2 pL1 pR1">
                      {pageNo}
                    </span>
                  )}
                  {!isActive && (
                    <Link
                      to={to}
                      onClick={() => this.setPage(pageNo)}
                      className="block ml-1 mr-2 pL1 pR1" >
                      {pageNo}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        )}
        {placement === 'top' && this.props.render(itemsToRender)}
      </>
    );
  }
}

const Paginate = withRouter(PaginateContainer);
export default Paginate;
