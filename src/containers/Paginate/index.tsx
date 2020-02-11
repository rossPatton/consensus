import qs from 'query-string';
import React from 'react';
import {Link, withRouter} from 'react-router-dom';

import {tProps, tState} from './_types';

class PaginateContainer extends React.PureComponent<tProps, tState> {
  static defaultProps = {
    className: 'lsNone fx aiCtr jcCtr fs4 fw600',
    count: 10,
    page: 1,
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

  // shouldComponentUpdate(_: tProps, nextState: tState) {
  //   const {page} = this.state;
  //   console.log('current page => ', page);
  //   const {page: nextPage} = nextState;
  //   console.log('next page => ', nextPage);
  //   if (page === nextPage) return false;
  //   return true;
  // }

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
        {this.props.render(itemsToRender)}
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
                    <span className="dBl mL2 mR2 pL1 pR1">
                      {pageNo}
                    </span>
                  )}
                  {!isActive && (
                    <Link
                      to={to}
                      onClick={() => this.setPage(pageNo)}
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
