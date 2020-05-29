import loglevel from 'loglevel';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {getGroupsBySearch} from '~app/redux';

import {tProps, tState} from './_types';

/**
 * @description Basic search field component. Used in Header
 */
class SearchContainer extends React.PureComponent<tProps, tState> {
  static defaultProps = {
    placeholder: 'Search for groups',
  };

  state = {
    key: 'name' as ts.searchKeyUnion,
    value: '',
  };

  onChange = (ev: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({
      value: ev.currentTarget.value,
    })

  onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    this.props.getSearchResultsDispatch({
      key: this.state.key,
      value: this.state.value,
    })
      .then(() => this.props.history.push('/search'))
      .catch(loglevel.error);
  }

  render() {
    return (
      <form
        name="search"
        autoComplete="off"
        onSubmit={this.onSubmit}
        action="/api/v1/search">
        <fieldset>
          <label className="flex flex-row items-center relative" htmlFor="search">
            <img
              alt=""
              className="absolute ml-1 opacity-5"
              src="/images/search.svg"
              width="20"
            />
            <input
              className={this.props.className || 'p-1 pl-3 rounded w-full'}
              name="search"
              onChange={this.onChange}
              placeholder={this.props.placeholder}
              type="search"
              value={this.state.value}
            />
          </label>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = (store: {groupsBySearch: ts.thunk<ts.group[]>}) => ({
  groupsBySearchThunk: store.groupsBySearch,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getSearchResultsDispatch: (query: {value: string}) => dispatch(getGroupsBySearch(query)),
});

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
export default withRouter(Search);
